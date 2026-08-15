import { createClient } from "npm:@supabase/supabase-js@2.57.0";
import { hasSecureSecret, issueAdminToken, verifyPassword } from "../_shared/auth.ts";
import { runtimeCorsConfig } from "../_shared/cors.ts";
import {
  createAdminLoginHandler,
  type ThrottleReservation,
  type ThrottleStore,
} from "../_shared/login.ts";

Deno.serve((request) => createAdminLoginHandler({
  throttle: supabaseThrottleStore(),
  corsConfig: runtimeCorsConfig(),
  now: () => new Date(),
  hashIp: (ip) => hashRateLimitScope(ip, requiredSecret("ADMIN_RATE_LIMIT_SALT")),
  verifyPassword,
  issueToken: issueAdminToken,
})(request));

function supabaseThrottleStore(): ThrottleStore {
  const database = createClient(
    requiredSecret("SUPABASE_URL"),
    requiredSecret("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  return {
    async reserve(ipHash): Promise<ThrottleReservation> {
      const { data, error } = await database
        .rpc("reserve_admin_login_attempt", { p_ip_hash: ipHash })
        .single();
      if (error || !data || typeof data.allowed !== "boolean") throw error ?? new TypeError("Invalid throttle response");
      return {
        allowed: data.allowed,
        lockedUntil: typeof data.locked_until === "string" ? data.locked_until : null,
      };
    },
    async clear(ipHash): Promise<void> {
      const { error } = await database.rpc("clear_admin_login_attempts", { p_ip_hash: ipHash });
      if (error) throw error;
    },
  };
}

async function hashRateLimitScope(scope: string, salt: string): Promise<string> {
  if (!hasSecureSecret(salt)) throw new TypeError("Rate-limit salt must be at least 32 characters");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(scope)));
  let binary = "";
  for (const byte of digest) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function requiredSecret(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new TypeError(`Missing ${name}`);
  return value;
}
