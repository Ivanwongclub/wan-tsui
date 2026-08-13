-- Wan Tsui CMS — C1 schema

-- 1. TABLES
create table public.site_content (
  key        text primary key,
  value_tc   text,
  value_en   text,
  updated_at timestamptz not null default now()
);

create table public.doctor_schedule (
  day_id       text primary key check (day_id in ('mon','tue','wed','thu','fri','sat','sun')),
  sort         int not null,
  am_tc text, am_en text,
  pm_tc text, pm_en text,
  is_closed_am boolean not null default false,
  is_closed_pm boolean not null default false,
  updated_at   timestamptz not null default now()
);

create table public.site_images (
  key        text primary key,
  url        text,
  alt_tc     text,
  alt_en     text,
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. ADMIN CHECK — lookup only, never a JWT claim
create or replace function public.is_wt_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid() and active = true);
$$;
revoke execute on function public.is_wt_admin() from anon, public;
grant execute on function public.is_wt_admin() to authenticated;

-- 3. RLS
alter table public.site_content    enable row level security;
alter table public.doctor_schedule enable row level security;
alter table public.site_images     enable row level security;
alter table public.admin_users     enable row level security;

create policy site_content_read    on public.site_content    for select to anon, authenticated using (true);
create policy site_content_write   on public.site_content    for all    to authenticated using (public.is_wt_admin()) with check (public.is_wt_admin());
create policy schedule_read        on public.doctor_schedule for select to anon, authenticated using (true);
create policy schedule_write       on public.doctor_schedule for all    to authenticated using (public.is_wt_admin()) with check (public.is_wt_admin());
create policy site_images_read     on public.site_images     for select to anon, authenticated using (true);
create policy site_images_write    on public.site_images     for all    to authenticated using (public.is_wt_admin()) with check (public.is_wt_admin());
create policy admin_users_read_own on public.admin_users     for select to authenticated using (user_id = auth.uid());

grant select on public.site_content, public.doctor_schedule, public.site_images to anon, authenticated;
grant insert, update, delete on public.site_content, public.doctor_schedule, public.site_images to authenticated;
grant select on public.admin_users to authenticated;

-- 4. SEED — doctor_schedule (current live values)
insert into public.doctor_schedule (day_id, sort, am_tc, am_en, pm_tc, pm_en, is_closed_am, is_closed_pm) values
 ('mon',1,'林慧美醫生','Dr. Lam','林慧美醫生','Dr. Lam',false,false),
 ('tue',2,'林慧美醫生','Dr. Lam','林慧美醫生','Dr. Lam',false,false),
 ('wed',3,'林慧美醫生','Dr. Lam','林慧美醫生','Dr. Lam',false,false),
 ('thu',4,'— 休診','— Closed','麥振威醫生','Dr. Mak',true,false),
 ('fri',5,'— 休診','— Closed','麥振威醫生','Dr. Mak',true,false),
 ('sat',6,'林慧美醫生','Dr. Lam','— 休診','— Closed',false,true),
 ('sun',7,'麥振威醫生','Dr. Mak','— 休診','— Closed',false,true);

-- 5. SEED — site_images slots (keys match the existing asset names; url NULL = built-in asset)
insert into public.site_images (key) values
 ('hero-clinic'),('doctor-mak'),('doctor-lam'),('location-chai-wan'),
 ('service-general-practice'),('service-colorectal-screening'),
 ('service-chronic-disease'),('service-flu-vaccine'),('service-voucher');
