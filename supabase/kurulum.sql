-- #BilimKıvılcımı · Supabase kurulumu
-- Supabase panelinde SQL Editor > New query içine bu dosyanın tamamını yapıştırıp Run'a basın.
-- Birden fazla kez çalıştırmak güvenlidir.

-- 1) Öğrenci ilerlemeleri (anonim: ad yok, yalnızca rastgele kimlik ve sayılar)
create table if not exists public.bk_progress (
  uid         text primary key check (char_length(uid) between 6 and 40),
  token_hash  text not null,
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.bk_progress enable row level security;

-- 2) Yönetici e-postaları
create table if not exists public.bk_admins (email text primary key);
alter table public.bk_admins enable row level security;
insert into public.bk_admins (email) values
  ('alideniztartmaa@gmail.com'),
  ('tartma@alideniz.me')
on conflict do nothing;

-- 3) Yönetici mi? (oturum açmış kullanıcının e-postasına bakar)
create or replace function public.bk_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bk_admins where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- 4) Okuma kuralları: tabloları yalnızca yöneticiler okuyabilir. Öğrenciler tabloya doğrudan erişemez.
drop policy if exists "yonetici okur" on public.bk_progress;
create policy "yonetici okur" on public.bk_progress for select to authenticated using (public.bk_is_admin());
drop policy if exists "yonetici kendini gorur" on public.bk_admins;
create policy "yonetici kendini gorur" on public.bk_admins for select to authenticated using (public.bk_is_admin());

-- 5) Öğrencinin cihazı kendi kaydını yazar. Kayıt, cihazda tutulan gizli bir anahtarla korunur:
--    başka biri aynı kimliği bilse de anahtarı bilmeden üzerine yazamaz.
create or replace function public.bk_sync(p_uid text, p_token text, p_data jsonb) returns boolean
language plpgsql security definer set search_path = public as $$
declare
  h text;
begin
  if p_uid is null or char_length(p_uid) not between 6 and 40 then raise exception 'gecersiz kimlik'; end if;
  if p_token is null or char_length(p_token) < 16 then raise exception 'gecersiz anahtar'; end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' or octet_length(p_data::text) > 20000 then raise exception 'gecersiz veri'; end if;
  h := encode(sha256(convert_to(p_token, 'UTF8')), 'hex');
  insert into public.bk_progress (uid, token_hash, data) values (p_uid, h, p_data - 'n')
  on conflict (uid) do update set data = excluded.data, updated_at = now()
    where public.bk_progress.token_hash = excluded.token_hash;
  return found;
end $$;

-- 6) Uyanık tutma (ücretsiz projeler etkinlik olmazsa duraklatılır)
create or replace function public.bk_ping() returns integer language sql stable as $$ select 1 $$;

-- 7) Yetkiler: herkes yalnızca bu fonksiyonları çağırabilir
revoke all on function public.bk_sync(text, text, jsonb) from public;
grant execute on function public.bk_sync(text, text, jsonb) to anon, authenticated;
grant execute on function public.bk_is_admin() to authenticated;
grant execute on function public.bk_ping() to anon, authenticated;
revoke insert, update, delete on public.bk_progress from anon, authenticated;
revoke insert, update, delete on public.bk_admins from anon, authenticated;

-- 8) Ekip ve yetkiler (ana yönetici, ekip üyeleri): ardından supabase/ekip.sql dosyasını çalıştırın.
