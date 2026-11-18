-- #BilimKıvılcımı · Yönetici ekibi: ana yönetici ve yetkili ekip üyeleri
-- Supabase panelinde SQL Editor > New query içine bu dosyanın tamamını yapıştırıp Run'a basın.
-- Birden fazla kez çalıştırmak güvenlidir. kurulum.sql daha önce çalıştırılmış olmalı.
--
-- Roller:
--   owner  = ana yönetici. Her şeyi görür, ekip üyesi ekler/çıkarır, yetki verir/alır. Tek bir tane olabilir.
--   collab = ekip üyesi. Yalnızca ana yöneticinin verdiği bölümleri görür.
-- Yetkiler (perms):
--   istatistik = genel sayılar ve grafikler
--   ogrenciler = öğrenci listesi ve CSV indirme
--   veri       = kodla / dosyayla veri ekleme (yalnızca kendi cihazında)

-- 1) Tabloya rol ve yetki sütunları
alter table public.bk_admins add column if not exists role text not null default 'collab';
alter table public.bk_admins add column if not exists perms text[] not null default '{}';
alter table public.bk_admins add column if not exists added_by text;
alter table public.bk_admins add column if not exists added_at timestamptz not null default now();
do $$ begin
  alter table public.bk_admins add constraint bk_admins_role_chk check (role in ('owner','collab'));
exception when duplicate_object then null; end $$;
create unique index if not exists bk_admins_one_owner on public.bk_admins ((role)) where role = 'owner';

-- Bu özellikten önce eklenmiş yöneticiler (panelden eklenmemiş olanlar) her şeyi görmeye devam etsin
update public.bk_admins set perms = '{istatistik,ogrenciler,veri}' where perms = '{}' and added_by is null and role = 'collab';

-- 2) Yardımcı fonksiyonlar
create or replace function public.bk_jwt_email() returns text
language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;

create or replace function public.bk_is_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bk_admins where lower(email) = public.bk_jwt_email() and role = 'owner');
$$;

create or replace function public.bk_has(p text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bk_admins
                 where lower(email) = public.bk_jwt_email() and (role = 'owner' or p = any(perms)));
$$;

-- Giriş yapan kişinin rolü ve yetkileri (yönetici değilse null)
create or replace function public.bk_me() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object('email', email, 'role', role,
           'perms', case when role = 'owner' then array['istatistik','ogrenciler','veri'] else perms end)
  from public.bk_admins where lower(email) = public.bk_jwt_email() limit 1;
$$;

-- Hesap oluşturma ekranı için: bu e-posta ekibe davet edilmiş mi?
create or replace function public.bk_invited(p_email text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bk_admins where lower(email) = lower(trim(p_email)));
$$;

-- 3) Ana yönetici: ekip listesi, ekleme/güncelleme, çıkarma
create or replace function public.bk_team() returns setof public.bk_admins
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.bk_is_owner() then raise exception 'yalnizca ana yonetici'; end if;
  return query select * from public.bk_admins order by (role = 'owner') desc, added_at;
end $$;

create or replace function public.bk_team_save(p_email text, p_perms text[]) returns boolean
language plpgsql security definer set search_path = public as $$
declare e text := lower(trim(p_email)); ps text[];
begin
  if not public.bk_is_owner() then raise exception 'yalnizca ana yonetici'; end if;
  if e !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or char_length(e) > 120 then raise exception 'gecersiz e-posta'; end if;
  if exists (select 1 from public.bk_admins where lower(email) = e and role = 'owner') then raise exception 'ana yonetici degistirilemez'; end if;
  select coalesce(array_agg(distinct x), '{}') into ps from unnest(coalesce(p_perms, '{}')) x
    where x in ('istatistik','ogrenciler','veri');
  insert into public.bk_admins (email, role, perms, added_by) values (e, 'collab', ps, public.bk_jwt_email())
  on conflict (email) do update set perms = excluded.perms;
  return true;
end $$;

create or replace function public.bk_team_remove(p_email text) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not public.bk_is_owner() then raise exception 'yalnizca ana yonetici'; end if;
  delete from public.bk_admins where lower(email) = lower(trim(p_email)) and role <> 'owner';
  return found;
end $$;

-- 4) Okuma kuralları: öğrenci verisini yalnızca istatistik ya da öğrenci yetkisi olanlar okur
drop policy if exists "yonetici okur" on public.bk_progress;
create policy "yonetici okur" on public.bk_progress for select to authenticated
  using (public.bk_has('istatistik') or public.bk_has('ogrenciler'));
drop policy if exists "yonetici kendini gorur" on public.bk_admins;
create policy "yonetici kendini gorur" on public.bk_admins for select to authenticated
  using (lower(email) = public.bk_jwt_email() or public.bk_is_owner());

-- 5) Yetkiler
revoke all on function public.bk_jwt_email(), public.bk_is_owner(), public.bk_has(text), public.bk_me(),
  public.bk_invited(text), public.bk_team(), public.bk_team_save(text, text[]), public.bk_team_remove(text) from public;
grant execute on function public.bk_jwt_email(), public.bk_is_owner(), public.bk_has(text), public.bk_me(),
  public.bk_team(), public.bk_team_save(text, text[]), public.bk_team_remove(text) to authenticated;
grant execute on function public.bk_invited(text) to anon, authenticated;
revoke insert, update, delete on public.bk_admins from anon, authenticated;

-- 6) ANA YÖNETİCİYİ ATA: aşağıdaki satırdaki e-postayı kendi e-postanla değiştirip
--    yalnızca bu satırı ayrıca çalıştır. (Bu e-posta Supabase'de giriş yapılan hesabın e-postası olmalı.)
--    Ana yöneticiyi değiştirmek için önce eskisini 'collab' yap, sonra yenisini 'owner' yap.
--
-- insert into public.bk_admins (email, role) values (lower('EPOSTAN@ornek.com'), 'owner')
--   on conflict (email) do update set role = 'owner';
