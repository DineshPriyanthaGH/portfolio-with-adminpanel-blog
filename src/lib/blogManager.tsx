import { emailService } from '@/lib/emailService';
import { realEmailService } from '@/lib/realEmailService';
import { db, BlogPost as DBBlogPost } from '@/lib/database';

interface BlogSection {
  id: string;
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'image' | 'quote' | 'code' | 'list';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  listItems?: string[];
}

interface BlogPost {
  id: number;
  title: string;
  content: string; // Keep for backward compatibility
  richContent?: BlogSection[]; // New rich content format
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  likes: number;
  image: string;
}

// Blog management system for admin
class BlogManager {
  private blogs: BlogPost[] = [];
  private useDatabase: boolean = true; // Toggle between database and localStorage

  constructor() {
    this.loadBlogsFromStorage();
    this.testDatabaseConnection();
  }

  private async testDatabaseConnection(): Promise<void> {
    try {
      const isConnected = await db.testConnection();
      if (isConnected) {
        console.log('✅ Database connected successfully');
        this.useDatabase = true;
        // Load blogs from database
        await this.loadBlogsFromDatabase();
      } else {
        console.warn('⚠️ Database connection failed, using localStorage');
        this.useDatabase = false;
      }
    } catch (error) {
      console.warn('⚠️ Database not available, using localStorage fallback');
      this.useDatabase = false;
    }
  }

  private async loadBlogsFromDatabase(): Promise<void> {
    try {
      const dbBlogs = await db.getAllBlogPosts();
      this.blogs = dbBlogs.map(blog => ({
        id: blog.id || Date.now(),
        title: blog.title,
        content: blog.content,
        richContent: blog.rich_content,
        excerpt: blog.excerpt,
        date: blog.date,
        readTime: blog.read_time,
        author: blog.author,
        tags: blog.tags,
        likes: blog.likes,
        image: blog.image
      }));
    } catch (error) {
      console.error('Error loading blogs from database:', error);
    }
  }

  private loadBlogsFromStorage(): void {
    try {
      const storedBlogs = localStorage.getItem('blogPosts');
      if (storedBlogs) {
        this.blogs = JSON.parse(storedBlogs);
      }
    } catch (error) {
      console.error('Error loading blogs from storage:', error);
    }
  }

  private saveBlogsToStorage(): void {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(this.blogs));
    } catch (error) {
      console.error('Error saving blogs to storage:', error);
    }
  }

  // Add new blog post and notify subscribers
  async addNewBlog(blogData: Omit<BlogPost, 'id' | 'likes'>): Promise<boolean> {
    try {
      const newBlog: BlogPost = {
        ...blogData,
        id: Date.now(),
        likes: 0
      };

      if (this.useDatabase) {
        // Save to database
        const dbBlog = await db.createBlogPost({
          title: newBlog.title,
          content: newBlog.content,
          rich_content: newBlog.richContent,
          excerpt: newBlog.excerpt,
          date: newBlog.date,
          read_time: newBlog.readTime,
          author: newBlog.author,
          tags: newBlog.tags,
          likes: newBlog.likes,
          image: newBlog.image
        });

        if (dbBlog) {
          newBlog.id = dbBlog.id!;
          this.blogs.unshift(newBlog);
        } else {
          throw new Error('Failed to save to database');
        }
      } else {
        // Fallback to localStorage
        this.blogs.unshift(newBlog);
        this.saveBlogsToStorage();
      }

      // Send notifications to all subscribers
      this.notifySubscribersOfNewBlog(newBlog);

      return true;
    } catch (error) {
      console.error('Error adding new blog:', error);
      
      // Fallback to localStorage if database fails
      if (this.useDatabase) {
        console.log('Falling back to localStorage...');
        const newBlog: BlogPost = {
          ...blogData,
          id: Date.now(),
          likes: 0
        };
        
        this.blogs.unshift(newBlog);
        this.saveBlogsToStorage();
        this.notifySubscribersOfNewBlog(newBlog);
        return true;
      }
      
      return false;
    }
  }

  // Send notification to all subscribers about new blog
  private notifySubscribersOfNewBlog(blog: BlogPost): void {
    const blogUrl = `${window.location.origin}/blog#post-${blog.id}`;
    
    const blogNotificationData = {
      title: blog.title,
      excerpt: blog.excerpt,
      date: blog.date,
      readTime: blog.readTime,
      author: blog.author,
      blogUrl: blogUrl
    };

    // Check if real email service is configured and enabled
    const useRealEmail = localStorage.getItem('useRealEmail') === 'true';
    
    if (useRealEmail) {
      realEmailService.sendBlogNotificationToSubscribers(blogNotificationData);
    } else {
      emailService.sendBlogNotificationToSubscribers(blogNotificationData);
    }
  }

  // Get all blogs
  getAllBlogs(): BlogPost[] {
    return this.blogs;
  }

  // Get blog by ID
  getBlogById(id: number): BlogPost | undefined {
    return this.blogs.find(blog => blog.id === id);
  }

  // Update blog
  updateBlog(id: number, updates: Partial<BlogPost>): boolean {
    try {
      const blogIndex = this.blogs.findIndex(blog => blog.id === id);
      if (blogIndex === -1) return false;

      this.blogs[blogIndex] = { ...this.blogs[blogIndex], ...updates };
      this.saveBlogsToStorage();
      return true;
    } catch (error) {
      console.error('Error updating blog:', error);
      return false;
    }
  }

  // Delete blog
  deleteBlog(id: number): boolean {
    try {
      const initialLength = this.blogs.length;
      this.blogs = this.blogs.filter(blog => blog.id !== id);
      
      if (this.blogs.length < initialLength) {
        this.saveBlogsToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }

  // Like a blog post
  likeBlog(id: number): boolean {
    try {
      const blog = this.blogs.find(blog => blog.id === id);
      if (blog) {
        blog.likes += 1;
        this.saveBlogsToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error liking blog:', error);
      return false;
    }
  }

  // Get blog statistics
  getBlogStatistics() {
    const totalBlogs = this.blogs.length;
    const totalLikes = this.blogs.reduce((sum, blog) => sum + blog.likes, 0);
    const subscriberCount = emailService.getSubscribers().length;
    const emailAnalytics = emailService.getSubscriptionAnalytics();

    return {
      totalBlogs,
      totalLikes,
      subscriberCount,
      averageLikes: totalBlogs > 0 ? Math.round(totalLikes / totalBlogs) : 0,
      recentBlogs: this.blogs.slice(0, 5),
      emailAnalytics
    };
  }
}

// Create singleton instance
export const blogManager = new BlogManager();

// Admin component for managing blogs
export const BlogAdminPanel = () => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '',
    author: 'Dinesh Priyantha',
    tags: [] as string[],
    image: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePublishBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    setIsPublishing(true);
    setPublishStatus('idle');

    try {
      const success = blogManager.addNewBlog(newBlog);
      
      if (success) {
        setPublishStatus('success');
        setNewBlog({
          title: '',
          content: '',
          excerpt: '',
          date: new Date().toISOString().split('T')[0],
          readTime: '',
          author: 'Dinesh Priyantha',
          tags: [],
          image: ''
        });
        
        // Show success message for 3 seconds
        setTimeout(() => setPublishStatus('idle'), 3000);
      } else {
        setPublishStatus('error');
      }
    } catch (error) {
      console.error('Error publishing blog:', error);
      setPublishStatus('error');
    } finally {
      setIsPublishing(false);
    }
  };

  const stats = blogManager.getBlogStatistics();

  return (
    <div className="space-y-8 p-6 bg-background">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Blog Admin Panel</h2>
        <p className="text-muted-foreground">Manage your blog posts and subscribers</p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="professional-card p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-500">{stats.totalBlogs}</h3>
          <p className="text-sm text-muted-foreground">Total Blogs</p>
        </div>
        <div className="professional-card p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-500">{stats.subscriberCount}</h3>
          <p className="text-sm text-muted-foreground">Subscribers</p>
        </div>
        <div className="professional-card p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-500">{stats.totalLikes}</h3>
          <p className="text-sm text-muted-foreground">Total Likes</p>
        </div>
        <div className="professional-card p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-500">{stats.averageLikes}</h3>
          <p className="text-sm text-muted-foreground">Avg Likes/Post</p>
        </div>
      </div>

      {/* Status Messages */}
      {publishStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          ✅ Blog published successfully! Email notifications sent to {stats.subscriberCount} subscribers.
        </div>
      )}
      
      {publishStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          ❌ Error publishing blog. Please try again.
        </div>
      )}

      {/* Quick Actions */}
      <div className="professional-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-4">
          <button 
            onClick={handlePublishBlog}
            disabled={isPublishing}
            className="professional-button w-full"
          >
            {isPublishing ? 'Publishing...' : 'Publish New Blog & Notify Subscribers'}
          </button>
          
          <p className="text-sm text-muted-foreground text-center">
            This will send email notifications to all {stats.subscriberCount} subscribers
          </p>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
