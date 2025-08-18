-- ============================================
-- Blog Management Database Schema for Supabase
-- ============================================
-- Run this entire script in your Supabase SQL Editor
-- Go to: https://app.supabase.com/project/tlfaafyifewusuiobnrk/sql

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  read_time TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  meta_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}'
);

-- Create blog_images table
CREATE TABLE IF NOT EXISTS public.blog_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_alt TEXT,
  image_caption TEXT,
  image_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blog_images_blog_id ON public.blog_images(blog_id);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on blogs" ON public.blogs FOR ALL USING (true);
CREATE POLICY "Allow all operations on blog_images" ON public.blog_images FOR ALL USING (true);

-- Storage policies for blog images
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Allow public downloads" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Allow public updates" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Allow public deletes" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');

-- ============================================
-- That's it! Your blog database is ready.
-- ============================================

-- Optional: Insert a test blog post to verify everything works
INSERT INTO public.blogs (
  title, 
  slug, 
  content, 
  excerpt, 
  author, 
  status,
  published_at
) VALUES (
  'Welcome to Your Blog!',
  'welcome-to-your-blog',
  '# Welcome to Your New Blog!

This is your first blog post. You can edit or delete this post from your admin panel.

## Getting Started

1. Log into your admin panel
2. Create new blog posts
3. Upload images
4. Manage your content

Happy blogging!',
  'Welcome to your new blog! This is your first blog post to get you started.',
  'Admin',
  'published',
  NOW()
) ON CONFLICT (slug) DO NOTHING;
