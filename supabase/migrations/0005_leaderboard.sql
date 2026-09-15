-- Public leaderboard view.
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Safe to re-run: the view is dropped-then-recreated (create or replace).

-- leaderboard -----------------------------------------------------------------
-- Public read-only view backing the /leaderboard page. Same shape of trick as
-- certificate_badges (see supabase/migrations/0003_public_certificates.sql):
-- a plain view (security_invoker off, the default) runs with the privileges
-- of its owner, so it reads straight through the owner-only RLS on
-- `progress` and `solved_problems` below — and the `grant select ... to
-- anon` is what makes the *view itself* (and only these columns) public.
--
-- Deliberately exposes ONLY what a leaderboard needs — username, display
-- name, xp, streaks, solved count. NEVER email, modules, activity_log, or
-- anything else private. Rank titles are derived client-side from xp via
-- src/lib/leveling.ts rather than duplicated here, so the level curve only
-- has to live in one place.
create or replace view public.leaderboard as
select
  p.username,
  p.display_name,
  pr.xp,
  pr.current_streak,
  pr.longest_streak,
  coalesce(sp.solved_count, 0) as solved_count
from public.profiles p
join public.progress pr on pr.user_id = p.id
left join (
  select user_id, count(*) as solved_count
  from public.solved_problems
  group by user_id
) sp on sp.user_id = p.id
where p.username is not null;

grant select on public.leaderboard to anon, authenticated;
