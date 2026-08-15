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

create or replace function public.reserve_admin_login_attempt(p_ip_hash text)
returns table (allowed boolean, locked_until timestamptz)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_active_lock timestamptz;
  v_next_lock timestamptz;
  v_ip_attempts integer;
begin
  if char_length(p_ip_hash) <> 43 then
    raise exception 'Invalid throttle hash';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_ip_hash, 0));

  delete from public.admin_login_attempts as attempt
  where attempt.attempted_at < v_now - interval '15 minutes'
     or (attempt.locked_until is not null and attempt.locked_until <= v_now);

  select max(attempt.locked_until)
    into v_active_lock
    from public.admin_login_attempts as attempt
   where attempt.ip_hash = p_ip_hash
     and attempt.locked_until > v_now;
  if v_active_lock is not null then
    return query select false, v_active_lock;
    return;
  end if;

  select count(*)::integer
    into v_ip_attempts
    from public.admin_login_attempts as attempt
   where attempt.ip_hash = p_ip_hash
     and attempt.attempted_at >= v_now - interval '15 minutes';

  if v_ip_attempts + 1 >= 5 then
    v_next_lock := v_now + interval '15 minutes';
  end if;

  insert into public.admin_login_attempts (ip_hash, attempted_at, locked_until)
  values (p_ip_hash, v_now, v_next_lock);

  return query select true, null::timestamptz;
end;
$$;

create or replace function public.clear_admin_login_attempts(p_ip_hash text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  perform pg_advisory_xact_lock(hashtextextended('admin-login:' || p_ip_hash, 0));

  delete from public.admin_login_attempts as attempt
  where attempt.ip_hash = p_ip_hash;
end;
$$;

revoke all on function public.reserve_admin_login_attempt(text) from public, anon, authenticated;
revoke all on function public.clear_admin_login_attempts(text) from public, anon, authenticated;
grant execute on function public.reserve_admin_login_attempt(text) to service_role;
grant execute on function public.clear_admin_login_attempts(text) to service_role;
