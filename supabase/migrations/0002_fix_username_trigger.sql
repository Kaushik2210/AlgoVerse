-- Fixes the profile-creation trigger so a duplicate username auto-suffixes
-- instead of crashing the whole signup with "Database error saving new user".
-- Safe to run on its own — no need to re-run 0001_init.sql.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  base_username text;
  candidate_username text;
  attempt int := 0;
begin
  base_username := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
    split_part(new.email, '@', 1)
  );
  candidate_username := base_username;

  loop
    begin
      insert into public.profiles (id, username, display_name)
      values (new.id, candidate_username, base_username)
      on conflict (id) do nothing;
      exit;
    exception when unique_violation then
      attempt := attempt + 1;
      candidate_username := base_username || attempt::text;
      if attempt > 50 then
        candidate_username := base_username || '_' || replace(new.id::text, '-', '');
      end if;
    end;
  end loop;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
