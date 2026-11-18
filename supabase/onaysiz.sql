-- #BilimKıvılcımı · Ekip üyeleri e-posta onayı beklemeden giriş yapabilsin
-- Supabase panelinde SQL Editor > New query içine yapıştırıp Run'a basın. ekip.sql'den sonra çalıştırın.
-- Yalnızca bk_admins listesindeki (ekibe eklenmiş) e-postalar otomatik onaylanır; başka kimse etkilenmez.

-- 1) Yeni hesap: e-posta ekip listesindeyse hesap oluşturulurken onaylı sayılsın
create or replace function public.bk_auto_confirm() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.email_confirmed_at is null
     and exists (select 1 from public.bk_admins where lower(email) = lower(new.email)) then
    new.email_confirmed_at := now();
  end if;
  return new;
end $$;
drop trigger if exists bk_auto_confirm on auth.users;
create trigger bk_auto_confirm before insert or update of email on auth.users
  for each row execute function public.bk_auto_confirm();

-- 2) Hesabı açılmış ama onay bekleyen ekip üyelerini şimdi onayla
update auth.users set email_confirmed_at = now()
 where email_confirmed_at is null
   and lower(email) in (select lower(email) from public.bk_admins);

-- 3) Ana yönetici sonradan birini ekibe eklerse ve o kişinin hesabı zaten varsa, onu da onayla
create or replace function public.bk_confirm_member() returns trigger
language plpgsql security definer set search_path = public, auth as $$
begin
  update auth.users set email_confirmed_at = now()
   where email_confirmed_at is null and lower(email) = lower(new.email);
  return new;
end $$;
drop trigger if exists bk_confirm_member on public.bk_admins;
create trigger bk_confirm_member after insert on public.bk_admins
  for each row execute function public.bk_confirm_member();
revoke all on function public.bk_auto_confirm(), public.bk_confirm_member() from public, anon, authenticated;
