import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Settings,
  ExternalLink
} from 'lucide-react';

interface EmailConfigStatus {
  isRealEmailEnabled: boolean;
  hasEmailJSConfig: boolean;
  adminEmail: string;
  configDetails?: {
    serviceId?: string;
    publicKey?: string;
    hasAllTemplates?: boolean;
  };
}

export const EmailConfigStatus = () => {
  const [status, setStatus] = useState<EmailConfigStatus>({
    isRealEmailEnabled: false,
    hasEmailJSConfig: false,
    adminEmail: 'dineshpriyantha200248@gmail.com'
  });

  useEffect(() => {
    const checkEmailConfig = () => {
      const useRealEmail = localStorage.getItem('useRealEmail') === 'true';
      const emailjsConfigStr = localStorage.getItem('emailjsConfig');
      let configDetails = undefined;

      if (emailjsConfigStr) {
        try {
          const config = JSON.parse(emailjsConfigStr);
          const hasAllTemplates = config.templates && 
            Object.values(config.templates).every((id: any) => id && id.length > 0);
          
          configDetails = {
            serviceId: config.serviceId,
            publicKey: config.publicKey ? '••••••••' : undefined,
            hasAllTemplates
          };
        } catch (e) {
          console.error('Error parsing EmailJS config:', e);
        }
      }

      setStatus({
        isRealEmailEnabled: useRealEmail,
        hasEmailJSConfig: !!emailjsConfigStr,
        adminEmail: 'dineshpriyantha200248@gmail.com',
        configDetails
      });
    };

    // Check initial status
    checkEmailConfig();

    // Listen for storage changes (if user updates config in another tab)
    const handleStorageChange = () => checkEmailConfig();
    window.addEventListener('storage', handleStorageChange);

    // Check every 2 seconds for changes
    const interval = setInterval(checkEmailConfig, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="professional-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Email Configuration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Mode */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Mode:</span>
          <Badge variant={status.isRealEmailEnabled ? "default" : "secondary"}>
            {status.isRealEmailEnabled ? "Real Email Mode" : "Demo Mode"}
          </Badge>
        </div>

        {/* Admin Email */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Admin Email:</span>
          <span className="text-sm text-muted-foreground">{status.adminEmail}</span>
        </div>

        {/* EmailJS Configuration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">EmailJS Configuration:</span>
            <div className="flex items-center gap-2">
              {status.hasEmailJSConfig ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <Badge variant={status.hasEmailJSConfig ? "default" : "outline"}>
                {status.hasEmailJSConfig ? "Configured" : "Not Configured"}
              </Badge>
            </div>
          </div>

          {/* Configuration Details */}
          {status.configDetails && (
            <div className="ml-4 space-y-1 text-xs text-muted-foreground">
              <div>Service ID: {status.configDetails.serviceId || 'Not set'}</div>
              <div>Public Key: {status.configDetails.publicKey || 'Not set'}</div>
              <div>Templates: {status.configDetails.hasAllTemplates ? '4/4 configured' : 'Incomplete'}</div>
            </div>
          )}
        </div>

        {/* Status Alerts */}
        {status.isRealEmailEnabled && !status.hasEmailJSConfig && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Real email mode is enabled but EmailJS is not configured. 
              Please complete the setup to send real emails.
            </AlertDescription>
          </Alert>
        )}

        {status.isRealEmailEnabled && status.hasEmailJSConfig && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Real email notifications are active! All notifications will be sent to your Gmail inbox.
            </AlertDescription>
          </Alert>
        )}

        {!status.isRealEmailEnabled && (
          <Alert>
            <Settings className="h-4 w-4" />
            <AlertDescription>
              Demo mode is active. Email notifications are simulated and stored locally.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Actions */}
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>📧 Blog subscriptions will notify: {status.adminEmail}</div>
            <div>📝 Contact form submissions will notify: {status.adminEmail}</div>
            <div>📰 New blog posts will notify all subscribers</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
