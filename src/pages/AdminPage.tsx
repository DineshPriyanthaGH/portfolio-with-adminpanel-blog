import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  User, 
  Lock, 
  Settings, 
  Database,
  FileText,
  Mail,
  BarChart3,
  LogOut,
  Eye,
  EyeOff,
  BookOpen,
  Edit,
  Plus,
  Users
} from 'lucide-react';
import BlogManagementDashboard from '@/components/ui/blog-management-dashboard';
import { ContactMessagesManager } from '@/components/ui/contact-messages-manager';
import SupabaseDatabaseSetup from '@/components/ui/supabase-database-setup';
import { authService } from '@/lib/authService';
import { supabaseBlogService } from '@/lib/supabaseBlogService';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('blog-manager');
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0
  });

  console.log('AdminPage rendering:', { isLoading, isAuthenticated });

  useEffect(() => {
    console.log('AdminPage useEffect triggered');
    checkAuthentication();
    loadStats();
  }, []);

  const checkAuthentication = async () => {
    console.log('checkAuthentication called');
    try {
      const isAuth = authService.isAuthenticated();
      console.log('Authentication status:', isAuth);
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await supabaseBlogService.getAllBlogs();
      if (result.success && result.data) {
        const blogs = result.data;
        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: blogs.filter(blog => blog.status === 'published').length,
          draftBlogs: blogs.filter(blog => blog.status === 'draft').length,
          totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const result = await authService.login({
        username: loginForm.username,
        password: loginForm.password
      });
      
      if (result.success) {
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
      } else {
        setLoginError(result.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setActiveTab('blog-manager');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderLoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            
            <CardTitle className="text-2xl font-bold text-center">Admin Portal</CardTitle>
            <p className="text-muted-foreground text-center">
           
            </p>
            {/* Test Credentials Display */}
            
          </CardHeader>
          <CardContent className="space-y-4">
            {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Blog Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Complete Blog Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Database className="w-3 h-3 mr-1" />
                {supabaseBlogService.getSupabaseStatus().isConfigured ? 'Connected' : 'Local Storage'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="professional-card">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
                  <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">{stats.publishedBlogs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Edit className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">{stats.draftBlogs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{stats.totalViews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="blog-manager" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blog Manager</span>
            </TabsTrigger>
            <TabsTrigger value="contact-messages" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="database-setup" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Database</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog-manager" className="space-y-6">
            <BlogManagementDashboard />
          </TabsContent>

          <TabsContent value="contact-messages" className="space-y-6">
            <ContactMessagesManager />
          </TabsContent>

          <TabsContent value="database-setup" className="space-y-6">
            <SupabaseDatabaseSetup />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Username:</span>
                        <span className="font-medium">admin</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Role:</span>
                        <Badge variant="default">Administrator</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">System Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Database:</span>
                        <Badge variant="secondary" className={supabaseBlogService.getSupabaseStatus().isConfigured ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}>
                          {supabaseBlogService.getSupabaseStatus().isConfigured ? "Supabase" : "Local Storage"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Storage:</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Available</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Version:</span>
                        <span className="font-medium">v2.0.0</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setActiveTab('blog-manager')}
                    >
                      <Plus className="w-6 h-6" />
                      <span>Create New Blog</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setActiveTab('database-setup')}
                    >
                      <Database className="w-6 h-6" />
                      <span>Setup Database</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={loadStats}
                    >
                      <BarChart3 className="w-6 h-6" />
                      <span>Refresh Stats</span>
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Blog Management</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Rich text editor with markdown support</li>
                        <li>• Image upload and management</li>
                        <li>• SEO optimization tools</li>
                        <li>• Draft and publish workflow</li>
                        <li>• Tag and category management</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Database Integration</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Supabase cloud database</li>
                        <li>• Real-time data synchronization</li>
                        <li>• Image storage and CDN</li>
                        <li>• Automatic backups</li>
                        <li>• LocalStorage fallback</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? renderAdminDashboard() : renderLoginForm();
};

export default AdminPage;
