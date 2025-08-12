import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy,
  RefreshCw
} from 'lucide-react';
import { db } from '@/lib/database';

export const DatabaseSetupGuide = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [isRetrying, setIsRetrying] = useState(false);

  const testConnection = async () => {
    setConnectionStatus('checking');
    try {
      const isConnected = await db.testConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const retryConnection = async () => {
    setIsRetrying(true);
    await testConnection();
    setTimeout(() => setIsRetrying(false), 1000);
  };

  useEffect(() => {
    testConnection();
  }, []);

  const sqlSchema = `-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rich_content JSONB DEFAULT '[]'::jsonb,
  excerpt TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  author TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  likes INTEGER DEFAULT 0,
  image TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Database Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              {connectionStatus === 'checking' ? (
                <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
              ) : connectionStatus === 'connected' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                Database Status: {' '}
                {connectionStatus === 'checking' && 'Checking...'}
                {connectionStatus === 'connected' && 'Connected'}
                {connectionStatus === 'disconnected' && 'Not Connected'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={connectionStatus === 'connected' ? 'default' : 'destructive'}
              >
                {connectionStatus === 'connected' ? 'Online' : 'Offline'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={retryConnection}
                disabled={isRetrying}
              >
                {isRetrying ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Retry'}
              </Button>
            </div>
          </div>

          {connectionStatus === 'disconnected' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Database not connected. Your blog posts are currently saved locally only. 
                Follow the setup guide below to enable persistent storage.
              </AlertDescription>
            </Alert>
          )}

          {connectionStatus === 'connected' && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                ✅ Database connected! Your blog posts will be saved permanently and accessible from anywhere.
              </AlertDescription>
            </Alert>
          )}

          {/* Setup Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Setup with Supabase (Free)</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <p className="font-medium">Create Supabase Account</p>
                  <p className="text-sm text-muted-foreground">Sign up for a free account at Supabase</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => window.open('https://app.supabase.com', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Supabase
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <p className="font-medium">Create New Project</p>
                  <p className="text-sm text-muted-foreground">Create a new project in Supabase dashboard</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <p className="font-medium">Run Database Schema</p>
                  <p className="text-sm text-muted-foreground">Copy and run this SQL in your Supabase SQL editor</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Database Schema:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(sqlSchema)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy SQL
                      </Button>
                    </div>
                    <pre className="bg-accent p-3 rounded text-xs overflow-x-auto max-h-40">
                      <code>{sqlSchema}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <p className="font-medium">Get API Credentials</p>
                  <p className="text-sm text-muted-foreground">Go to Settings → API and copy your credentials</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center flex-shrink-0 mt-1">
                  5
                </div>
                <div>
                  <p className="font-medium">Add Environment Variables</p>
                  <p className="text-sm text-muted-foreground">Create a .env file with your Supabase credentials</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Environment Variables:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`VITE_SUPABASE_URL=your_supabase_url\nVITE_SUPABASE_ANON_KEY=your_anon_key`)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy .env
                      </Button>
                    </div>
                    <pre className="bg-accent p-3 rounded text-xs">
                      <code>{`VITE_SUPABASE_URL=your_supabase_url\nVITE_SUPABASE_ANON_KEY=your_anon_key`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">With Database Connected:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Blog posts saved permanently</li>
              <li>✅ Access from any device</li>
              <li>✅ Automatic backups</li>
              <li>✅ Real-time updates</li>
              <li>✅ Subscriber management</li>
              <li>✅ Contact form submissions</li>
            </ul>
          </div>

          {/* Fallback Info */}
          {connectionStatus === 'disconnected' && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-yellow-800">Current Mode: Local Storage</h4>
              <p className="text-sm text-yellow-700">
                Your blog posts are currently saved in browser storage. This works for development 
                but data may be lost when browser cache is cleared. Set up the database for production use.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
