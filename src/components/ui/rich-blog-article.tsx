import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Share, 
  Eye, 
  Calendar, 
  Clock, 
  User,
  ExternalLink 
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
  id: number;
  title: string;
  content: string;
  richContent?: BlogSection[];
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  likes: number;
  image: string;
}

interface RichBlogArticleProps {
  post: BlogPost;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showActions?: boolean;
}

export const RichBlogArticle: React.FC<RichBlogArticleProps> = ({
  post,
  isExpanded = false,
  onToggleExpand,
  showActions = true
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const renderRichContent = (sections: BlogSection[]) => {
    return sections.map((section, index) => {
      const key = `${section.id}-${index}`;
      
      switch (section.type) {
        case 'heading1':
          return (
            <h1 key={key} className="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">
              {section.content}
            </h1>
          );
        
        case 'heading2':
          return (
            <h2 key={key} className="text-2xl font-semibold text-foreground mb-4 mt-6">
              {section.content}
            </h2>
          );
        
        case 'heading3':
          return (
            <h3 key={key} className="text-xl font-medium text-foreground mb-3 mt-4">
              {section.content}
            </h3>
          );
        
        case 'paragraph':
          return (
            <p key={key} className="text-foreground leading-relaxed mb-4">
              {section.content}
            </p>
          );
        
        case 'quote':
          return (
            <blockquote key={key} className="border-l-4 border-primary pl-6 py-2 mb-6 bg-accent/30 rounded-r-lg">
              <p className="italic text-muted-foreground text-lg">
                "{section.content}"
              </p>
            </blockquote>
          );
        
        case 'code':
          return (
            <pre key={key} className="bg-accent p-4 rounded-lg overflow-x-auto mb-6 border">
              <code className="text-sm font-mono text-foreground">
                {section.content}
              </code>
            </pre>
          );
        
        case 'list':
          return (
            <ul key={key} className="list-disc list-inside space-y-2 mb-6 ml-4">
              {section.listItems?.map((item, itemIndex) => (
                <li key={itemIndex} className="text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          );
        
        case 'image':
          return section.imageUrl ? (
            <div key={key} className="mb-8">
              <div className="relative rounded-lg overflow-hidden bg-accent/20">
                <img 
                  src={section.imageUrl} 
                  alt={section.imageAlt || section.content}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {section.imageAlt && (
                <p className="text-sm text-muted-foreground text-center mt-2 italic">
                  {section.imageAlt}
                </p>
              )}
            </div>
          ) : null;
        
        default:
          return null;
      }
    });
  };

  const renderFallbackContent = (content: string) => {
    // Simple markdown-like rendering for backward compatibility
    const lines = content.split('\n');
    return lines.map((line, index) => {
      const key = `line-${index}`;
      
      if (line.startsWith('# ')) {
        return <h1 key={key} className="text-3xl font-bold text-foreground mb-6 mt-8">{line.slice(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={key} className="text-2xl font-semibold text-foreground mb-4 mt-6">{line.slice(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={key} className="text-xl font-medium text-foreground mb-3 mt-4">{line.slice(4)}</h3>;
      } else if (line.startsWith('> ')) {
        return (
          <blockquote key={key} className="border-l-4 border-primary pl-6 py-2 mb-6 bg-accent/30 rounded-r-lg">
            <p className="italic text-muted-foreground text-lg">"{line.slice(2)}"</p>
          </blockquote>
        );
      } else if (line.startsWith('• ')) {
        return <li key={key} className="text-foreground ml-4">{line.slice(2)}</li>;
      } else if (line.startsWith('```')) {
        return null; // Handle code blocks separately
      } else if (line.trim()) {
        return <p key={key} className="text-foreground leading-relaxed mb-4">{line}</p>;
      }
      return <br key={key} />;
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="professional-card overflow-hidden">
        {/* Featured Image */}
        {post.image && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        )}

        <CardHeader className="space-y-4">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {isExpanded ? (
              <div className="space-y-4">
                {post.richContent && post.richContent.length > 0 
                  ? renderRichContent(post.richContent)
                  : renderFallbackContent(post.content)
                }
              </div>
            ) : (
              <div className="space-y-4">
                {/* Show first few lines or sections */}
                {post.richContent && post.richContent.length > 0 
                  ? renderRichContent(post.richContent.slice(0, 2))
                  : renderFallbackContent(post.content.split('\n').slice(0, 3).join('\n'))
                }
                
                {((post.richContent && post.richContent.length > 2) || post.content.split('\n').length > 3) && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2 text-muted-foreground">
                      <span>•</span>
                      <span>•</span>
                      <span>•</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`transition-colors ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likeCount}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.share?.({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href
                    });
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Share className="w-4 h-4 mr-2" />
                  <span>Share</span>
                </Button>
              </div>

              {onToggleExpand && (
                <Button
                  variant="outline"
                  onClick={onToggleExpand}
                  className="professional-card"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
};
