import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { emailService } from '@/lib/emailService';
import { realEmailService } from '@/lib/realEmailService';

interface EmailSubscriptionProps {
  className?: string;
  onSubscribe?: (email: string) => Promise<boolean>;
}

export const EmailSubscription: React.FC<EmailSubscriptionProps> = ({
  className = '',
  onSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if real email service is configured and enabled
      const useRealEmail = localStorage.getItem('useRealEmail') === 'true';
      
      // Use the email service to handle subscription
      const success = emailService.addSubscriber(email);
      
      if (success) {
        // Send admin notification about new subscriber
        if (useRealEmail) {
          await realEmailService.sendContactFormNotification({
            name: email.split('@')[0],
            email: email,
            subject: 'New Blog Subscription',
            message: `New subscriber: ${email} has subscribed to your blog updates.`,
            timestamp: new Date().toISOString()
          });
        }
        
        setIsSubscribed(true);
        setEmail('');
      } else {
        setError('You are already subscribed to our newsletter.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`professional-card ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                Successfully Subscribed!
              </h3>
              <p className="text-sm text-muted-foreground">
                Thank you for subscribing to our newsletter. You'll receive updates about new posts and professional insights.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`professional-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Mail className="h-5 w-5" />
          <span>Stay Updated</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Subscribe to receive the latest blog posts and professional insights directly in your inbox.
        </p>
        
        <form onSubmit={handleSubscribe} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="professional-card"
            disabled={isLoading}
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full professional-button"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse-professional w-4 h-4 bg-current rounded-full" />
                <span>Subscribing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Subscribe</span>
              </div>
            )}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground">
          No spam, unsubscribe at any time. Your email is secure and will never be shared.
        </p>
      </CardContent>
    </Card>
  );
};
