import {
  createAdminLoginHandler,
  type ThrottleReservation,
  type ThrottleStore,
} from "../_shared/login.ts";
import { corsHeaders, isAllowedOrigin } from "../_shared/cors.ts";

const origin = "https://shivamkanodia.com";
const now = new Date("2026-08-15T12:00:00.000Z");

Deno.test("CORS permits only HTTPS origins and explicit local development origins", () => {
  const config = { allowedOrigins: [origin, "http://localhost:5173", "http://127.0.0.1:4173"] };

  assert(isAllowedOrigin(origin, config));
  assert(isAllowedOrigin("http://localhost:5173", config));
  assert(!isAllowedOrigin("http://example.test", { allowedOrigins: ["http://example.test"] }));
  assert(!isAllowedOrigin("http://example.test", config));
  assert(!isAllowedOrigin("https://evil.example", config));
  assert(!("Access-Control-Allow-Origin" in corsHeaders("https://evil.example", config)));
});

Deno.test("login accepts application/json media-type parameters", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ password: "valid-password" }),
  }));

  assert(response.status === 200);
  assert(store.reservations === 1);
});

Deno.test("login rejects an oversized declared body before parsing it", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({
    headers: { "content-type": "application/json", "content-length": "4097" },
    body: JSON.stringify({ password: "valid-password" }),
  }));

  assert(response.status === 413);
  assert(store.reservations === 0);
});

Deno.test("login caps a streamed body even when content-length is absent", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password: "a".repeat(5_000) }),
  }));

  assert(response.status === 413);
  assert(store.reservations === 0);
});

Deno.test("login rejects missing trusted client IPs instead of using forwarded-for", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9" },
    body: JSON.stringify({ password: "valid-password" }),
  }));

  assert(response.status === 400);
  assert(store.reservations === 0);
});

Deno.test("login rejects malformed platform IP headers", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({
    headers: { "cf-connecting-ip": "not-an-address" },
    body: JSON.stringify({ password: "valid-password" }),
  }));

  assert(response.status === 400);
  assert(store.reservations === 0);
});

Deno.test("login clears an atomically reserved attempt after successful authentication", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({ body: JSON.stringify({ password: "valid-password" }) }));
  const payload = await response.json() as { token: string; expiresAt: string };

  assert(response.status === 200);
  assert(store.reservations === 1);
  assert(store.clears === 1);
  assert(payload.expiresAt === "2026-08-15T20:00:00.000Z");
});

Deno.test("a locked throttle reservation skips password verification", async () => {
  const store = new RecordingThrottleStore({ allowed: false, lockedUntil: "2026-08-15T12:15:00.000Z" });
  let verificationCalls = 0;
  const handler = createAdminLoginHandler({
    ...dependencies(store),
    verifyPassword: async () => {
      verificationCalls += 1;
      return false;
    },
  });
  const response = await handler(request({ body: JSON.stringify({ password: "valid-password" }) }));

  assert(response.status === 429);
  assert(verificationCalls === 0);
});

Deno.test("per-IP reservations do not lock other trusted addresses", async () => {
  const store = new InMemoryAtomicThrottleStore();
  for (let index = 1; index <= 5; index += 1) {
    const result = await store.reserve("ip-one", now);
    assert(result.allowed, `attempt ${index} should be allowed`);
  }

  const locked = await store.reserve("ip-one", now);
  assert(!locked.allowed);
  assert(locked.lockedUntil === "2026-08-15T12:15:00.000Z");

  const otherIp = await store.reserve("ip-two", now);
  assert(otherIp.allowed);
});

function createHandler(store: ThrottleStore) {
  return createAdminLoginHandler({ ...dependencies(store), verifyPassword: async (password) => password === "valid-password" });
}

function dependencies(store: ThrottleStore) {
  return {
    throttle: store,
    now: () => now,
    corsConfig: { allowedOrigins: [origin] },
    hashIp: async (ip: string) => `hashed-${ip}`,
    issueToken: async () => tokenWithExpiry("2026-08-15T20:00:00.000Z"),
  };
}

function request(options: { headers?: Record<string, string>; body: string }): Request {
  return new Request("https://example.supabase.co/functions/v1/admin-login", {
    method: "POST",
    headers: {
      origin,
      "cf-connecting-ip": "203.0.113.9",
      "content-type": "application/json",
      ...options.headers,
    },
    body: options.body,
  });
}

class RecordingThrottleStore implements ThrottleStore {
  reservations = 0;
  clears = 0;

  constructor(private readonly result: ThrottleReservation = { allowed: true, lockedUntil: null }) {}

  reserve(): Promise<ThrottleReservation> {
    this.reservations += 1;
    return Promise.resolve(this.result);
  }

  clear(): Promise<void> {
    this.clears += 1;
    return Promise.resolve();
  }
}

class InMemoryAtomicThrottleStore implements ThrottleStore {
  private readonly attempts = new Map<string, Date[]>();
  private readonly lockedUntil = new Map<string, Date>();

  reserve(ipHash: string, at: Date): Promise<ThrottleReservation> {
    const lockedUntil = this.lockedUntil.get(ipHash);
    if (lockedUntil && lockedUntil > at) {
      return Promise.resolve({ allowed: false, lockedUntil: lockedUntil.toISOString() });
    }
    const recent = (this.attempts.get(ipHash) ?? []).filter((attempt) => at.getTime() - attempt.getTime() < 15 * 60 * 1000);
    recent.push(at);
    this.attempts.set(ipHash, recent);
    if (recent.length === 5) this.lockedUntil.set(ipHash, new Date(at.getTime() + 15 * 60 * 1000));
    return Promise.resolve({ allowed: true, lockedUntil: null });
  }

  clear(ipHash: string): Promise<void> {
    this.attempts.delete(ipHash);
    this.lockedUntil.delete(ipHash);
    return Promise.resolve();
  }
}

function tokenWithExpiry(expiresAt: string): string {
  const payload = btoa(JSON.stringify({ exp: Math.floor(new Date(expiresAt).getTime() / 1_000) }))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
  return `header.${payload}.signature`;
}

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}
