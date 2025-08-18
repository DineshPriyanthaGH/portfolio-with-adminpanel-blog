import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Image, 
  List, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Code,
  Quote,
  Save,
  Send,
  Eye,
  Upload,
  X,
  Plus,
  Trash2,
  Type,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { supabaseBlogService, BlogPost } from '@/lib/supabaseBlogService';

interface AdvancedEditorProps {
  onSave?: (blog: BlogPost) => void;
  onPublish?: (blog: BlogPost) => void;
  editingBlog?: BlogPost | null;
  isPublishing?: boolean;
}

const AdvancedBlogEditor: React.FC<AdvancedEditorProps> = ({
  onSave,
  onPublish,
  editingBlog,
  isPublishing = false
}) => {
  const [blogData, setBlogData] = useState<Partial<BlogPost>>({
    title: editingBlog?.title || '',
    content: editingBlog?.content || '',
    excerpt: editingBlog?.excerpt || '',
    cover_image: editingBlog?.cover_image || '',
    featured_image: editingBlog?.featured_image || '',
    tags: editingBlog?.tags || [],
    author: editingBlog?.author || 'Dinesh Priyantha',
    status: editingBlog?.status || 'draft',
    read_time: editingBlog?.read_time || '5 min read',
    meta_description: editingBlog?.meta_description || '',
    seo_keywords: editingBlog?.seo_keywords || []
  });

  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle text formatting
  const formatText = (format: string) => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    let newCursorPos = start;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = start + (selectedText ? 4 : 2);
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = start + (selectedText ? 2 : 1);
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        newCursorPos = start + (selectedText ? 7 : 3);
        break;
      case 'code':
        formattedText = selectedText.includes('\n') 
          ? `\`\`\`\n${selectedText}\n\`\`\`` 
          : `\`${selectedText}\``;
        newCursorPos = start + (selectedText.includes('\n') ? 4 : 1);
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        newCursorPos = start + 3;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        newCursorPos = start + 4;
        break;
      case 'list':
        const lines = selectedText.split('\n');
        formattedText = lines.map(line => `- ${line}`).join('\n');
        newCursorPos = start + formattedText.length;
        break;
      default:
        return;
    }
    
    const newContent = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    setBlogData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const result = await supabaseBlogService.uploadImage(file, editingBlog?.id);
      if (result.success && result.url) {
        const imageMarkdown = `![Alt text](${result.url})`;
        
        if (contentRef.current) {
          const textarea = contentRef.current;
          const start = textarea.selectionStart;
          const newContent = 
            textarea.value.substring(0, start) + 
            imageMarkdown + 
            textarea.value.substring(start);
          
          setBlogData(prev => ({ ...prev, content: newContent }));
          
          // Move cursor after image
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
          }, 0);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle cover image upload
  const handleCoverImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const result = await supabaseBlogService.uploadImage(file, editingBlog?.id);
      if (result.success && result.url) {
        setBlogData(prev => ({ ...prev, cover_image: result.url }));
      }
    } catch (error) {
      console.error('Error uploading cover image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !blogData.tags?.includes(tagInput.trim())) {
      setBlogData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  // Add SEO keyword
  const addKeyword = () => {
    if (keywordInput.trim() && !blogData.seo_keywords?.includes(keywordInput.trim())) {
      setBlogData(prev => ({
        ...prev,
        seo_keywords: [...(prev.seo_keywords || []), keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  // Remove SEO keyword
  const removeKeyword = (keywordToRemove: string) => {
    setBlogData(prev => ({
      ...prev,
      seo_keywords: prev.seo_keywords?.filter(keyword => keyword !== keywordToRemove) || []
    }));
  };

  // Render markdown preview
  const renderPreview = (content: string) => {
    return content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      .replace(/`([^`]*)`/gim, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')
      .replace(/```([^```]*)```/gim, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br />');
  };

  const handleSave = () => {
    if (onSave) {
      onSave(blogData as BlogPost);
    }
  };

  const handlePublish = () => {
    if (onPublish) {
      onPublish(blogData as BlogPost);
    }
  };

  const isValidBlog = blogData.title && blogData.content && blogData.excerpt;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="professional-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={!isValidBlog}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={handlePublish}
                disabled={!isValidBlog || isPublishing}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={blogData.title}
                  onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog title..."
                  className="text-lg font-semibold"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={blogData.excerpt}
                  onChange={(e) => setBlogData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of your blog post..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={blogData.author}
                    onChange={(e) => setBlogData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={blogData.read_time}
                    onChange={(e) => setBlogData(prev => ({ ...prev, read_time: e.target.value }))}
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {blogData.cover_image && (
                <div className="relative">
                  <img 
                    src={blogData.cover_image} 
                    alt="Cover" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setBlogData(prev => ({ ...prev, cover_image: '' }))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <Input
                  value={blogData.cover_image}
                  onChange={(e) => setBlogData(prev => ({ ...prev, cover_image: e.target.value }))}
                  placeholder="Cover image URL..."
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCoverImageUpload(file);
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Content *</CardTitle>
              {!isPreview && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => formatText('h1')}>
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => formatText('h2')}>
                    <Heading2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => formatText('h3')}>
                    <Heading3 className="w-4 h-4" />
                  </Button>
                  <div className="border-l border-gray-300 mx-2" />
                  <Button variant="outline" size="sm" onClick={() => formatText('bold')}>
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => formatText('italic')}>
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => formatText('underline')}>
                    <Underline className="w-4 h-4" />
                  </Button>
                  <div className="border-l border-gray-300 mx-2" />
                  <Button variant="outline" size="sm" onClick={() => formatText('quote')}>
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => formatText('code')}>
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => formatText('list')}>
                    <List className="w-4 h-4" />
                  </Button>
                  <div className="border-l border-gray-300 mx-2" />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => document.getElementById('content-image-upload')?.click()}
                    disabled={uploadingImage}
                  >
                    <Image className="w-4 h-4" />
                  </Button>
                  <input
                    id="content-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isPreview ? (
                <div 
                  className="prose max-w-none min-h-[400px] p-4 border rounded-lg"
                  dangerouslySetInnerHTML={{ __html: renderPreview(blogData.content || '') }}
                />
              ) : (
                <Textarea
                  ref={contentRef}
                  value={blogData.content}
                  onChange={(e) => setBlogData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your blog content here... Use Markdown formatting!"
                  rows={20}
                  className="font-mono"
                />
              )}
              
              {uploadingImage && (
                <Alert className="mt-4">
                  <AlertDescription>
                    Uploading image... Please wait.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Publishing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={blogData.status === 'published' ? 'default' : 'secondary'}>
                    {blogData.status}
                  </Badge>
                </div>
                {blogData.published_at && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Published:</span>
                    <span className="text-sm">{new Date(blogData.published_at).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Word Count:</span>
                  <span className="text-sm">{blogData.content?.split(' ').length || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button variant="outline" size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {blogData.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={blogData.meta_description}
                  onChange={(e) => setBlogData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO meta description..."
                  rows={3}
                />
              </div>

              <div>
                <Label>SEO Keywords</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Add keyword..."
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button variant="outline" size="sm" onClick={addKeyword}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {blogData.seo_keywords?.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {keyword}
                      <button onClick={() => removeKeyword(keyword)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {blogData.title ? '✅' : '❌'} Title
                </div>
                <div className="flex items-center gap-2">
                  {blogData.excerpt ? '✅' : '❌'} Excerpt
                </div>
                <div className="flex items-center gap-2">
                  {blogData.content && blogData.content.length > 100 ? '✅' : '❌'} Content (100+ chars)
                </div>
                <div className="flex items-center gap-2">
                  {blogData.cover_image ? '✅' : '⚠️'} Cover Image (Optional)
                </div>
                <div className="flex items-center gap-2">
                  {blogData.tags && blogData.tags.length > 0 ? '✅' : '⚠️'} Tags (Optional)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedBlogEditor;
