import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  Heart,
  Plus,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RichBlogEditor } from '@/components/ui/rich-blog-editor';
import { blogManager } from '@/lib/blogManager';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  richContent?: any[];
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  likes: number;
  image: string;
}

interface BlogManagerProps {
  onPublishSuccess?: () => void;
}

export const BlogManager: React.FC<BlogManagerProps> = ({ onPublishSuccess }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const allBlogs = blogManager.getAllBlogs();
    setBlogs(allBlogs);
  };

  const handleCreateNew = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleSave = async (blogData: any) => {
    setIsLoading(true);
    setActionStatus('idle');

    try {
      // Convert rich blog data to BlogPost format
      const richContentText = blogData.sections.map((section: any) => {
        switch (section.type) {
          case 'heading1': return `# ${section.content}`;
          case 'heading2': return `## ${section.content}`;
          case 'heading3': return `### ${section.content}`;
          case 'paragraph': return section.content;
          case 'quote': return `> ${section.content}`;
          case 'code': return `\`\`\`\n${section.content}\n\`\`\``;
          case 'list': return section.listItems?.map((item: string) => `• ${item}`).join('\n') || '';
          case 'image': return section.imageUrl ? `![${section.imageAlt || ''}](${section.imageUrl})` : '';
          default: return section.content;
        }
      }).join('\n\n');

      const blogPost = {
        title: blogData.title,
        content: richContentText,
        richContent: blogData.sections,
        excerpt: blogData.excerpt,
        readTime: blogData.readTime,
        tags: blogData.tags,
        image: blogData.featuredImage,
        author: 'Dinesh Priyantha',
        date: new Date().toLocaleDateString()
      };

      let success = false;

      if (editingBlog) {
        // Update existing blog
        success = await blogManager.updateBlog(editingBlog.id, blogPost);
        if (success) {
          setActionMessage('Blog updated successfully!');
        }
      } else {
        // Create new blog
        success = await blogManager.addNewBlog(blogPost);
        if (success) {
          setActionMessage('Blog published successfully!');
        }
      }

      if (success) {
        setActionStatus('success');
        setShowEditor(false);
        setEditingBlog(null);
        loadBlogs(); // Refresh the list
        onPublishSuccess?.();
      } else {
        setActionStatus('error');
        setActionMessage('Failed to save blog. Please try again.');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setActionStatus('error');
      setActionMessage('An error occurred while saving the blog.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await blogManager.deleteBlog(id);
      if (success) {
        setActionStatus('success');
        setActionMessage('Blog deleted successfully!');
        loadBlogs(); // Refresh the list
      } else {
        setActionStatus('error');
        setActionMessage('Failed to delete blog. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      setActionStatus('error');
      setActionMessage('An error occurred while deleting the blog.');
    } finally {
      setIsLoading(false);
    }
  };

  const BlogCard = ({ blog }: { blog: BlogPost }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-4"
    >
      <Card className="professional-card hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {blog.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {blog.likes}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(blog)}
                className="hover:bg-blue-50"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/blog#post-${blog.id}`, '_blank')}
                className="hover:bg-green-50"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(blog.id)}
                className="hover:bg-red-50 text-red-600"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <Button
            variant="outline"
            onClick={() => {
              setShowEditor(false);
              setEditingBlog(null);
            }}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>

        <RichBlogEditor
          initialBlog={editingBlog ? {
            title: editingBlog.title,
            excerpt: editingBlog.excerpt,
            readTime: editingBlog.readTime,
            tags: editingBlog.tags,
            featuredImage: editingBlog.image,
            sections: editingBlog.richContent || []
          } : undefined}
          onSave={handleSave}
          onPublish={handleSave}
          isPublishing={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Manage your published blog posts</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Status Messages */}
      {actionStatus === 'success' && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{actionMessage}</AlertDescription>
        </Alert>
      )}

      {actionStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{actionMessage}</AlertDescription>
        </Alert>
      )}

      {/* Blog Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="professional-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{blogs.length}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card className="professional-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {blogs.reduce((sum, blog) => sum + blog.likes, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Likes</div>
          </CardContent>
        </Card>
        <Card className="professional-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {blogs.filter(blog => new Date(blog.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Blog List */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle>Published Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first blog post to get started!
              </p>
              <Button onClick={handleCreateNew} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
