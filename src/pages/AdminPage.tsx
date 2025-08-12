import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Plus, Send, Users, Mail, Eye, Settings, ToggleLeft, ToggleRight, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NotificationStatus } from '@/components/ui/notification-status';
import { EmailJSSetup } from '@/components/ui/emailjs-setup';
import { EmailSetupGuide } from '@/components/ui/email-setup-guide';
import { EmailConfigStatus } from '@/components/ui/email-config-status';
import { RichBlogEditor } from '@/components/ui/rich-blog-editor';
import { DatabaseSetupGuide } from '@/components/ui/database-setup';
import { blogManager } from '@/lib/blogManager';
import { emailService } from '@/lib/emailService';
import { realEmailService } from '@/lib/realEmailService';

const AdminPage = () => {
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    readTime: '',
    tags: '',
    image: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [useRealEmails, setUseRealEmails] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showDatabaseSetup, setShowDatabaseSetup] = useState(false);

  const currentEmailService = useRealEmails ? realEmailService : emailService;

  const handleInputChange = (field: string, value: string) => {
    setBlogForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePublishBlog = async () => {
    if (!blogForm.title || !blogForm.content || !blogForm.excerpt) {
      alert('Please fill in title, content, and excerpt');
      return;
    }

    setIsPublishing(true);
    setPublishStatus('idle');

    try {
      // Simulate blog publishing and email sending
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create blog notification data
      const blogData = {
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        date: new Date().toLocaleDateString(),
        readTime: blogForm.readTime || '5 min read',
        author: 'Dinesh Priyantha',
        blogUrl: `${window.location.origin}/blog`
      };

      // Send notifications to all subscribers
      if (useRealEmails) {
        await realEmailService.sendBlogNotificationToSubscribers(blogData);
      } else {
        emailService.sendBlogNotificationToSubscribers(blogData);
      }

      setPublishStatus('success');
      
      // Reset form
      setBlogForm({
        title: '',
        excerpt: '',
        content: '',
        readTime: '',
        tags: '',
        image: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => setPublishStatus('idle'), 5000);

    } catch (error) {
      console.error('Error publishing blog:', error);
      setPublishStatus('error');
    } finally {
      setIsPublishing(false);
    }
  };

  const subscriberCount = currentEmailService.getSubscribers().length;
  const analytics = currentEmailService.getSubscriptionAnalytics();

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-blue-500 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Portfolio</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/blog" className="text-muted-foreground hover:text-blue-500">
                  <Eye className="w-5 h-5" />
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog <span className="text-blue-500">Admin</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Manage blog posts and email notifications
            </p>
            
            {/* Email Service Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-sm text-muted-foreground">Demo Emails</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUseRealEmails(!useRealEmails)}
                className="p-1"
              >
                {useRealEmails ? (
                  <ToggleRight className="w-8 h-8 text-blue-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-400" />
                )}
              </Button>
              <span className="text-sm text-muted-foreground">Real Emails</span>
              {useRealEmails && (
                <Badge variant={realEmailService.isConfigured() ? "default" : "destructive"}>
                  {realEmailService.isConfigured() ? "Configured" : "Setup Required"}
                </Badge>
              )}
            </div>

            {/* Setup Button */}
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowSetup(!showSetup)}
                className="professional-card"
              >
                <Settings className="w-4 h-4 mr-2" />
                {showSetup ? 'Hide' : 'Show'} EmailJS Setup
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowGuide(!showGuide)}
                className="professional-card"
              >
                <Mail className="w-4 h-4 mr-2" />
                {showGuide ? 'Hide' : 'Show'} Setup Guide
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDatabaseSetup(!showDatabaseSetup)}
                className="professional-card"
              >
                <Database className="w-4 h-4 mr-2" />
                {showDatabaseSetup ? 'Hide' : 'Show'} Database Setup
              </Button>
            </div>
          </motion.div>

          {/* EmailJS Setup Section */}
          {showSetup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <EmailJSSetup />
            </motion.div>
          )}

          {/* Setup Guide Section */}
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <EmailSetupGuide />
            </motion.div>
          )}

          {/* Database Setup Section */}
          {showDatabaseSetup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <DatabaseSetupGuide />
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Blog Publishing */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status Messages */}
              {publishStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertDescription>
                    ✅ Blog published successfully! Email notifications sent to {subscriberCount} subscribers.
                  </AlertDescription>
                </Alert>
              )}
              
              {publishStatus === 'error' && (
                <Alert variant="destructive">
                  <AlertDescription>
                    ❌ Error publishing blog. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              {/* Rich Blog Editor */}
              <RichBlogEditor
                onSave={(blog) => {
                  // Convert rich blog to traditional format for storage
                  const richContentText = blog.sections.map(section => {
                    switch (section.type) {
                      case 'heading1': return `# ${section.content}`;
                      case 'heading2': return `## ${section.content}`;
                      case 'heading3': return `### ${section.content}`;
                      case 'paragraph': return section.content;
                      case 'quote': return `> ${section.content}`;
                      case 'code': return `\`\`\`\n${section.content}\n\`\`\``;
                      case 'list': return section.listItems?.map(item => `• ${item}`).join('\n') || '';
                      case 'image': return section.imageUrl ? `![${section.imageAlt || ''}](${section.imageUrl})` : '';
                      default: return section.content;
                    }
                  }).join('\n\n');

                  const blogPost = {
                    title: blog.title,
                    content: richContentText,
                    richContent: blog.sections,
                    excerpt: blog.excerpt,
                    readTime: blog.readTime,
                    tags: blog.tags,
                    image: blog.featuredImage,
                    author: 'Dinesh Priyantha',
                    date: new Date().toLocaleDateString()
                  };

                  // Save as draft (you can implement draft storage)
                  localStorage.setItem('blogDraft', JSON.stringify(blogPost));
                  alert('Blog saved as draft!');
                }}
                onPublish={async (blog) => {
                  setIsPublishing(true);
                  setPublishStatus('idle');

                  try {
                    // Convert rich blog to traditional format for storage
                    const richContentText = blog.sections.map(section => {
                      switch (section.type) {
                        case 'heading1': return `# ${section.content}`;
                        case 'heading2': return `## ${section.content}`;
                        case 'heading3': return `### ${section.content}`;
                        case 'paragraph': return section.content;
                        case 'quote': return `> ${section.content}`;
                        case 'code': return `\`\`\`\n${section.content}\n\`\`\``;
                        case 'list': return section.listItems?.map(item => `• ${item}`).join('\n') || '';
                        case 'image': return section.imageUrl ? `![${section.imageAlt || ''}](${section.imageUrl})` : '';
                        default: return section.content;
                      }
                    }).join('\n\n');

                    const blogPost = {
                      title: blog.title,
                      content: richContentText,
                      richContent: blog.sections,
                      excerpt: blog.excerpt,
                      readTime: blog.readTime,
                      tags: blog.tags,
                      image: blog.featuredImage,
                      author: 'Dinesh Priyantha',
                      date: new Date().toLocaleDateString()
                    };

                    const success = await blogManager.addNewBlog(blogPost);

                    if (success) {
                      setPublishStatus('success');
                      
                      // Send blog notification
                      const blogData = {
                        title: blog.title,
                        excerpt: blog.excerpt,
                        date: new Date().toLocaleDateString(),
                        readTime: blog.readTime,
                        author: 'Dinesh Priyantha',
                        blogUrl: `${window.location.origin}/blog`
                      };

                      if (useRealEmails) {
                        await realEmailService.sendBlogNotificationToSubscribers(blogData);
                      } else {
                        emailService.sendBlogNotificationToSubscribers(blogData);
                      }

                      // Clear draft
                      localStorage.removeItem('blogDraft');
                    } else {
                      setPublishStatus('error');
                    }
                  } catch (error) {
                    console.error('Error publishing blog:', error);
                    setPublishStatus('error');
                  } finally {
                    setIsPublishing(false);
                  }
                }}
                isPublishing={isPublishing}
              />

              {/* Quick Actions */}
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="professional-card"
                      onClick={() => {
                        // Test welcome email
                        if (useRealEmails) {
                          realEmailService.addSubscriber('test@example.com');
                        } else {
                          emailService.addSubscriber('test@example.com');
                        }
                      }}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Test Welcome Email
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="professional-card"
                      onClick={async () => {
                        // Test contact form
                        const contactData = {
                          name: 'Test User',
                          email: 'test@example.com',
                          subject: 'Test Message',
                          message: 'This is a test contact form submission.',
                          timestamp: new Date().toLocaleString()
                        };
                        
                        if (useRealEmails) {
                          await realEmailService.sendContactFormNotification(contactData);
                        } else {
                          emailService.sendContactFormNotification(contactData);
                        }
                      }}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Test Contact Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Analytics & Status */}
            <div className="space-y-8">
              <NotificationStatus />
              <EmailConfigStatus />

              {/* Quick Stats */}
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">{analytics.totalSubscribers}</div>
                      <div className="text-xs text-muted-foreground">Subscribers</div>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">{analytics.totalEmailsSent}</div>
                      <div className="text-xs text-muted-foreground">Emails Sent</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Recent Subscribers</h4>
                    {currentEmailService.getSubscribers().slice(-3).map((email, index) => (
                      <div key={index} className="text-xs p-2 bg-accent/30 rounded">
                        {email}
                      </div>
                    ))}
                    {currentEmailService.getSubscribers().length === 0 && (
                      <p className="text-xs text-muted-foreground">No subscribers yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle className="text-sm">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>• <strong>Mode:</strong> {useRealEmails ? 'Real Emails via EmailJS' : 'Demo Mode (Local Logging)'}</p>
                  <p>• Subscribers get welcome emails automatically</p>
                  <p>• New blog posts trigger notifications to all subscribers</p>
                  <p>• Contact forms send auto-replies and admin notifications</p>
                  <p>• All emails are logged and can be viewed in real-time</p>
                  <p className="font-semibold text-blue-500">Admin: dineshpriyantha200248@gmail.com</p>
                  {useRealEmails && !realEmailService.isConfigured() && (
                    <p className="text-red-500 font-semibold">⚠️ EmailJS setup required for real emails</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
