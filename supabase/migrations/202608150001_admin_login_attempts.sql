create table if not exists public.admin_login_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null check (char_length(ip_hash) = 43),
  attempted_at timestamptz not null default clock_timestamp(),
  locked_until timestamptz
);

create index if not exists admin_login_attempts_ip_hash_attempted_at_idx
  on public.admin_login_attempts (ip_hash, attempted_at desc);

alter table public.admin_login_attempts enable row level security;

revoke all on table public.admin_login_attempts from public, anon, authenticated;

create or replace function public.reserve_admin_login_attempt(
  p_ip_hash text,
  p_global_hash text
)
returns table (allowed boolean, locked_until timestamptz)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_time timestamptz := clock_timestamp();
  active_lock timestamptz;
  next_lock timestamptz;
  ip_attempts integer;
  global_attempts integer;
begin
  if char_length(p_ip_hash) <> 43 or char_length(p_global_hash) <> 43 then
    raise exception 'Invalid throttle hash';
  end if;

  if p_ip_hash < p_global_hash then
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_ip_hash, 0));
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_global_hash, 0));
  else
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_global_hash, 0));
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_ip_hash, 0));
  end if;

  delete from public.admin_login_attempts
  where attempted_at < current_time - interval '15 minutes'
     or (locked_until is not null and locked_until <= current_time);

  select max(attempt.locked_until)
    into active_lock
    from public.admin_login_attempts as attempt
   where attempt.ip_hash in (p_ip_hash, p_global_hash)
     and attempt.locked_until > current_time;
  if active_lock is not null then
    return query select false, active_lock;
    return;
  end if;

  select count(*)::integer
    into ip_attempts
    from public.admin_login_attempts as attempt
   where attempt.ip_hash = p_ip_hash
     and attempt.attempted_at >= current_time - interval '15 minutes';
  select count(*)::integer
    into global_attempts
    from public.admin_login_attempts as attempt
   where attempt.ip_hash = p_global_hash
     and attempt.attempted_at >= current_time - interval '15 minutes';

  if ip_attempts + 1 >= 5 or global_attempts + 1 >= 5 then
    next_lock := current_time + interval '15 minutes';
  end if;

  insert into public.admin_login_attempts (ip_hash, attempted_at, locked_until)
  values (p_ip_hash, current_time, next_lock);
  if p_ip_hash <> p_global_hash then
    insert into public.admin_login_attempts (ip_hash, attempted_at, locked_until)
    values (p_global_hash, current_time, next_lock);
  end if;

  return query select true, null::timestamptz;
end;
$$;

create or replace function public.clear_admin_login_attempts(
  p_ip_hash text,
  p_global_hash text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if p_ip_hash < p_global_hash then
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_ip_hash, 0));
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_global_hash, 0));
  else
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_global_hash, 0));
    perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_ip_hash, 0));
  end if;

  delete from public.admin_login_attempts
  where ip_hash in (p_ip_hash, p_global_hash);
end;
$$;

revoke all on function public.reserve_admin_login_attempt(text, text) from public, anon, authenticated;
revoke all on function public.clear_admin_login_attempts(text, text) from public, anon, authenticated;
grant execute on function public.reserve_admin_login_attempt(text, text) to service_role;
grant execute on function public.clear_admin_login_attempts(text, text) to service_role;
