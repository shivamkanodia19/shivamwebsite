export type AuthConfig = {
  passwordHash: string;
  tokenSecret: string;
};

type PasswordConfig = Pick<AuthConfig, "passwordHash">;
type TokenConfig = Pick<AuthConfig, "tokenSecret">;

type AdminTokenPayload = {
  aud: "admin-analytics";
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const passwordHashPattern = /^pbkdf2-sha256\$(\d+)\$([A-Za-z0-9_-]+)\$([A-Za-z0-9_-]+)$/;
export const ADMIN_TOKEN_LIFETIME_SECONDS = 8 * 60 * 60;
export const MINIMUM_SECRET_LENGTH = 32;
const maximumFutureIatSkewSeconds = 60;

export async function verifyPassword(
  password: string,
  config: PasswordConfig = runtimeConfig(),
): Promise<boolean> {
  if (typeof password !== "string") return false;

  const parsed = parsePasswordHash(config.passwordHash);
  if (!parsed) return false;

  try {
    const material = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const derived = new Uint8Array(await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: parsed.salt,
        iterations: parsed.iterations,
      },
      material,
      parsed.expected.length * 8,
    ));

    return constantTimeEqual(derived, parsed.expected);
  } catch {
    return false;
  }
}

export async function issueAdminToken(
  now: Date,
  config: TokenConfig = runtimeConfig(),
): Promise<string> {
  const issuedAt = epochSeconds(now);
  const payload: AdminTokenPayload = {
    aud: "admin-analytics",
    iat: issuedAt,
    exp: issuedAt + ADMIN_TOKEN_LIFETIME_SECONDS,
  };
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(`${header}.${body}`, config.tokenSecret);

  return `${header}.${body}.${signature}`;
}

export async function verifyAdminToken(
  token: string,
  now: Date,
  config: TokenConfig = runtimeConfig(),
): Promise<boolean> {
  if (typeof token !== "string" || !hasSecureSecret(config.tokenSecret)) return false;

  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => !part)) return false;

  const [header, body, suppliedSignature] = parts;
  try {
    const parsedHeader = JSON.parse(decodeBase64Url(header));
    const payload = JSON.parse(decodeBase64Url(body)) as unknown;
    if (parsedHeader?.alg !== "HS256" || parsedHeader?.typ !== "JWT") return false;
    if (!isAdminTokenPayload(payload, epochSeconds(now))) return false;

    const expectedSignature = decodeBase64UrlBytes(await sign(`${header}.${body}`, config.tokenSecret));
    const actualSignature = decodeBase64UrlBytes(suppliedSignature);
    return constantTimeEqual(actualSignature, expectedSignature);
  } catch {
    return false;
  }
}

function parsePasswordHash(value: string): {
  iterations: number;
  salt: Uint8Array;
  expected: Uint8Array;
} | null {
  const match = passwordHashPattern.exec(value);
  if (!match) return null;

  const iterations = Number(match[1]);
  if (!Number.isSafeInteger(iterations) || iterations < 600_000) return null;

  try {
    const salt = decodeBase64UrlBytes(match[2]);
    const expected = decodeBase64UrlBytes(match[3]);
    if (salt.length < 16 || expected.length !== 32) return null;
    return { iterations, salt, expected };
  } catch {
    return null;
  }
}

function isAdminTokenPayload(value: unknown, now: number): value is AdminTokenPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  if (
    payload.aud !== "admin-analytics" ||
    !isTimestamp(payload.iat) ||
    !isTimestamp(payload.exp)
  ) return false;

  return payload.exp > now && payload.exp > payload.iat &&
    payload.exp <= payload.iat + ADMIN_TOKEN_LIFETIME_SECONDS &&
    payload.iat <= now + maximumFutureIatSkewSeconds;
}

function isTimestamp(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function runtimeConfig(): AuthConfig {
  return {
    passwordHash: Deno.env.get("ADMIN_PASSWORD_HASH") ?? "",
    tokenSecret: Deno.env.get("ADMIN_TOKEN_SECRET") ?? "",
  };
}

function epochSeconds(date: Date): number {
  const milliseconds = date.getTime();
  if (!Number.isFinite(milliseconds)) throw new TypeError("Invalid token clock");
  return Math.floor(milliseconds / 1000);
}

async function sign(value: string, secret: string): Promise<string> {
  if (!hasSecureSecret(secret)) throw new TypeError("Token secret must be at least 32 characters");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return encodeBase64Url(new Uint8Array(signature));
}

export function hasSecureSecret(value: string): boolean {
  return typeof value === "string" && value.length >= MINIMUM_SECRET_LENGTH;
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  let difference = left.length ^ right.length;
  const maxLength = Math.max(left.length, right.length);
  for (let index = 0; index < maxLength; index += 1) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return difference === 0;
}

function encodeBase64Url(value: string | Uint8Array): string {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function decodeBase64Url(value: string): string {
  return decoder.decode(decodeBase64UrlBytes(value));
}

function decodeBase64UrlBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new TypeError("Invalid base64url value");
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = `${base64}${"=".repeat((4 - (base64.length % 4)) % 4)}`;
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
