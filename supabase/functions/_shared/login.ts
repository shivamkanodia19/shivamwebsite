import { ADMIN_TOKEN_LIFETIME_SECONDS } from "./auth.ts";
import { corsHeaders, isAllowedOrigin, type CorsConfig } from "./cors.ts";

const maximumPasswordLength = 1_024;
const maximumRequestBytes = 4_096;

export type ThrottleReservation = {
  allowed: boolean;
  lockedUntil: string | null;
};

export type ThrottleStore = {
  reserve(ipHash: string, globalHash: string, at: Date): Promise<ThrottleReservation>;
  clear(ipHash: string, globalHash: string, at: Date): Promise<void>;
};

export type AdminLoginDependencies = {
  throttle: ThrottleStore;
  corsConfig: CorsConfig;
  now: () => Date;
  hashScope: (scope: string) => Promise<string>;
  verifyPassword: (password: string) => Promise<boolean>;
  issueToken: (now: Date) => Promise<string>;
};

export function createAdminLoginHandler(dependencies: AdminLoginDependencies) {
  return async (request: Request): Promise<Response> => {
    const origin = request.headers.get("origin");
    const headers = { ...corsHeaders(origin, dependencies.corsConfig), "Cache-Control": "no-store" };
    if (!isAllowedOrigin(origin, dependencies.corsConfig)) {
      return response({ error: "Invalid request" }, 403, headers);
    }
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST" || request.headers.get("content-type")?.trim().toLowerCase() !== "application/json") {
      return response({ error: "Invalid request" }, 400, headers);
    }

    const parsed = await readRequestBody(request, maximumRequestBytes);
    if (parsed === "too-large") return response({ error: "Invalid request" }, 413, headers);
    if (!parsed || typeof parsed.password !== "string" || parsed.password.length > maximumPasswordLength) {
      return response({ error: "Invalid request" }, 400, headers);
    }

    const ip = trustedClientIp(request.headers);
    if (!ip) return response({ error: "Invalid request" }, 400, headers);

    try {
      const now = dependencies.now();
      const [ipHash, globalHash] = await Promise.all([
        dependencies.hashScope(ip),
        dependencies.hashScope("global"),
      ]);
      const reservation = await dependencies.throttle.reserve(ipHash, globalHash, now);
      if (!reservation.allowed) return response({ error: "Too many attempts" }, 429, headers);

      if (!(await dependencies.verifyPassword(parsed.password))) {
        return response({ error: "Invalid password" }, 401, headers);
      }

      await dependencies.throttle.clear(ipHash, globalHash, now);
      const token = await dependencies.issueToken(now);
      return response({
        token,
        expiresAt: new Date(now.getTime() + ADMIN_TOKEN_LIFETIME_SECONDS * 1_000).toISOString(),
      }, 200, headers);
    } catch {
      return response({ error: "Invalid request" }, 500, headers);
    }
  };
}

export function trustedClientIp(headers: Headers): string | null {
  const value = headers.get("cf-connecting-ip");
  if (!value || value !== value.trim() || value.includes(",")) return null;
  const normalized = value.toLowerCase();
  return isIpv4(normalized) || isConservativeIpv6(normalized) ? normalized : null;
}

async function readRequestBody(request: Request, limit: number): Promise<{ password?: unknown } | "too-large" | null> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > limit)) {
    return "too-large";
  }

  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > limit) return "too-large";
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    const body: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    return body && typeof body === "object" && !Array.isArray(body) ? body as { password?: unknown } : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

function response(body: Record<string, string>, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}

function isIpv4(value: string): boolean {
  const parts = value.split(".");
  return parts.length === 4 && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}

function isConservativeIpv6(value: string): boolean {
  if (value.length > 45 || !value.includes(":") || !/^[0-9a-f:]+$/.test(value)) return false;
  try {
    return new URL(`http://[${value}]/`).hostname.startsWith("[");
  } catch {
    return false;
  }
}
