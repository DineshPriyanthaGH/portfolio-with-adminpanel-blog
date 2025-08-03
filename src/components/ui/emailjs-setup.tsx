import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Settings, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { realEmailService } from '@/lib/realEmailService';

export const EmailJSSetup = () => {
  const [showCredentials, setShowCredentials] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleTestEmail = async () => {
    setTestStatus('testing');
    try {
      const success = await realEmailService.sendTestEmail();
      setTestStatus(success ? 'success' : 'error');
      setTimeout(() => setTestStatus('idle'), 5000);
    } catch (error) {
      setTestStatus('error');
      setTimeout(() => setTestStatus('idle'), 5000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const emailTemplates = {
    subscription: `
Hello {{to_name}},

Welcome to Dinesh's Tech Blog! 🎉

Thank you for subscribing to my technical blog. I'm excited to share my latest insights on:

• Full-Stack Development with MERN Stack
• AI/ML Integration in Web Applications  
• DevOps Best Practices
• Cloud Computing with AWS

You'll receive notifications when new articles are published.

Best regards,
Dinesh Priyantha
Full-Stack Developer

Blog: {{blog_url}}
Unsubscribe: {{unsubscribe_url}}
`,
    
    blogNotification: `
New Blog Post Published! 📝

{{blog_title}}

{{blog_excerpt}}

📅 Published: {{blog_date}}
⏱️ Read Time: {{blog_read_time}}
✍️ Author: {{blog_author}}

Read the full article: {{blog_url}}

Best regards,
Dinesh Priyantha

Unsubscribe: {{unsubscribe_url}}
`,

    contactForm: `
Hello {{to_name}},

Thank you for contacting me! 

I have received your message about "{{contact_subject}}" and will get back to you within {{response_time}}.

Your Message:
"{{user_message}}"

In the meantime, feel free to check out my latest blog posts and projects on my portfolio.

Best regards,
Dinesh Priyantha
Full-Stack Developer

Portfolio: {{portfolio_url}}
`,

    adminNotification: `
New Activity on Your Portfolio! 📧

Type: Contact Form Submission / New Subscription / Blog Campaign

Details:
• Name: {{contact_name}}
• Email: {{contact_email}} / {{subscriber_email}}
• Subject: {{contact_subject}}
• Time: {{contact_time}} / {{subscription_time}}
• Message: {{contact_message}}

Reply: {{reply_url}}
Dashboard: {{dashboard_url}}
`
  };

  return (
    <div className="space-y-6">
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>EmailJS Setup for Real Email Notifications</span>
            <Badge variant={realEmailService.isConfigured() ? "default" : "destructive"}>
              {realEmailService.isConfigured() ? "Configured" : "Not Configured"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Setup Instructions */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Step-by-Step Setup Guide
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">1</span>
                <div>
                  <p className="font-medium">Create EmailJS Account</p>
                  <p>Go to <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center">emailjs.com <ExternalLink className="w-3 h-3 ml-1" /></a> and create a free account</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">2</span>
                <div>
                  <p className="font-medium">Setup Gmail Service</p>
                  <p>Add Gmail service in EmailJS dashboard and connect your Gmail account: <strong>dineshpriyantha200248@gmail.com</strong></p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">3</span>
                <div>
                  <p className="font-medium">Create Email Templates</p>
                  <p>Create 4 email templates with the exact template IDs shown below</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">4</span>
                <div>
                  <p className="font-medium">Update Configuration</p>
                  <p>Update the credentials in <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">realEmailService.ts</code></p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Required Configuration</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCredentials(!showCredentials)}
                className="professional-card"
              >
                {showCredentials ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showCredentials ? 'Hide' : 'Show'} Details
              </Button>
            </div>

            {showCredentials && (
              <div className="bg-accent/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Service ID:</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 bg-background p-2 rounded text-sm">service_gmail</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard('service_gmail')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Template IDs (create these in EmailJS):</label>
                  <div className="space-y-2 mt-1">
                    {[
                      'template_subscription',
                      'template_blog_notification', 
                      'template_contact_form',
                      'template_admin_notification'
                    ].map((templateId) => (
                      <div key={templateId} className="flex items-center space-x-2">
                        <code className="flex-1 bg-background p-2 rounded text-sm">{templateId}</code>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(templateId)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Public Key:</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 bg-background p-2 rounded text-sm">YOUR_PUBLIC_KEY (get from EmailJS dashboard)</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard('YOUR_PUBLIC_KEY')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Admin Email:</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 bg-background p-2 rounded text-sm">dineshpriyantha200248@gmail.com</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard('dineshpriyantha200248@gmail.com')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Email Templates */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Email Templates (Copy to EmailJS)</h4>
            {Object.entries(emailTemplates).map(([key, template]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Template
                  </label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(template)}
                    className="professional-card"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Template
                  </Button>
                </div>
                <textarea
                  readOnly
                  value={template}
                  className="w-full h-32 p-3 bg-background border border-border rounded-lg text-sm resize-none"
                />
              </div>
            ))}
          </div>

          {/* Test Email */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Test Configuration</h4>
            
            {testStatus === 'success' && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  ✅ Test email sent successfully! Check your Gmail inbox.
                </AlertDescription>
              </Alert>
            )}
            
            {testStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  ❌ Test email failed. Please check your EmailJS configuration.
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleTestEmail}
              disabled={testStatus === 'testing'}
              className="professional-button w-full"
            >
              {testStatus === 'testing' ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  <span>Sending Test Email...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Test Email to dineshpriyantha200248@gmail.com</span>
                </div>
              )}
            </Button>
          </div>

          {/* Current Status */}
          <div className="bg-accent/30 p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Current Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>EmailJS Library:</span>
                <Badge variant="default" className="bg-green-500">Installed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Configuration:</span>
                <Badge variant={realEmailService.isConfigured() ? "default" : "destructive"}>
                  {realEmailService.isConfigured() ? "Complete" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Admin Email:</span>
                <span className="text-muted-foreground">dineshpriyantha200248@gmail.com</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
