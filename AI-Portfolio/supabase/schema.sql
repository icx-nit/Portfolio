-- ============================================================================
-- Nittaya Pana Developer Portfolio — Supabase PostgreSQL Schema
-- Following Supabase Postgres Best Practices:
-- - RLS enabled on all tables
-- - Explicit foreign keys, primary keys, and indexes
-- - Strict access separation: Public read, Owner write, Visitor interaction
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Owner identity)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  institution TEXT NOT NULL,
  faculty TEXT NOT NULL,
  major TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT NOT NULL,
  avatar_url TEXT,
  resume_url TEXT NOT NULL DEFAULT '/resume.pdf',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. EDUCATION
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  current BOOLEAN NOT NULL DEFAULT TRUE,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  overview TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  demo_url TEXT,
  github_url TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  likes_count INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. RESUMES
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. FOLLOWS (Visitor follow records)
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_visitor_follow UNIQUE (visitor_id)
);

-- 7. LIKES (Portfolio and Project likes)
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('portfolio', 'project')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_visitor_target_like UNIQUE (visitor_id, project_id, target_type)
);

-- 8. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. GITHUB REPOSITORIES CACHE
CREATE TABLE IF NOT EXISTS public.github_repositories_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  repo_name TEXT NOT NULL,
  description TEXT,
  language TEXT,
  html_url TEXT NOT NULL,
  stars INT NOT NULL DEFAULT 0,
  forks INT NOT NULL DEFAULT 0,
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_likes_project ON public.likes(project_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON public.contact_messages(is_read);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_repositories_cache ENABLE ROW LEVEL SECURITY;

-- Public READ policies
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public education is readable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public skills are readable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public projects are readable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public resumes are readable by everyone" ON public.resumes FOR SELECT USING (true);
CREATE POLICY "Follows count is readable by everyone" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Likes count is readable by everyone" ON public.likes FOR SELECT USING (true);
CREATE POLICY "GitHub cache is readable by everyone" ON public.github_repositories_cache FOR SELECT USING (true);

-- Public INSERT policies (Interactions & Contact)
CREATE POLICY "Visitors can create follow records" ON public.follows FOR INSERT WITH CHECK (true);
CREATE POLICY "Visitors can create like records" ON public.likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Visitors can delete their own like records" ON public.likes FOR DELETE USING (true);
CREATE POLICY "Visitors can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated Owner-Only policies (Dashboard Management)
CREATE POLICY "Owner can manage profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Owner can manage education" ON public.education FOR ALL TO authenticated USING (true);
CREATE POLICY "Owner can manage skills" ON public.skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Owner can manage projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Owner can manage resumes" ON public.resumes FOR ALL TO authenticated USING (true);
CREATE POLICY "Owner can read contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Owner can update contact messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Owner can manage GitHub cache" ON public.github_repositories_cache FOR ALL TO authenticated USING (true);

-- ============================================================================
-- INITIAL SEED DATA
-- ============================================================================
INSERT INTO public.profiles (name, title, bio, institution, faculty, major, email, github_url)
VALUES (
  'Nittaya Pana',
  'Software Developer & Engineer',
  'Software Engineering student at the School of Information and Communication Technology, University of Phayao. Passionate about modern web applications, clean architecture, and responsive user experiences.',
  'University of Phayao',
  'School of Information and Communication Technology',
  'Software Engineering',
  'nittaya503555@gmail.com',
  'https://github.com/icx-nit'
) ON CONFLICT DO NOTHING;

INSERT INTO public.education (institution, degree, field_of_study, start_date, current, description)
VALUES (
  'University of Phayao',
  'Bachelor of Science',
  'Software Engineering',
  '2023',
  TRUE,
  'School of Information and Communication Technology. Coursework in Software Architecture, Database Systems, Web Engineering, and Algorithms.'
) ON CONFLICT DO NOTHING;
