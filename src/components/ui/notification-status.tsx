import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Users, 
  MessageCircle, 
  Bell, 
  CheckCircle, 
  Clock,
  Trash2,
  Eye
} from 'lucide-react';
import { emailService } from '@/lib/emailService';

export const NotificationStatus = () => {
  const [analytics, setAnalytics] = useState(emailService.getSubscriptionAnalytics());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Update analytics every 5 seconds
    const interval = setInterval(() => {
      setAnalytics(emailService.getSubscriptionAnalytics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const clearEmailLogs = () => {
    localStorage.removeItem('emailLogs');
    setAnalytics(emailService.getSubscriptionAnalytics());
  };

  const clearSubscribers = () => {
    localStorage.removeItem('emailSubscribers');
    setAnalytics(emailService.getSubscriptionAnalytics());
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <Card className="professional-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-500" />
              Email Notification Status
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="professional-card"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-foreground">{analytics.totalSubscribers}</div>
              <div className="text-sm text-muted-foreground">Active Subscribers</div>
            </div>
            
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <Mail className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-foreground">{analytics.totalEmailsSent}</div>
              <div className="text-sm text-muted-foreground">Emails Sent</div>
            </div>
            
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-foreground">{analytics.recentContacts.length}</div>
              <div className="text-sm text-muted-foreground">Contact Messages</div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-6 space-y-6">
              {/* Recent Email Activity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Recent Email Activity</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearEmailLogs}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Logs
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {emailService.getEmailLogs().slice(-10).reverse().map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg text-sm">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          log.type === 'subscription' ? 'bg-blue-500' :
                          log.type === 'contact' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`} />
                        <span className="text-foreground font-medium">
                          {log.type === 'subscription' ? '📧 Subscription' :
                           log.type === 'contact' ? '💬 Contact Form' :
                           '📝 Blog Notification'}
                        </span>
                        <span className="text-muted-foreground">to {log.to}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </Badge>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                  
                  {emailService.getEmailLogs().length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="w-8 h-8 mx-auto mb-2" />
                      <p>No email activity yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Subscriber List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Subscribers</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSubscribers}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {emailService.getSubscribers().map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-accent/30 rounded text-sm">
                      <span className="text-foreground">{email}</span>
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    </div>
                  ))}
                  
                  {emailService.getSubscribers().length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <p>No subscribers yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">🔧 How Email Notifications Work</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• <strong>Blog Subscriptions:</strong> Users receive welcome email + admin notification</p>
                  <p>• <strong>New Blog Posts:</strong> All subscribers get notified automatically</p>
                  <p>• <strong>Contact Forms:</strong> User gets auto-reply + admin gets notification</p>
                  <p>• <strong>Admin Email:</strong> dineshpriyantha200248@gmail.com</p>
                  <p>• <strong>Demo Mode:</strong> Currently logging emails (integrate with real service for production)</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
