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

Deno.test("login rejects non-exact JSON media types before reserving an attempt", async () => {
  const store = new RecordingThrottleStore();
  const handler = createHandler(store);
  const response = await handler(request({
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ password: "valid-password" }),
  }));

  assert(response.status === 400);
  assert(store.reservations === 0);
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

Deno.test("the global reservation prevents unlimited guesses from rotating client IPs", async () => {
  const store = new InMemoryAtomicThrottleStore();
  for (let index = 1; index <= 5; index += 1) {
    const result = await store.reserve(`ip-${index}`, "global", now);
    assert(result.allowed, `attempt ${index} should be allowed`);
  }

  const locked = await store.reserve("ip-6", "global", now);
  assert(!locked.allowed);
  assert(locked.lockedUntil === "2026-08-15T12:15:00.000Z");

  const stillLocked = await store.reserve("ip-7", "global", new Date("2026-08-15T12:14:59.000Z"));
  assert(stillLocked.lockedUntil === "2026-08-15T12:15:00.000Z");
});

function createHandler(store: ThrottleStore) {
  return createAdminLoginHandler({ ...dependencies(store), verifyPassword: async (password) => password === "valid-password" });
}

function dependencies(store: ThrottleStore) {
  return {
    throttle: store,
    now: () => now,
    corsConfig: { allowedOrigins: [origin] },
    hashScope: async (scope: string) => `hashed-${scope}`,
    issueToken: async () => "test-token",
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
  private lockedUntil: Date | null = null;

  reserve(ipHash: string, globalHash: string, at: Date): Promise<ThrottleReservation> {
    if (this.lockedUntil && this.lockedUntil > at) {
      return Promise.resolve({ allowed: false, lockedUntil: this.lockedUntil.toISOString() });
    }
    for (const key of [ipHash, globalHash]) {
      const recent = (this.attempts.get(key) ?? []).filter((attempt) => at.getTime() - attempt.getTime() < 15 * 60 * 1000);
      recent.push(at);
      this.attempts.set(key, recent);
      if (recent.length === 5) this.lockedUntil = new Date(at.getTime() + 15 * 60 * 1000);
    }
    return Promise.resolve({ allowed: true, lockedUntil: null });
  }

  clear(): Promise<void> {
    this.attempts.clear();
    this.lockedUntil = null;
    return Promise.resolve();
  }
}

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}
