const migration = await Deno.readTextFile(
  new URL("../../migrations/202608150001_admin_login_attempts.sql", import.meta.url),
);

Deno.test("throttle migration defines a serialized per-IP reservation contract", () => {
  assert(migration.includes("security definer"));
  assert(migration.includes("pg_advisory_xact_lock"));
  assert(migration.includes("v_now timestamptz := clock_timestamp()"));
  assert(migration.includes("attempt.locked_until"));
  assert(migration.includes("v_ip_attempts + 1 >= 5"));
  assert(migration.includes("v_next_lock := v_now + interval '15 minutes'"));
  assert(migration.includes("delete from public.admin_login_attempts as attempt"));
  assert(migration.includes("grant execute on function public.reserve_admin_login_attempt(text) to service_role"));
  assert(migration.includes("grant execute on function public.clear_admin_login_attempts(text) to service_role"));
});

Deno.test("throttle migration contains no global reservation bucket", () => {
  assert(!migration.includes("p_global_hash"));
  assert(!migration.includes("global_attempts"));
});

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}
