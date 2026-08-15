export type CorsConfig = {
  allowedOrigins: readonly string[];
};

const defaultAllowedOrigins = ["https://shivamkanodia.com"];

export function isAllowedOrigin(
  origin: string | null,
  config: CorsConfig = runtimeCorsConfig(),
): origin is string {
  return origin !== null && isSafeOrigin(origin) && config.allowedOrigins.includes(origin);
}

export function corsHeaders(
  origin: string | null,
  config: CorsConfig = runtimeCorsConfig(),
): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "600",
    "Vary": "Origin",
  };

  if (isAllowedOrigin(origin, config)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export function runtimeCorsConfig(): CorsConfig {
  const configured = Deno.env.get("ADMIN_ALLOWED_ORIGINS")
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(isSafeOrigin) ?? [];
  return { allowedOrigins: [...new Set([...defaultAllowedOrigins, ...configured])] };
}

function isSafeOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.origin !== origin || url.username || url.password) return false;
    if (url.protocol === "https:") return true;
    return url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}
