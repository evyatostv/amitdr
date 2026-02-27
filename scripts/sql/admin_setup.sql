begin;

create table if not exists public.cookie_logs (
  id bigint generated always as identity primary key,
  choice text not null check (choice in ('accepted', 'essential')),
  path text,
  user_agent text,
  language text,
  source text default 'web',
  created_at timestamptz not null default now()
);

create table if not exists public.site_stats (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  language text,
  user_agent text,
  screen text,
  cookies_enabled boolean,
  created_at timestamptz not null default now()
);

alter table public.cookie_logs enable row level security;
alter table public.site_stats enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'cookie_logs' and policyname = 'cookie_logs_insert_all'
  ) then
    create policy cookie_logs_insert_all on public.cookie_logs
      for insert
      to anon, authenticated
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'cookie_logs' and policyname = 'cookie_logs_select_authenticated'
  ) then
    create policy cookie_logs_select_authenticated on public.cookie_logs
      for select
      to authenticated
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_stats' and policyname = 'site_stats_insert_all'
  ) then
    create policy site_stats_insert_all on public.site_stats
      for insert
      to anon, authenticated
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_stats' and policyname = 'site_stats_select_authenticated'
  ) then
    create policy site_stats_select_authenticated on public.site_stats
      for select
      to authenticated
      using (true);
  end if;
end $$;

grant usage on schema public to anon, authenticated;
grant select, insert on public.cookie_logs to anon, authenticated;
grant select, insert on public.site_stats to anon, authenticated;

commit;
