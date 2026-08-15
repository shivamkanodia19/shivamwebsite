create table if not exists public.admin_login_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null check (char_length(ip_hash) = 43),
  attempted_at timestamptz not null default now()
);

create index if not exists admin_login_attempts_ip_hash_attempted_at_idx
  on public.admin_login_attempts (ip_hash, attempted_at desc);

alter table public.admin_login_attempts enable row level security;

revoke all on table public.admin_login_attempts from public, anon, authenticated;
