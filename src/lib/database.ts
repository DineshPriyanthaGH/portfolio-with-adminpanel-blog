import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// You'll need to replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Schema Interfaces
export interface BlogPost {
  id?: number
  title: string
  content: string
  rich_content?: any[] // JSON field for rich content sections
  excerpt: string
  date: string
  read_time: string
  author: string
  tags: string[]
  likes: number
  image: string
  created_at?: string
  updated_at?: string
}

export interface Subscriber {
  id?: number
  email: string
  name?: string
  subscribed_at?: string
  is_active?: boolean
}

export interface ContactMessage {
  id?: number
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  is_read?: boolean
}

// Database service class
export class DatabaseService {
  // Blog Posts
  async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...post,
          tags: JSON.stringify(post.tags), // Convert array to JSON string
          rich_content: JSON.stringify(post.rich_content || [])
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating blog post:', error)
        return null
      }

      return {
        ...data,
        tags: JSON.parse(data.tags || '[]'),
        rich_content: JSON.parse(data.rich_content || '[]')
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      return null
    }
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching blog posts:', error)
        return []
      }

      return data.map(post => ({
        ...post,
        tags: JSON.parse(post.tags || '[]'),
        rich_content: JSON.parse(post.rich_content || '[]')
      }))
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
  }

  async getBlogPost(id: number): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching blog post:', error)
        return null
      }

      return {
        ...data,
        tags: JSON.parse(data.tags || '[]'),
        rich_content: JSON.parse(data.rich_content || '[]')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      return null
    }
  }

  async updateBlogPost(id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      const updateData: any = { ...updates }
      if (updateData.tags) {
        updateData.tags = JSON.stringify(updateData.tags)
      }
      if (updateData.rich_content) {
        updateData.rich_content = JSON.stringify(updateData.rich_content)
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating blog post:', error)
        return null
      }

      return {
        ...data,
        tags: JSON.parse(data.tags || '[]'),
        rich_content: JSON.parse(data.rich_content || '[]')
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      return null
    }
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting blog post:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting blog post:', error)
      return false
    }
  }

  // Subscribers
  async addSubscriber(email: string, name?: string): Promise<Subscriber | null> {
    try {
      // Check if subscriber already exists
      const { data: existing } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', email)
        .single()

      if (existing) {
        // Update to active if exists
        const { data, error } = await supabase
          .from('subscribers')
          .update({ is_active: true })
          .eq('email', email)
          .select()
          .single()

        return data
      }

      // Create new subscriber
      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ email, name, is_active: true }])
        .select()
        .single()

      if (error) {
        console.error('Error adding subscriber:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error adding subscriber:', error)
      return null
    }
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('is_active', true)
        .order('subscribed_at', { ascending: false })

      if (error) {
        console.error('Error fetching subscribers:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching subscribers:', error)
      return []
    }
  }

  async removeSubscriber(email: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({ is_active: false })
        .eq('email', email)

      if (error) {
        console.error('Error removing subscriber:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error removing subscriber:', error)
      return false
    }
  }

  // Contact Messages
  async saveContactMessage(message: Omit<ContactMessage, 'id' | 'is_read'>): Promise<ContactMessage | null> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...message, is_read: false }])
        .select()
        .single()

      if (error) {
        console.error('Error saving contact message:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error saving contact message:', error)
      return null
    }
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('timestamp', { ascending: false })

      if (error) {
        console.error('Error fetching contact messages:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      return []
    }
  }

  // Database connection test
  async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('count')
        .limit(1)

      return !error
    } catch (error) {
      console.error('Database connection test failed:', error)
      return false
    }
  }
}

export const db = new DatabaseService()
