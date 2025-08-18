import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Mail, Database, Globe, User, Key } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Configure your admin panel and services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Theme</label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Auto-save drafts</label>
                <p className="text-sm text-muted-foreground">
                  Automatically save blog drafts while writing
                </p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Email notifications</label>
                <p className="text-sm text-muted-foreground">
                  Get notified of new contact messages
                </p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-medium">Admin Email</label>
              <p className="text-sm text-muted-foreground mb-2">
                Email address for receiving notifications
              </p>
              <div className="p-3 bg-accent/50 rounded border">
                dineshpriyantha200248@gmail.com
              </div>
            </div>

            <div>
              <label className="font-medium">EmailJS Status</label>
              <p className="text-sm text-muted-foreground mb-2">
                Service for sending real emails
              </p>
              <Badge variant="outline">
                Configuration Required
              </Badge>
            </div>

            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Configure EmailJS
            </Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-medium">Database Type</label>
              <p className="text-sm text-muted-foreground mb-2">
                Current storage solution
              </p>
              <Badge variant="default">Supabase</Badge>
            </div>

            <div>
              <label className="font-medium">Connection Status</label>
              <p className="text-sm text-muted-foreground mb-2">
                Database connectivity status
              </p>
              <Badge variant="default">Connected</Badge>
            </div>

            <div>
              <label className="font-medium">Auto-backup</label>
              <p className="text-sm text-muted-foreground mb-2">
                Automatic data backup schedule
              </p>
              <Badge variant="outline">Weekly</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Site Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-medium">Site Title</label>
              <p className="text-sm text-muted-foreground mb-2">
                Main site title and branding
              </p>
              <div className="p-3 bg-accent/50 rounded border">
                Dinesh Priyantha - Portfolio
              </div>
            </div>

            <div>
              <label className="font-medium">Author</label>
              <p className="text-sm text-muted-foreground mb-2">
                Default blog post author
              </p>
              <div className="p-3 bg-accent/50 rounded border">
                Dinesh Priyantha
              </div>
            </div>

            <div>
              <label className="font-medium">Site URL</label>
              <p className="text-sm text-muted-foreground mb-2">
                Base URL for blog notifications
              </p>
              <div className="p-3 bg-accent/50 rounded border">
                {window.location.origin}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button variant="destructive">
              <Settings className="w-4 h-4 mr-2" />
              Reset Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
