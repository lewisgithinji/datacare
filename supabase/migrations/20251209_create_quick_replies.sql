-- Create whatsapp_quick_replies table
create table public.whatsapp_quick_replies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.whatsapp_organizations(id) on delete cascade,
  shortcut text not null,
  content text not null,
  category text,
  usage_count integer default 0,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add unique constraint for shortcut per organization
alter table public.whatsapp_quick_replies 
  add constraint unique_shortcut_per_org unique (organization_id, shortcut);

-- Enable RLS
alter table public.whatsapp_quick_replies enable row level security;

-- Create RLS policies
-- 1. View policies
create policy "Users can view quick replies for their organizations"
  on public.whatsapp_quick_replies for select
  using (
    organization_id in (
      select organization_id 
      from public.whatsapp_team_members 
      where user_id = auth.uid()
    )
  );

-- 2. Insert policies
create policy "Users can create quick replies for their organizations"
  on public.whatsapp_quick_replies for insert
  with check (
    organization_id in (
      select organization_id 
      from public.whatsapp_team_members 
      where user_id = auth.uid()
    )
  );

-- 3. Update policies
create policy "Users can update quick replies for their organizations"
  on public.whatsapp_quick_replies for update
  using (
    organization_id in (
      select organization_id 
      from public.whatsapp_team_members 
      where user_id = auth.uid()
    )
  );

-- 4. Delete policies
create policy "Users can delete quick replies for their organizations"
  on public.whatsapp_quick_replies for delete
  using (
    organization_id in (
      select organization_id 
      from public.whatsapp_team_members 
      where user_id = auth.uid()
    )
  );
