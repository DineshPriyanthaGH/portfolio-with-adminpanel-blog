import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Image, 
  Eye, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link,
  Save
} from 'lucide-react';

interface BlogSection {
  id: string;
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'image' | 'quote' | 'code' | 'list';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  listItems?: string[];
}

interface BlogPost {
  title: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  featuredImage: string;
  sections: BlogSection[];
}

interface RichBlogEditorProps {
  initialBlog?: Partial<BlogPost>;
  onSave: (blog: BlogPost) => void;
  onPublish: (blog: BlogPost) => void;
  isPublishing?: boolean;
}

export const RichBlogEditor: React.FC<RichBlogEditorProps> = ({
  initialBlog,
  onSave,
  onPublish,
  isPublishing = false
}) => {
  const [blog, setBlog] = useState<BlogPost>({
    title: initialBlog?.title || '',
    excerpt: initialBlog?.excerpt || '',
    readTime: initialBlog?.readTime || '',
    tags: initialBlog?.tags || [],
    featuredImage: initialBlog?.featuredImage || '',
    sections: initialBlog?.sections || []
  });

  const [activeTab, setActiveTab] = useState('editor');
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSection = (type: BlogSection['type']) => {
    const newSection: BlogSection = {
      id: Date.now().toString(),
      type,
      content: '',
      listItems: type === 'list' ? [''] : undefined
    };
    
    setBlog(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (id: string, updates: Partial<BlogSection>) => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === id ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (id: string) => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id)
    }));
  };

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      setBlog(prev => {
        const newSections = [...prev.sections];
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
        return { ...prev, sections: newSections };
      });
    }
  };

  const moveSectionDown = (index: number) => {
    setBlog(prev => {
      if (index < prev.sections.length - 1) {
        const newSections = [...prev.sections];
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        return { ...prev, sections: newSections };
      }
      return prev;
    });
  };

  const addTag = () => {
    if (newTag.trim() && !blog.tags.includes(newTag.trim())) {
      setBlog(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlog(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = (sectionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateSection(sectionId, { imageUrl, imageAlt: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSectionEditor = (section: BlogSection, index: number) => {
    const sectionTypes = [
      { type: 'heading1', icon: Heading1, label: 'Heading 1' },
      { type: 'heading2', icon: Heading2, label: 'Heading 2' },
      { type: 'heading3', icon: Heading3, label: 'Heading 3' },
      { type: 'paragraph', icon: Type, label: 'Paragraph' },
      { type: 'quote', icon: Quote, label: 'Quote' },
      { type: 'code', icon: Code, label: 'Code' },
      { type: 'list', icon: List, label: 'List' },
      { type: 'image', icon: Image, label: 'Image' }
    ];

    return (
      <Card key={section.id} className="professional-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {sectionTypes.find(t => t.type === section.type)?.label}
              </Badge>
              <span className="text-sm text-muted-foreground">Section {index + 1}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveSectionUp(index)}
                disabled={index === 0}
              >
                <MoveUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveSectionDown(index)}
                disabled={index === blog.sections.length - 1}
              >
                <MoveDown className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteSection(section.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {section.type === 'image' ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="professional-card"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Input
                  placeholder="Or paste image URL"
                  value={section.imageUrl || ''}
                  onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
                  className="professional-card"
                />
              </div>
              <Input
                placeholder="Image description (alt text)"
                value={section.imageAlt || ''}
                onChange={(e) => updateSection(section.id, { imageAlt: e.target.value })}
                className="professional-card"
              />
              {section.imageUrl && (
                <div className="border rounded-lg p-4">
                  <img 
                    src={section.imageUrl} 
                    alt={section.imageAlt} 
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(section.id, e)}
                className="hidden"
              />
            </div>
          ) : section.type === 'list' ? (
            <div className="space-y-2">
              {section.listItems?.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-2">
                  <Input
                    placeholder={`List item ${itemIndex + 1}`}
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(section.listItems || [])];
                      newItems[itemIndex] = e.target.value;
                      updateSection(section.id, { listItems: newItems });
                    }}
                    className="professional-card flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newItems = section.listItems?.filter((_, i) => i !== itemIndex);
                      updateSection(section.id, { listItems: newItems });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newItems = [...(section.listItems || []), ''];
                  updateSection(section.id, { listItems: newItems });
                }}
                className="professional-card"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          ) : (
            <Textarea
              placeholder={`Enter ${section.type} content...`}
              value={section.content}
              onChange={(e) => updateSection(section.id, { content: e.target.value })}
              className={`professional-card ${
                section.type === 'heading1' ? 'text-2xl font-bold' :
                section.type === 'heading2' ? 'text-xl font-semibold' :
                section.type === 'heading3' ? 'text-lg font-medium' :
                section.type === 'quote' ? 'italic border-l-4 border-primary pl-4' :
                section.type === 'code' ? 'font-mono bg-accent' : ''
              }`}
              rows={section.type.includes('heading') ? 2 : 4}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{blog.title || 'Blog Title'}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{blog.readTime || '5 min read'}</span>
            <span>•</span>
            <span>By Dinesh Priyantha</span>
          </div>
          <p className="text-lg text-muted-foreground">{blog.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <img 
            src={blog.featuredImage} 
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}

        {/* Content Sections */}
        <div className="space-y-6 prose prose-lg max-w-none">
          {blog.sections.map((section) => {
            switch (section.type) {
              case 'heading1':
                return <h1 key={section.id} className="text-3xl font-bold text-foreground">{section.content}</h1>;
              case 'heading2':
                return <h2 key={section.id} className="text-2xl font-semibold text-foreground">{section.content}</h2>;
              case 'heading3':
                return <h3 key={section.id} className="text-xl font-medium text-foreground">{section.content}</h3>;
              case 'paragraph':
                return <p key={section.id} className="text-foreground leading-relaxed">{section.content}</p>;
              case 'quote':
                return (
                  <blockquote key={section.id} className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {section.content}
                  </blockquote>
                );
              case 'code':
                return (
                  <pre key={section.id} className="bg-accent p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{section.content}</code>
                  </pre>
                );
              case 'list':
                return (
                  <ul key={section.id} className="list-disc list-inside space-y-2">
                    {section.listItems?.map((item, index) => (
                      <li key={index} className="text-foreground">{item}</li>
                    ))}
                  </ul>
                );
              case 'image':
                return section.imageUrl ? (
                  <div key={section.id} className="text-center">
                    <img 
                      src={section.imageUrl} 
                      alt={section.imageAlt}
                      className="max-w-full h-auto rounded-lg mx-auto"
                    />
                    {section.imageAlt && (
                      <p className="text-sm text-muted-foreground mt-2">{section.imageAlt}</p>
                    )}
                  </div>
                ) : null;
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle>Blog Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Blog Title"
            value={blog.title}
            onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
            className="professional-card text-xl font-semibold"
          />
          
          <Textarea
            placeholder="Blog excerpt (summary for email notifications)"
            value={blog.excerpt}
            onChange={(e) => setBlog(prev => ({ ...prev, excerpt: e.target.value }))}
            className="professional-card"
            rows={3}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Read time (e.g., 5 min read)"
              value={blog.readTime}
              onChange={(e) => setBlog(prev => ({ ...prev, readTime: e.target.value }))}
              className="professional-card"
            />
            
            <Input
              placeholder="Featured image URL"
              value={blog.featuredImage}
              onChange={(e) => setBlog(prev => ({ ...prev, featuredImage: e.target.value }))}
              className="professional-card"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="professional-card flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} variant="outline" className="professional-card">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="default" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          {/* Section Tools */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Add Content Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => addSection('heading1')}
                  className="professional-card"
                >
                  <Heading1 className="w-4 h-4 mr-2" />
                  H1
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('heading2')}
                  className="professional-card"
                >
                  <Heading2 className="w-4 h-4 mr-2" />
                  H2
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('heading3')}
                  className="professional-card"
                >
                  <Heading3 className="w-4 h-4 mr-2" />
                  H3
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('paragraph')}
                  className="professional-card"
                >
                  <Type className="w-4 h-4 mr-2" />
                  Text
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('quote')}
                  className="professional-card"
                >
                  <Quote className="w-4 h-4 mr-2" />
                  Quote
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('code')}
                  className="professional-card"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('list')}
                  className="professional-card"
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addSection('image')}
                  className="professional-card"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-4">
            {blog.sections.map((section, index) => renderSectionEditor(section, index))}
            
            {blog.sections.length === 0 && (
              <Alert>
                <AlertDescription>
                  Start creating your blog by adding content sections above. You can add headings, paragraphs, images, lists, and more.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="professional-card">
            <CardContent className="p-8">
              {renderPreview()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          onClick={() => onSave(blog)}
          className="professional-card flex-1"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        
        <Button
          onClick={() => onPublish(blog)}
          disabled={isPublishing || !blog.title || blog.sections.length === 0}
          className="professional-button flex-1"
        >
          {isPublishing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              <span>Publishing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Publish Blog</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
