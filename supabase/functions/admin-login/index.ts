import { createClient } from "npm:@supabase/supabase-js@2";
import { issueAdminToken, verifyPassword } from "../_shared/auth.ts";
import { corsHeaders, isAllowedOrigin } from "../_shared/cors.ts";

const maximumPasswordLength = 1_024;
const maxFailures = 5;
const lockoutWindowMilliseconds = 15 * 60 * 1000;

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = { ...corsHeaders(origin), "Cache-Control": "no-store" };

  if (!isAllowedOrigin(origin)) {
    return response({ error: "Invalid request" }, 403, headers);
  }
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST" || !isJsonRequest(request)) {
    return response({ error: "Invalid request" }, 400, headers);
  }

  const password = await readPassword(request);
  if (password === null || password.length > maximumPasswordLength) {
    return response({ error: "Invalid request" }, 400, headers);
  }

  try {
    const database = createClient(
      requiredSecret("SUPABASE_URL"),
      requiredSecret("SUPABASE_SERVICE_ROLE_KEY"),
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
    const ipHash = await hashIp(normalizedForwardedIp(request), requiredSecret("ADMIN_RATE_LIMIT_SALT"));
    const cutoff = new Date(Date.now() - lockoutWindowMilliseconds).toISOString();
    const { count, error: countError } = await database
      .from("admin_login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("attempted_at", cutoff);
    if (countError) throw countError;
    if ((count ?? 0) >= maxFailures) {
      return response({ error: "Too many attempts" }, 429, headers);
    }

    if (!(await verifyPassword(password))) {
      const { error: insertError } = await database.from("admin_login_attempts").insert({ ip_hash: ipHash });
      if (insertError) throw insertError;

      const { count: updatedCount, error: updatedCountError } = await database
        .from("admin_login_attempts")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("attempted_at", cutoff);
      if (updatedCountError) throw updatedCountError;
      return response(
        { error: (updatedCount ?? 0) >= maxFailures ? "Too many attempts" : "Invalid password" },
        (updatedCount ?? 0) >= maxFailures ? 429 : 401,
        headers,
      );
    }

    const { error: deleteError } = await database.from("admin_login_attempts").delete().eq("ip_hash", ipHash);
    if (deleteError) throw deleteError;

    const now = new Date();
    const token = await issueAdminToken(now);
    return response({ token, expiresAt: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString() }, 200, headers);
  } catch {
    return response({ error: "Invalid request" }, 500, headers);
  }
});

function response(body: Record<string, string>, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}

function isJsonRequest(request: Request): boolean {
  return request.headers.get("content-type")?.toLowerCase().startsWith("application/json") ?? false;
}

async function readPassword(request: Request): Promise<string | null> {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return null;
    const password = (body as Record<string, unknown>).password;
    return typeof password === "string" ? password : null;
  } catch {
    return null;
  }
}

function normalizedForwardedIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? request.headers.get("cf-connecting-ip") ?? "";
  const firstValue = forwarded.split(",", 1)[0]?.trim().toLowerCase() ?? "";
  const normalized = firstValue.startsWith("::ffff:") ? firstValue.slice(7) : firstValue;
  return /^[0-9a-f:.]{3,45}$/.test(normalized) ? normalized : "unknown";
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip)));
  let binary = "";
  for (const byte of digest) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function requiredSecret(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new TypeError(`Missing ${name}`);
  return value;
}
