-- Run in Supabase SQL Editor once for the Prometric Edge project.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  profession text check (profession in ('pharmacist','nurse')),
  target_authority text check (target_authority in ('DHA','DOH','MOHAP')),
  plan text not null default 'free' check (plan in ('free','professional','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profession text not null check (profession in ('pharmacist','nurse')),
  mode text not null check (mode in ('practice','mock')),
  topic_filter text,
  score integer not null check (score between 0 and 100),
  correct_answers integer not null,
  total_questions integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.question_bank (
  id text primary key,
  profession text not null check (profession in ('pharmacist','nurse')),
  topic text not null,
  stem text not null,
  options jsonb not null,
  correct_answer integer not null check (correct_answer between 0 and 3),
  explanation text not null,
  review_status text not null default 'draft' check (review_status in ('draft','clinical_review','approved','withdrawn')),
  reviewed_by text,
  reviewed_at timestamptz,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.question_bank enable row level security;

create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own attempts" on public.exam_attempts for select using (auth.uid() = user_id);
create policy "Users create own attempts" on public.exam_attempts for insert with check (auth.uid() = user_id);
create policy "Public reads approved questions" on public.question_bank for select using (review_status = 'approved');

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles (id,full_name) values (new.id,coalesce(new.raw_user_meta_data->>'full_name','')); return new; end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
