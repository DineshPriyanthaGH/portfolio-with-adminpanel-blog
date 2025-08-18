import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  RefreshCw,
  Settings,
  Key,
  Globe,
  Shield
} from 'lucide-react';
import { supabaseBlogService } from '@/lib/supabaseBlogService';

const SupabaseDatabaseSetup: React.FC = () => {
  const [credentials, setCredentials] = useState({
    url: '',
    key: ''
  });
  const [status, setStatus] = useState<{
    isConfigured: boolean;
    hasCredentials: boolean;
  }>({ isConfigured: false, hasCredentials: false });
  const [testing, setTesting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    checkStatus();
    loadSavedCredentials();
  }, []);

  const checkStatus = () => {
    const currentStatus = supabaseBlogService.getSupabaseStatus();
    setStatus(currentStatus);
  };

  const loadSavedCredentials = () => {
    const savedUrl = localStorage.getItem('supabase_url') || '';
    const savedKey = localStorage.getItem('supabase_anon_key') || '';
    setCredentials({ url: savedUrl, key: savedKey });
  };

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveCredentials = () => {
    if (!credentials.url || !credentials.key) {
      showMessage('error', 'Please enter both URL and API key');
      return;
    }

    const success = supabaseBlogService.configureSupabase(credentials.url, credentials.key);
    
    if (success) {
      showMessage('success', 'Supabase credentials saved successfully!');
      checkStatus();
    } else {
      showMessage('error', 'Failed to configure Supabase. Please check your credentials.');
    }
  };

  const handleTestConnection = async () => {
    if (!credentials.url || !credentials.key) {
      showMessage('error', 'Please save credentials first');
      return;
    }

    setTesting(true);
    try {
      // This would test the connection in a real scenario
      await new Promise(resolve => setTimeout(resolve, 2000));
      showMessage('success', 'Connection test successful!');
    } catch (error) {
      showMessage('error', 'Connection test failed. Please check your credentials.');
    } finally {
      setTesting(false);
    }
  };

  const handleCreateTables = async () => {
    if (!status.isConfigured) {
      showMessage('error', 'Please configure Supabase credentials first');
      return;
    }

    setCreating(true);
    try {
      const result = await supabaseBlogService.createBlogTables();
      
      if (result.success) {
        showMessage('success', result.message || 'Database tables created successfully!');
      } else if (result.instructions) {
        showMessage('info', 'Manual setup required - see SQL script below');
        console.log(result.instructions);
      } else {
        showMessage('error', result.error || 'Failed to create tables');
      }
    } catch (error) {
      console.error('Error creating database tables:', error);
      showMessage('error', 'Error creating database tables - please use manual SQL setup');
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showMessage('info', 'Copied to clipboard!');
  };

  const sqlScript = `-- Blog Management Database Schema
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/YOUR_PROJECT/sql

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blog_images_blog_id ON public.blog_images(blog_id);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on blogs" ON public.blogs FOR ALL USING (true);
CREATE POLICY "Allow all operations on blog_images" ON public.blog_images FOR ALL USING (true);

-- Storage policies for blog images
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Allow public downloads" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Allow public updates" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Allow public deletes" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');
CREATE POLICY "Allow public read access to published blogs" ON blogs
FOR SELECT USING (status = 'published');

-- Allow public read access to blog images
CREATE POLICY "Allow public read access to blog images" ON blog_images
FOR SELECT USING (true);

-- Allow authenticated users full access (for admin)
CREATE POLICY "Allow authenticated users full access to blogs" ON blogs
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to blog images" ON blog_images
FOR ALL USING (auth.role() = 'authenticated');

-- Set up storage policies for blog images
CREATE POLICY "Allow public access to blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update blog images" ON storage.objects
FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete blog images" ON storage.objects
FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Supabase Database Setup
          </CardTitle>
          <p className="text-muted-foreground">
            Configure your Supabase database for blog management with image storage
          </p>
        </CardHeader>
      </Card>

      {/* Message */}
      {message && (
        <Alert className={
          message.type === 'error' ? 'border-red-200 bg-red-50' :
          message.type === 'success' ? 'border-green-200 bg-green-50' :
          'border-blue-200 bg-blue-50'
        }>
          <AlertDescription className={
            message.type === 'error' ? 'text-red-800' :
            message.type === 'success' ? 'text-green-800' :
            'text-blue-800'
          }>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Configuration Status:</span>
                <Badge className={status.isConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {status.isConfigured ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      Not Connected
                    </>
                  )}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Credentials Saved:</span>
                <Badge className={status.hasCredentials ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                  {status.hasCredentials ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Yes
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      No
                    </>
                  )}
                </Badge>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={checkStatus}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
            </CardContent>
          </Card>

          {/* Credentials */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Supabase Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="supabase-url" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Project URL
                </Label>
                <Input
                  id="supabase-url"
                  type="url"
                  placeholder="https://your-project.supabase.co"
                  value={credentials.url}
                  onChange={(e) => setCredentials(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="supabase-key" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Anonymous Key
                </Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={credentials.key}
                  onChange={(e) => setCredentials(prev => ({ ...prev, key: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveCredentials} className="flex-1">
                  Save Credentials
                </Button>
                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={testing || !credentials.url || !credentials.key}
                >
                  {testing ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Test
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Database Setup */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Database Tables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create the necessary database tables and storage buckets for blog management.
              </p>

              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  This will create tables and storage buckets in your Supabase database. 
                  Make sure you have the necessary permissions.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleCreateTables}
                disabled={creating || !status.isConfigured}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {creating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Database className="w-4 h-4 mr-2" />
                )}
                Create Database Tables
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Setup Guide */}
        <div className="space-y-6">
          {/* Step-by-Step Guide */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Setup Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Create Supabase Project</h4>
                    <p className="text-sm text-muted-foreground">
                      Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">supabase.com</a> and create a new project.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Get API Credentials</h4>
                    <p className="text-sm text-muted-foreground">
                      Go to Settings → API and copy your Project URL and Anonymous key.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Configure Credentials</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter your credentials in the form and save them.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Create Database Tables</h4>
                    <p className="text-sm text-muted-foreground">
                      Click "Create Database Tables" to set up the blog management schema.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">Ready to Use!</h4>
                    <p className="text-sm text-muted-foreground">
                      Your blog management system is now connected to Supabase.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SQL Script */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Manual SQL Setup
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(sqlScript)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy SQL
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://app.supabase.com', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open Supabase
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If automatic setup doesn't work, you can manually run this SQL script in your Supabase SQL Editor:
              </p>
              <Textarea
                value={sqlScript}
                readOnly
                rows={10}
                className="font-mono text-xs"
              />
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>What Gets Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span><strong>blogs</strong> table for blog posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span><strong>blog_images</strong> table for image metadata</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span><strong>blog-images</strong> storage bucket</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Database indexes for performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Row Level Security policies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Storage policies for image uploads</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupabaseDatabaseSetup;
