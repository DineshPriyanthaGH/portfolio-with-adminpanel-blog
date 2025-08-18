import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Calendar,
  Clock,
  User,
  Tag,
  CheckCircle,
  XCircle,
  Archive,
  RefreshCw
} from 'lucide-react';
import { supabaseBlogService, BlogPost } from '@/lib/supabaseBlogService';
import AdvancedBlogEditor from './advanced-blog-editor';

const BlogManagementDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load blogs
  const loadBlogs = async () => {
    setLoading(true);
    try {
      const result = statusFilter === 'all' 
        ? await supabaseBlogService.getAllBlogs()
        : await supabaseBlogService.getAllBlogs(statusFilter);
      
      if (result.success && result.data) {
        setBlogs(result.data);
        setFilteredBlogs(result.data);
      } else {
        showMessage('error', result.error || 'Failed to load blogs');
      }
    } catch (error) {
      showMessage('error', 'Error loading blogs');
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on search and status
  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  // Load blogs on component mount and status filter change
  useEffect(() => {
    loadBlogs();
  }, [statusFilter]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Handle blog creation
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  // Handle blog editing
  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  // Handle blog save
  const handleSaveBlog = async (blogData: BlogPost) => {
    try {
      let result;
      
      if (editingBlog) {
        // Update existing blog
        result = await supabaseBlogService.updateBlog(editingBlog.id!, blogData);
      } else {
        // Create new blog
        result = await supabaseBlogService.createBlog(blogData);
      }

      if (result.success) {
        showMessage('success', `Blog ${editingBlog ? 'updated' : 'created'} successfully!`);
        loadBlogs();
        setShowEditor(false);
        setEditingBlog(null);
      } else {
        showMessage('error', result.error || 'Failed to save blog');
      }
    } catch (error) {
      showMessage('error', 'Error saving blog');
    }
  };

  // Handle blog publish
  const handlePublishBlog = async (blogData: BlogPost) => {
    setIsPublishing(true);
    try {
      let result;
      
      if (editingBlog) {
        // Update and publish existing blog
        result = await supabaseBlogService.updateBlog(editingBlog.id!, {
          ...blogData,
          status: 'published',
          published_at: new Date().toISOString()
        });
      } else {
        // Create and publish new blog
        result = await supabaseBlogService.createBlog({
          ...blogData,
          status: 'published',
          published_at: new Date().toISOString()
        });
      }

      if (result.success) {
        showMessage('success', 'Blog published successfully!');
        loadBlogs();
        setShowEditor(false);
        setEditingBlog(null);
      } else {
        showMessage('error', result.error || 'Failed to publish blog');
      }
    } catch (error) {
      showMessage('error', 'Error publishing blog');
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await supabaseBlogService.deleteBlog(blogId);
      
      if (result.success) {
        showMessage('success', 'Blog deleted successfully!');
        loadBlogs();
      } else {
        showMessage('error', result.error || 'Failed to delete blog');
      }
    } catch (error) {
      showMessage('error', 'Error deleting blog');
    }
  };

  // Handle blog status change
  const handleStatusChange = async (blogId: string, newStatus: 'draft' | 'published' | 'archived') => {
    try {
      const updateData: Partial<BlogPost> = { status: newStatus };
      
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }

      const result = await supabaseBlogService.updateBlog(blogId, updateData);
      
      if (result.success) {
        showMessage('success', `Blog ${newStatus} successfully!`);
        loadBlogs();
      } else {
        showMessage('error', result.error || 'Failed to update blog status');
      }
    } catch (error) {
      showMessage('error', 'Error updating blog status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  if (showEditor) {
    return (
      <div className="space-y-6">
        <Card className="professional-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Blog Management</CardTitle>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditor(false);
                  setEditingBlog(null);
                }}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardHeader>
        </Card>

        <AdvancedBlogEditor
          editingBlog={editingBlog}
          onSave={handleSaveBlog}
          onPublish={handlePublishBlog}
          isPublishing={isPublishing}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="professional-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Blog Management Dashboard
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Manage your blog posts with full CRUD operations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={loadBlogs}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={handleCreateBlog}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Blog Post
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Message */}
      {message && (
        <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
          <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Filters and Search */}
      <Card className="professional-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search blogs by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-2">
                {['all', 'draft', 'published', 'archived'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status as any)}
                    className="capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Blogs', value: blogs.length, color: 'text-blue-600' },
          { label: 'Published', value: blogs.filter(b => b.status === 'published').length, color: 'text-green-600' },
          { label: 'Drafts', value: blogs.filter(b => b.status === 'draft').length, color: 'text-yellow-600' },
          { label: 'Archived', value: blogs.filter(b => b.status === 'archived').length, color: 'text-gray-600' }
        ].map((stat, index) => (
          <Card key={index} className="professional-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blog List */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle>
            Blog Posts ({filteredBlogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No blogs found matching your search.' : 'No blogs found.'}
              </p>
              <Button onClick={handleCreateBlog} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create your first blog post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                          {blog.title}
                        </h3>
                        <Badge className={`${getStatusColor(blog.status)} flex items-center gap-1`}>
                          {getStatusIcon(blog.status)}
                          {blog.status}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'No date'}
                        </div>
                        {blog.published_at && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Published: {new Date(blog.published_at).toLocaleDateString()}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {blog.views || 0} views
                        </div>
                      </div>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-muted-foreground" />
                          <div className="flex flex-wrap gap-1">
                            {blog.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{blog.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {blog.cover_image && (
                      <div className="ml-4">
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>

                      {blog.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(blog.id!, 'published')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Publish
                        </Button>
                      )}

                      {blog.status === 'published' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(blog.id!, 'archived')}
                        >
                          <Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                      )}

                      {blog.status === 'archived' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(blog.id!, 'draft')}
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          To Draft
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog.id!)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagementDashboard;
