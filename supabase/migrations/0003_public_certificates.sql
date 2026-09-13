-- Public, database-backed certificate records for earned badges.
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Safe to re-run: the table uses IF NOT EXISTS, policies/view are
-- dropped-then-recreated.

-- 1. earned_badges -----------------------------------------------------------
-- Normalized record of exactly when a user earned each badge. This is what
-- backs the public /c/[username]/[badgeId] certificate pages — a real,
-- permanent, database-verified record instead of trusting the viewer's local
-- progress store or a trustable-only-by-convention URL query param.
create table if not exists public.earned_badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

alter table public.earned_badges enable row level security;

drop policy if exists "earned_badges are viewable by owner" on public.earned_badges;
create policy "earned_badges are viewable by owner"
  on public.earned_badges for select
  using (auth.uid() = user_id);

drop policy if exists "earned_badges are insertable by owner" on public.earned_badges;
create policy "earned_badges are insertable by owner"
  on public.earned_badges for insert
  with check (auth.uid() = user_id);

drop policy if exists "earned_badges are updatable by owner" on public.earned_badges;
create policy "earned_badges are updatable by owner"
  on public.earned_badges for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Deliberately no delete policy — an earned badge is a permanent record;
-- nobody (not even the owner) can remove one through the API.

-- 2. certificate_badges -------------------------------------------------------
-- Public read-only view backing the shareable certificate pages. Exposes
-- ONLY what a certificate needs to show — username, display name, badge id,
-- earned date — never xp/streak/activity_log/anything private.
--
-- A plain view (security_invoker off, the default) runs with the privileges
-- of its owner rather than the querying role, so it reads straight through
-- both underlying tables regardless of the owner-only RLS policies above.
-- The `grant select ... to anon` below is what actually makes it readable by
-- anyone with a certificate link, logged in or not — and only these four
-- columns are ever exposed.
create or replace view public.certificate_badges as
select
  p.username,
  p.display_name,
  eb.badge_id,
  eb.earned_at
from public.earned_badges eb
join public.profiles p on p.id = eb.user_id
where p.username is not null;

grant select on public.certificate_badges to anon, authenticated;
