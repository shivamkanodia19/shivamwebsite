import {
  adminTokenExpiresAt,
  issueAdminToken,
  verifyAdminToken,
  verifyPassword,
  type AuthConfig,
} from "../_shared/auth.ts";

const encoder = new TextEncoder();
const testConfig: AuthConfig = {
  passwordHash: await passwordHash("correct horse battery staple"),
  tokenSecret: "test-only-token-signing-secret-123456",
};

Deno.test("verifyPassword accepts the configured password", async () => {
  assert(await verifyPassword("correct horse battery staple", testConfig));
});

Deno.test("verifyPassword rejects an incorrect password", async () => {
  assert(!(await verifyPassword("incorrect password", testConfig)));
});

Deno.test("verifyPassword always resolves to a boolean for malformed input", async () => {
  const result = await verifyPassword("any password", {
    ...testConfig,
    passwordHash: "malformed",
  });

  assert(typeof result === "boolean");
  assert(result === false);
});

Deno.test("issued admin tokens validate before expiry", async () => {
  const now = new Date("2026-08-15T12:00:00.000Z");
  const token = await issueAdminToken(now, testConfig);

  assert(await verifyAdminToken(token, now, testConfig));
});

Deno.test("issued token expiry is read from its integer-second payload", async () => {
  const now = new Date("2026-08-15T12:00:00.750Z");
  const token = await issueAdminToken(now, testConfig);

  assert(adminTokenExpiresAt(token) === "2026-08-15T20:00:00.000Z");
});

Deno.test("modified token signatures are rejected", async () => {
  const now = new Date("2026-08-15T12:00:00.000Z");
  const token = await issueAdminToken(now, testConfig);
  const modified = `${token.slice(0, -1)}${token.endsWith("A") ? "B" : "A"}`;

  assert(!(await verifyAdminToken(modified, now, testConfig)));
});

Deno.test("tokens for another audience are rejected", async () => {
  const now = new Date("2026-08-15T12:00:00.000Z");
  const token = await signedToken({
    aud: "another-service",
    iat: Math.floor(now.getTime() / 1000),
    exp: Math.floor(now.getTime() / 1000) + 60,
  }, testConfig.tokenSecret);

  assert(!(await verifyAdminToken(token, now, testConfig)));
});

Deno.test("expired tokens are rejected", async () => {
  const now = new Date("2026-08-15T12:00:00.000Z");
  const token = await signedToken({
    aud: "admin-analytics",
    iat: Math.floor(now.getTime() / 1000) - 120,
    exp: Math.floor(now.getTime() / 1000) - 1,
  }, testConfig.tokenSecret);

  assert(!(await verifyAdminToken(token, now, testConfig)));
});

Deno.test("tokens issued too far in the future are rejected", async () => {
  const now = new Date("2026-08-15T12:00:00.000Z");
  const token = await signedToken({
    aud: "admin-analytics",
    iat: Math.floor(now.getTime() / 1000) + 61,
    exp: Math.floor(now.getTime() / 1000) + 120,
  }, testConfig.tokenSecret);

  assert(!(await verifyAdminToken(token, now, testConfig)));
});

Deno.test("tokens cannot be issued with a short signing secret", async () => {
  const now = new Date("2026-08-15T12:00:00.000Z");
  await assertRejects(() => issueAdminToken(now, { tokenSecret: "too-short" }));
});

async function passwordHash(password: string): Promise<string> {
  const salt = encoder.encode("test-only-password-salt");
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 600_000 },
    material,
    256,
  );

  return `pbkdf2-sha256$600000$${base64Url(salt)}$${base64Url(new Uint8Array(bits))}`;
}

async function signedToken(
  payload: Record<string, unknown>,
  secret: string,
): Promise<string> {
  const header = base64Url(encoder.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64Url(encoder.encode(JSON.stringify(payload)));
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", material, encoder.encode(`${header}.${body}`));

  return `${header}.${body}.${base64Url(new Uint8Array(signature))}`;
}

function base64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}

async function assertRejects(operation: () => Promise<unknown>): Promise<void> {
  try {
    await operation();
  } catch {
    return;
  }
  throw new Error("expected operation to reject");
}
