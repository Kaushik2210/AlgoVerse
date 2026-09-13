-- AlgoVerse cloud progress sync — initial schema
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

-- 1. profiles ---------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. progress -----------------------------------------------------------
-- One row per user. Mirrors the shape of the local Zustand store
-- (src/lib/store/progress.ts) directly, including modules and the activity
-- log as jsonb, so the whole row can be read/written in a single round trip
-- instead of syncing many tiny per-module or per-event rows.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  xp integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_activity_date date,
  earned_badge_ids text[] not null default '{}',
  -- Record<slug, { percent, completed, quizScore?, quizTotal?, lastVisited? }>
  modules jsonb not null default '{}'::jsonb,
  -- ActivityEvent[] — { date, type, amount, label? }
  activity_log jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

create policy "progress is viewable by owner"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "progress is insertable by owner"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "progress is updatable by owner"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "progress is deletable by owner"
  on public.progress for delete
  using (auth.uid() = user_id);

-- 3. module_progress ------------------------------------------------------
-- Optional normalized breakdown, kept alongside the jsonb `modules` column
-- on `progress` for anyone who wants to query/report per-module completion
-- with SQL (e.g. "how many users finished arrays"). The app itself reads
-- and writes the jsonb column as the source of truth; this table is not
-- required for the sync flow to work.
create table if not exists public.module_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  module_id text not null,
  completed boolean not null default false,
  quiz_score integer,
  quiz_total integer,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.module_progress enable row level security;

create policy "module_progress is viewable by owner"
  on public.module_progress for select
  using (auth.uid() = user_id);

create policy "module_progress is insertable by owner"
  on public.module_progress for insert
  with check (auth.uid() = user_id);

create policy "module_progress is updatable by owner"
  on public.module_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "module_progress is deletable by owner"
  on public.module_progress for delete
  using (auth.uid() = user_id);

-- Keep updated_at fresh on every write.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_progress_updated_at on public.progress;
create trigger set_progress_updated_at
  before update on public.progress
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_module_progress_updated_at on public.module_progress;
create trigger set_module_progress_updated_at
  before update on public.module_progress
  for each row execute procedure public.set_updated_at();
