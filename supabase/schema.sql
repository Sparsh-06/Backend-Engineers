-- First-party analytics events table.
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query)
-- for whichever Supabase project you point SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY at.

create table if not exists analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null,          -- 'pageview', or a custom event name
  path text,                         -- page path, e.g. '/topics/lru-cache'
  referrer text,                     -- document.referrer at the time, if any
  session_id text not null,          -- random per-tab-session id, sessionStorage only - never a persistent cookie
  meta jsonb,                        -- optional extra data, shaped per event_type
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_created_at on analytics_events (created_at);
create index if not exists idx_analytics_events_path on analytics_events (path);
create index if not exists idx_analytics_events_type on analytics_events (event_type);

-- Row-level security is enabled with no policies, so only the service role
-- key (used server-side only, in src/lib/supabase.ts) can read or write.
-- The anon/public key - if you ever add one client-side - would see nothing.
alter table analytics_events enable row level security;
