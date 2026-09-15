-- Per-problem LeetCode solve tracking, backed by the database.
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Safe to re-run: the table uses IF NOT EXISTS, policies are
-- dropped-then-recreated.

-- solved_problems ------------------------------------------------------------
-- One row per (user, problem) marked solved. Separate from the `progress`
-- table's jsonb blob on purpose: a "mark as solved" click is a single,
-- discrete, immediate action (see SupabaseSyncProvider.tsx), not something
-- that should wait for the debounced xp/streak snapshot push, and it needs
-- to be individually insertable/deletable rather than round-tripping the
-- whole progress row on every toggle.
--
-- Unlike earned_badges (permanent, no delete), a solved mark is a user note
-- to themselves and they're allowed to take it back if they toggle it off by
-- mistake — hence the delete policy below.
create table if not exists public.solved_problems (
  user_id uuid not null references auth.users (id) on delete cascade,
  problem_slug text not null,
  solved_at timestamptz not null default now(),
  primary key (user_id, problem_slug)
);

alter table public.solved_problems enable row level security;

drop policy if exists "solved_problems are viewable by owner" on public.solved_problems;
create policy "solved_problems are viewable by owner"
  on public.solved_problems for select
  using (auth.uid() = user_id);

drop policy if exists "solved_problems are insertable by owner" on public.solved_problems;
create policy "solved_problems are insertable by owner"
  on public.solved_problems for insert
  with check (auth.uid() = user_id);

drop policy if exists "solved_problems are deletable by owner" on public.solved_problems;
create policy "solved_problems are deletable by owner"
  on public.solved_problems for delete
  using (auth.uid() = user_id);

-- No update policy — a row's existence *is* the "solved" state; toggling
-- off is a delete, toggling back on is a fresh insert (solved_at just
-- reflects whenever that happened).
