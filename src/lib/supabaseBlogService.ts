import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types for our blog system
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image?: string;
  featured_image?: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  read_time?: string;
  views?: number;
  likes?: number;
  meta_description?: string;
  seo_keywords?: string[];
}

export interface BlogImage {
  id?: string;
  blog_id: string;
  image_url: string;
  image_alt?: string;
  image_caption?: string;
  image_order?: number;
  created_at?: string;
}

class SupabaseBlogService {
  private supabase: SupabaseClient | null = null;
  private isConfigured = false;

  constructor() {
    this.initializeSupabase();
  }

  private initializeSupabase() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url');
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key');

    if (supabaseUrl && supabaseKey && supabaseUrl !== 'your-supabase-url' && supabaseKey !== 'your-supabase-anon-key') {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
        this.isConfigured = true;
        console.log('✅ Supabase initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize Supabase:', error);
        this.isConfigured = false;
      }
    } else {
      console.log('⚠️ Supabase not configured, using localStorage fallback');
      this.isConfigured = false;
    }
  }

  // Configure Supabase credentials
  configureSupabase(url: string, key: string) {
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_anon_key', key);
    this.initializeSupabase();
    return this.isConfigured;
  }

  getSupabaseStatus() {
    return {
      isConfigured: this.isConfigured,
      hasCredentials: !!(localStorage.getItem('supabase_url') && localStorage.getItem('supabase_anon_key'))
    };
  }

  // Create database tables
  async createBlogTables() {
    if (!this.supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      // First, let's check if tables exist by trying to query them
      const { error: testError } = await this.supabase.from('blogs').select('count').limit(1);
      
      if (!testError) {
        return { success: true, message: 'Blog tables already exist' };
      }

      // If tables don't exist, we need to create them manually in Supabase Dashboard
      // For now, let's return instructions
      const instructions = `
        Tables don't exist yet. Please create them manually in your Supabase Dashboard:
        
        1. Go to https://app.supabase.com/project/${this.getProjectId()}/editor
        2. Run this SQL query:
        
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

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
        CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
        CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
        CREATE INDEX IF NOT EXISTS idx_blog_images_blog_id ON public.blog_images(blog_id);

        -- Enable Row Level Security
        ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

        -- Create policies (allow all operations for now - you can restrict later)
        CREATE POLICY "Allow all operations on blogs" ON public.blogs FOR ALL USING (true);
        CREATE POLICY "Allow all operations on blog_images" ON public.blog_images FOR ALL USING (true);
      `;

      return { 
        success: false, 
        message: 'Manual table creation required',
        instructions: instructions
      };
    } catch (error) {
      console.error('Error checking/creating blog tables:', error);
      return { success: false, error: error.message };
    }
  }

  // Helper to get project ID from URL
  private getProjectId(): string {
    const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url') || '';
    const match = url.match(/https:\/\/(.+)\.supabase\.co/);
    return match ? match[1] : 'your-project-id';
  }

  // Generate slug from title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Create a new blog post
  async createBlog(blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    if (!this.supabase) {
      // Fallback to localStorage
      return this.createBlogLocal(blogData);
    }

    try {
      const slug = this.generateSlug(blogData.title);
      
      const { data, error } = await this.supabase
        .from('blogs')
        .insert([{ ...blogData, slug }])
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error creating blog:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all blog posts
  async getAllBlogs(status?: 'draft' | 'published' | 'archived'): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> {
    if (!this.supabase) {
      return this.getAllBlogsLocal(status);
    }

    try {
      let query = this.supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return { success: false, error: error.message };
    }
  }

  // Get a single blog post
  async getBlog(id: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    if (!this.supabase) {
      return this.getBlogLocal(id);
    }

    try {
      const { data, error } = await this.supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching blog:', error);
      return { success: false, error: error.message };
    }
  }

  // Update a blog post
  async updateBlog(id: string, updates: Partial<BlogPost>): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    if (!this.supabase) {
      return this.updateBlogLocal(id, updates);
    }

    try {
      const updateData = { ...updates, updated_at: new Date().toISOString() };
      
      if (updates.title) {
        updateData.slug = this.generateSlug(updates.title);
      }

      const { data, error } = await this.supabase
        .from('blogs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error updating blog:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete a blog post
  async deleteBlog(id: string): Promise<{ success: boolean; error?: string }> {
    if (!this.supabase) {
      return this.deleteBlogLocal(id);
    }

    try {
      const { error } = await this.supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error deleting blog:', error);
      return { success: false, error: error.message };
    }
  }

  // Publish a blog post
  async publishBlog(id: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    return this.updateBlog(id, {
      status: 'published',
      published_at: new Date().toISOString()
    });
  }

  // Upload image to Supabase Storage
  async uploadImage(file: File, blogId?: string): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!this.supabase) {
      // Fallback: return a placeholder URL
      return { success: true, url: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800&h=400&fit=crop' };
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = blogId ? `blogs/${blogId}/${fileName}` : `uploads/${fileName}`;

      const { data, error } = await this.supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = this.supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, error: error.message };
    }
  }

  // LocalStorage fallback methods
  private createBlogLocal(blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const newBlog: BlogPost = {
        ...blogData,
        id: Date.now().toString(),
        slug: this.generateSlug(blogData.title),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      blogs.push(newBlog);
      localStorage.setItem('blogs', JSON.stringify(blogs));
      
      return { success: true, data: newBlog };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private getAllBlogsLocal(status?: string) {
    try {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const filteredBlogs = status ? blogs.filter(blog => blog.status === status) : blogs;
      return { success: true, data: filteredBlogs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private getBlogLocal(id: string) {
    try {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const blog = blogs.find(b => b.id === id);
      return blog ? { success: true, data: blog } : { success: false, error: 'Blog not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private updateBlogLocal(id: string, updates: Partial<BlogPost>) {
    try {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const index = blogs.findIndex(b => b.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Blog not found' };
      }
      
      blogs[index] = { 
        ...blogs[index], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      
      localStorage.setItem('blogs', JSON.stringify(blogs));
      return { success: true, data: blogs[index] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private deleteBlogLocal(id: string) {
    try {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const filteredBlogs = blogs.filter(b => b.id !== id);
      localStorage.setItem('blogs', JSON.stringify(filteredBlogs));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const supabaseBlogService = new SupabaseBlogService();
