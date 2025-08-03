import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Settings, 
  Mail,
  AlertCircle,
  Info
} from 'lucide-react';

interface SetupStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'current';
}

export const EmailSetupGuide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState({
    serviceId: '',
    publicKey: '',
    templates: {
      subscription: '',
      blogNotification: '',
      contactForm: '',
      adminNotification: ''
    }
  });

  const steps: SetupStep[] = [
    {
      id: 1,
      title: 'Create EmailJS Account',
      description: 'Sign up for a free EmailJS account and connect Gmail',
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: 'Setup Email Service',
      description: 'Configure Gmail service in EmailJS dashboard',
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: 'Create Email Templates',
      description: 'Create 4 email templates for different notifications',
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'completed' : 'pending'
    },
    {
      id: 4,
      title: 'Configure Application',
      description: 'Enter your EmailJS credentials in the application',
      status: currentStep === 4 ? 'current' : currentStep > 4 ? 'completed' : 'pending'
    }
  ];

  const emailTemplates = {
    subscription: `
Subject: Welcome to Dinesh's Blog!

Hello {{to_name}},

Thank you for subscribing to my blog! You'll now receive notifications about new posts and updates.

Best regards,
Dinesh Priyantha
    `,
    blogNotification: `
Subject: New Blog Post: {{blog_title}}

Hello {{to_name}},

I've just published a new blog post that you might find interesting:

Title: {{blog_title}}
Excerpt: {{blog_excerpt}}
Read Time: {{read_time}}
Published: {{publish_date}}

Read the full post: {{blog_url}}

Best regards,
Dinesh Priyantha
    `,
    contactForm: `
Subject: New Contact Form Submission

Hello Dinesh,

You have received a new message through your portfolio contact form:

From: {{from_name}} ({{from_email}})
Subject: {{message_subject}}

Message:
{{message_content}}

Submitted on: {{submission_date}}

Best regards,
Your Portfolio Website
    `,
    adminNotification: `
Subject: Portfolio Notification

Hello Dinesh,

{{notification_message}}

Timestamp: {{timestamp}}

Best regards,
Your Portfolio System
    `
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleConfigSave = () => {
    localStorage.setItem('emailjsConfig', JSON.stringify(config));
    alert('Configuration saved! You can now enable real email notifications.');
  };

  return (
    <div className="space-y-6">
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            EmailJS Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Follow these steps to enable real email notifications to your Gmail inbox: 
              <strong> dineshpriyantha200248@gmail.com</strong>
            </AlertDescription>
          </Alert>

          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  step.status === 'completed' ? 'bg-green-500 text-white' :
                  step.status === 'current' ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {step.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${step.status === 'current' ? 'text-primary' : ''}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Step Details */}
          {currentStep === 1 && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Step 1: Create EmailJS Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>1. Visit EmailJS website and create a free account</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://www.emailjs.com/', '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open EmailJS
                </Button>
                <p>2. Verify your email address</p>
                <p>3. Once logged in, proceed to the next step</p>
                <Button onClick={() => setCurrentStep(2)}>Next Step</Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Step 2: Setup Gmail Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>1. In EmailJS dashboard, go to "Email Services"</p>
                <p>2. Click "Add New Service" and select "Gmail"</p>
                <p>3. Connect your Gmail account: <strong>dineshpriyantha200248@gmail.com</strong></p>
                <p>4. Copy the Service ID (usually starts with 'service_')</p>
                <div className="space-y-2">
                  <Label htmlFor="serviceId">Service ID</Label>
                  <Input
                    id="serviceId"
                    placeholder="service_xxxxxxx"
                    value={config.serviceId}
                    onChange={(e) => setConfig(prev => ({ ...prev, serviceId: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setCurrentStep(1)} variant="outline">Previous</Button>
                  <Button onClick={() => setCurrentStep(3)} disabled={!config.serviceId}>Next Step</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Step 3: Create Email Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>Create these 4 email templates in your EmailJS dashboard:</p>
                
                {Object.entries(emailTemplates).map(([templateName, templateContent]) => (
                  <div key={templateName} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium capitalize">{templateName.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(templateContent)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Template
                      </Button>
                    </div>
                    <div className="bg-muted p-3 rounded text-sm font-mono whitespace-pre-wrap">
                      {templateContent}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`template-${templateName}`}>Template ID</Label>
                      <Input
                        id={`template-${templateName}`}
                        placeholder="template_xxxxxxx"
                        value={config.templates[templateName as keyof typeof config.templates]}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          templates: { ...prev.templates, [templateName]: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Button onClick={() => setCurrentStep(2)} variant="outline">Previous</Button>
                  <Button 
                    onClick={() => setCurrentStep(4)} 
                    disabled={!Object.values(config.templates).every(id => id)}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Step 4: Configure Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>1. In EmailJS dashboard, go to "Account" → "General"</p>
                <p>2. Copy your Public Key</p>
                <div className="space-y-2">
                  <Label htmlFor="publicKey">Public Key</Label>
                  <Input
                    id="publicKey"
                    placeholder="your_public_key"
                    value={config.publicKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, publicKey: e.target.value }))}
                  />
                </div>
                
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Once you save this configuration, you can enable "Real Email Mode" in the admin panel.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button onClick={() => setCurrentStep(3)} variant="outline">Previous</Button>
                  <Button 
                    onClick={handleConfigSave}
                    disabled={!config.publicKey || !config.serviceId || !Object.values(config.templates).every(id => id)}
                  >
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Configuration Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Current Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Service ID:</strong> {config.serviceId || 'Not set'}
                </div>
                <div>
                  <strong>Public Key:</strong> {config.publicKey ? '••••••••' : 'Not set'}
                </div>
                <div>
                  <strong>Subscription Template:</strong> {config.templates.subscription || 'Not set'}
                </div>
                <div>
                  <strong>Blog Template:</strong> {config.templates.blogNotification || 'Not set'}
                </div>
                <div>
                  <strong>Contact Template:</strong> {config.templates.contactForm || 'Not set'}
                </div>
                <div>
                  <strong>Admin Template:</strong> {config.templates.adminNotification || 'Not set'}
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
