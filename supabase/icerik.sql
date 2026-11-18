-- BilimKivilcimi: ders duzenleyici (ekip.sql'den SONRA calistir)
create table if not exists public.bk_content (
  version bigserial primary key,
  data jsonb not null,
  note text,
  created_by text,
  created_at timestamptz not null default now()
);
alter table public.bk_content enable row level security;
drop policy if exists "herkes okur" on public.bk_content;
create policy "herkes okur" on public.bk_content
  for select to anon, authenticated using (true);
revoke all on public.bk_content from anon, authenticated;
grant select (version, data, note, created_at)
  on public.bk_content to anon, authenticated;

create or replace function public.bk_content_publish(
  p_data jsonb, p_note text)
returns bigint
language plpgsql security definer
set search_path = public
as $$
declare
  v bigint;
begin
  if not public.bk_has('icerik') then
    raise exception 'icerik yetkisi yok';
  end if;
  if jsonb_typeof(p_data) <> 'object' then
    raise exception 'gecersiz icerik';
  end if;
  if octet_length(p_data::text) > 1500000 then
    raise exception 'icerik cok buyuk';
  end if;
  insert into public.bk_content (data, note, created_by)
  values (p_data, left(coalesce(p_note, ''), 200),
          public.bk_jwt_email())
  returning version into v;
  return v;
end;
$$;
revoke all on function public.bk_content_publish(jsonb, text)
  from public, anon;
grant execute on function public.bk_content_publish(jsonb, text)
  to authenticated;

drop function if exists public.bk_content_list();
create function public.bk_content_list()
returns setof public.bk_content
language plpgsql stable security definer
set search_path = public
as $$
begin
  if not public.bk_has('icerik') then
    raise exception 'icerik yetkisi yok';
  end if;
  return query
    select * from public.bk_content
    order by version desc limit 30;
end;
$$;
revoke all on function public.bk_content_list() from public, anon;
grant execute on function public.bk_content_list() to authenticated;

create or replace function public.bk_me()
returns json
language plpgsql stable security definer
set search_path = public
as $$
declare
  r public.bk_admins;
begin
  select * into r from public.bk_admins
  where lower(email) = public.bk_jwt_email() limit 1;
  if not found then
    return null;
  end if;
  if r.role = 'owner' then
    r.perms := array['istatistik','ogrenciler','veri','icerik'];
  end if;
  return json_build_object(
    'email', r.email, 'role', r.role, 'perms', r.perms);
end;
$$;

create or replace function public.bk_team_save(
  p_email text, p_perms text[])
returns boolean
language plpgsql security definer
set search_path = public
as $$
declare
  e text := lower(trim(p_email));
  ps text[];
begin
  if not public.bk_is_owner() then
    raise exception 'yalnizca ana yonetici';
  end if;
  if position('@' in e) < 2 or char_length(e) > 120 then
    raise exception 'gecersiz e-posta';
  end if;
  if exists (select 1 from public.bk_admins
             where lower(email) = e and role = 'owner') then
    raise exception 'ana yonetici degistirilemez';
  end if;
  select coalesce(array_agg(distinct x), '{}') into ps
  from unnest(coalesce(p_perms, '{}')) as x
  where x in ('istatistik','ogrenciler','veri','icerik');
  insert into public.bk_admins (email, role, perms, added_by)
  values (e, 'collab', ps, public.bk_jwt_email())
  on conflict (email) do update set perms = excluded.perms;
  return true;
end;
$$;
