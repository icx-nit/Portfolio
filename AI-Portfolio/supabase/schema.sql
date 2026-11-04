-- ============================================================================
-- Nittaya Pana Developer Portfolio — Supabase PostgreSQL Schema
-- Updated according to PLAN.md:
-- - RLS enabled on all tables
-- - Social Feed (`posts` and `post_images` tables)
-- - Strict access separation: Public read, Owner write, Visitor interactions
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

-- 2. POSTS (Social Feed)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  content_th TEXT,
  category TEXT DEFAULT 'Announcement',
  category_th TEXT DEFAULT 'ประกาศทางการ',
  likes_count INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. POST IMAGES
CREATE TABLE IF NOT EXISTS public.post_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EDUCATION
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

-- 5. SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. PROJECTS
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

-- 7. RESUMES
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. FOLLOWS (Visitor follow records)
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_visitor_follow UNIQUE (visitor_id)
);

-- 9. LIKES (Portfolio, Post, and Project likes)
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('portfolio', 'project', 'post')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_visitor_target_like UNIQUE (visitor_id, target_id, target_type)
);

-- 10. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. GITHUB REPOSITORIES CACHE
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
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_likes_target ON public.likes(target_id, target_type);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON public.contact_messages(is_read);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_images ENABLE ROW LEVEL SECURITY;
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
CREATE POLICY "Public published posts are readable by everyone" ON public.posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public post images are readable by everyone" ON public.post_images FOR SELECT USING (true);
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
CREATE POLICY "Owner can manage posts" ON public.posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Owner can manage post images" ON public.post_images FOR ALL TO authenticated USING (true);
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
  'Nittaya Pana (นิตยา ปานา)',
  'Software Developer & Engineer',
  'Software Engineering student at the School of Information and Communication Technology, University of Phayao. Passionate about modern web applications, clean architecture, and responsive user experiences.',
  'University of Phayao',
  'School of Information and Communication Technology',
  'Software Engineering',
  'nittaya503555@gmail.com',
  'https://github.com/icx-nit'
) ON CONFLICT DO NOTHING;

INSERT INTO public.posts (content, content_th, category, category_th, likes_count, is_published)
VALUES (
  'Officially launched my personal developer portfolio with Wope Violet Horizon theme, social feed, and bilingual AI assistant!',
  'เปิดตัวเว็บไซต์พอร์ตโฟลิโอส่วนตัวอย่างเป็นทางการในดีไซน์ Wope Violet Horizon พร้อมระบบฟีดอัปเดตและผู้ช่วย AI 2 ภาษาครับ!',
  'Announcement',
  'ประกาศทางการ',
  19,
  TRUE
) ON CONFLICT DO NOTHING;
