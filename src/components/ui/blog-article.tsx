import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, BookOpen, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  image?: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

interface BlogArticleProps {
  post: BlogPost;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onLike?: () => void;
  onComment?: (comment: string, author: string) => void;
}

export const BlogArticle: React.FC<BlogArticleProps> = ({
  post,
  isExpanded = false,
  onToggleExpand,
  onLike,
  onComment,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
      onLike?.();
    }
  };

  const handleComment = () => {
    if (newComment.trim() && commentAuthor.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: commentAuthor,
        content: newComment,
        date: new Date().toLocaleDateString(),
        likes: 0,
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
      setCommentAuthor('');
      onComment?.(newComment, commentAuthor);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="professional-card mb-8">
      <CardHeader className="space-y-4">
        {post.image && (
          <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <span>{post.date}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">
            {post.title}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {isExpanded ? post.content : post.excerpt}
        </p>
        
        {!isExpanded && onToggleExpand && (
          <Button 
            variant="outline" 
            onClick={onToggleExpand}
            className="mt-4"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Read More
          </Button>
        )}
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        <Separator />
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-2"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{comments.length}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="w-full space-y-4">
            <Separator />
            
            {/* Add Comment */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Leave a Comment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="professional-card"
                />
                <div className="md:col-span-2">
                  <Textarea
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="professional-card min-h-[100px]"
                  />
                </div>
              </div>
              <Button 
                onClick={handleComment}
                disabled={!newComment.trim() || !commentAuthor.trim()}
                className="professional-button"
              >
                Post Comment
              </Button>
            </div>

            {/* Display Comments */}
            {comments.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Comments ({comments.length})
                </h4>
                {comments.map((comment) => (
                  <Card key={comment.id} className="professional-card">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">
                            {comment.author}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
