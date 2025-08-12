-- Portfolio Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rich_content JSONB DEFAULT '[]'::jsonb,
  excerpt TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  author TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes INTEGER DEFAULT 0,
  image TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO blog_posts (title, content, rich_content, excerpt, date, read_time, author, tags, likes, image) VALUES
(
  'Welcome to My Portfolio Blog',
  'This is the first blog post on my portfolio. Here I will share my thoughts on web development, programming, and technology.',
  '[{"type": "heading1", "content": "Welcome to My Portfolio Blog"}, {"type": "paragraph", "content": "This is the first blog post on my portfolio. Here I will share my thoughts on web development, programming, and technology."}, {"type": "paragraph", "content": "Stay tuned for more exciting content!"}]'::jsonb,
  'The inaugural blog post introducing my portfolio and what readers can expect.',
  '2025-08-12',
  '2 min read',
  'Dinesh Priyantha',
  ARRAY['welcome', 'portfolio', 'introduction'],
  5,
  ''
) ON CONFLICT DO NOTHING;
