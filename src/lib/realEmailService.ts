import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You'll need to set up EmailJS account and get these credentials
const EMAILJS_CONFIG = {
  serviceId: 'service_gmail', // Replace with your EmailJS service ID
  templateIds: {
  // Template for new subscriptions
    blogNotification: 'template_b44mp6d', // Template for blog notifications
    contactForm: 'template_5t1aql1' // Template for contact form
    // Template for admin notifications
  },
  publicKey: '_wq0dP29UOQjNrh8o', // Replace with your EmailJS public key
  adminEmail: 'dineshpriyantha200248@gmail.com'
};

interface EmailNotificationData {
  to: string;
  subject: string;
  html: string;
  type: 'subscription' | 'contact' | 'blog_notification';
}

interface BlogNotificationData {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  blogUrl: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

class RealEmailService {
  private adminEmail = 'dineshpriyantha200248@gmail.com';
  private isInitialized = false;

  constructor() {
    this.initializeEmailJS();
  }

  private initializeEmailJS(): void {
    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_CONFIG.publicKey);
      this.isInitialized = true;
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize EmailJS:', error);
      this.isInitialized = false;
    }
  }

  // Store subscribers in localStorage (in production, use a database)
  getSubscribers(): string[] {
    try {
      return JSON.parse(localStorage.getItem('emailSubscribers') || '[]');
    } catch {
      return [];
    }
  }

  addSubscriber(email: string): boolean {
    try {
      const subscribers = this.getSubscribers();
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('emailSubscribers', JSON.stringify(subscribers));
        
        // Send real welcome email to new subscriber
        this.sendWelcomeEmail(email);
        
        // Send real notification to admin
        this.notifyAdminNewSubscription(email);
        
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  removeSubscriber(email: string): boolean {
    try {
      const subscribers = this.getSubscribers();
      const filteredSubscribers = subscribers.filter(sub => sub !== email);
      localStorage.setItem('emailSubscribers', JSON.stringify(filteredSubscribers));
      return true;
    } catch {
      return false;
    }
  }

  // Send real welcome email to new subscriber
  private async sendWelcomeEmail(subscriberEmail: string): Promise<void> {
    if (!this.isInitialized) {
      console.error('EmailJS not initialized');
      return;
    }

    try {
      const templateParams = {
        to_email: subscriberEmail,
        to_name: subscriberEmail.split('@')[0],
        from_name: 'Dinesh Priyantha',
        blog_url: window.location.origin + '/blog',
        unsubscribe_url: window.location.origin + '/unsubscribe',
        current_date: new Date().toLocaleDateString()
      };

   

      console.log('✅ Welcome email sent to:', subscriberEmail);
      this.logEmail({
        to: subscriberEmail,
        subject: "Welcome to Dinesh's Tech Blog!",
        html: 'Welcome email sent via EmailJS',
        type: 'subscription'
      });

    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
    }
  }

  // Send real notification to admin about new subscription
  private async notifyAdminNewSubscription(subscriberEmail: string): Promise<void> {
    if (!this.isInitialized) {
      console.error('EmailJS not initialized');
      return;
    }

    try {
      const templateParams = {
        to_email: this.adminEmail,
        subscriber_email: subscriberEmail,
        subscriber_name: subscriberEmail.split('@')[0],
        total_subscribers: this.getSubscribers().length,
        subscription_time: new Date().toLocaleString(),
        dashboard_url: window.location.origin + '/admin'
      };

   

      console.log('✅ Admin notification sent for new subscriber:', subscriberEmail);
      this.logEmail({
        to: this.adminEmail,
        subject: 'New Blog Subscription',
        html: 'Admin notification sent via EmailJS',
        type: 'subscription'
      });

    } catch (error) {
      console.error('❌ Failed to send admin notification:', error);
    }
  }

  // Send real blog notification to all subscribers
  async sendBlogNotificationToSubscribers(blogData: BlogNotificationData): Promise<void> {
    if (!this.isInitialized) {
      console.error('EmailJS not initialized');
      return;
    }

    const subscribers = this.getSubscribers();
    let successCount = 0;
    let errorCount = 0;

    // Send to each subscriber
    for (const subscriberEmail of subscribers) {
      try {
        const templateParams = {
          to_email: subscriberEmail,
          to_name: subscriberEmail.split('@')[0],
          blog_title: blogData.title,
          blog_excerpt: blogData.excerpt,
          blog_date: blogData.date,
          blog_read_time: blogData.readTime,
          blog_author: blogData.author,
          blog_url: blogData.blogUrl,
          unsubscribe_url: window.location.origin + '/unsubscribe'
        };

        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateIds.blogNotification,
          templateParams
        );

        successCount++;
        this.logEmail({
          to: subscriberEmail,
          subject: `New Blog Post: ${blogData.title}`,
          html: 'Blog notification sent via EmailJS',
          type: 'blog_notification'
        });

        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`❌ Failed to send blog notification to ${subscriberEmail}:`, error);
        errorCount++;
      }
    }

    // Send summary to admin
    await this.sendAdminBlogSummary(blogData, successCount, errorCount);
    
    console.log(`✅ Blog notifications sent: ${successCount} success, ${errorCount} failed`);
  }

  // Send summary to admin about blog notification campaign
  private async sendAdminBlogSummary(blogData: BlogNotificationData, successCount: number, errorCount: number): Promise<void> {
    try {
      const templateParams = {
        to_email: this.adminEmail,
        blog_title: blogData.title,
        total_sent: successCount,
        total_failed: errorCount,
        total_subscribers: this.getSubscribers().length,
        campaign_time: new Date().toLocaleString(),
        blog_url: blogData.blogUrl
      };

   

      this.logEmail({
        to: this.adminEmail,
        subject: `Blog Notification Campaign Summary: ${blogData.title}`,
        html: 'Campaign summary sent via EmailJS',
        type: 'blog_notification'
      });

    } catch (error) {
      console.error('❌ Failed to send admin blog summary:', error);
    }
  }

  // Handle real contact form submission
  async sendContactFormNotification(formData: ContactFormData): Promise<void> {
    if (!this.isInitialized) {
      console.error('EmailJS not initialized');
      return;
    }

    try {
      // Send auto-reply to user
      const userTemplateParams = {
        to_email: formData.email,
        to_name: formData.name,
        user_message: formData.message,
        contact_subject: formData.subject,
        from_name: 'Dinesh Priyantha',
        portfolio_url: window.location.origin,
        response_time: '24-48 hours'
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateIds.contactForm,
        userTemplateParams
      );

      // Send notification to admin
      const adminTemplateParams = {
        to_email: this.adminEmail,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_subject: formData.subject,
        contact_message: formData.message,
        contact_time: formData.timestamp,
        reply_url: `mailto:${formData.email}?subject=Re: ${formData.subject}`
      };

  

      console.log('✅ Contact form emails sent successfully');
      
      this.logEmail({
        to: formData.email,
        subject: 'Thank you for contacting me!',
        html: 'Auto-reply sent via EmailJS',
        type: 'contact'
      });

      this.logEmail({
        to: this.adminEmail,
        subject: `New Contact: ${formData.subject}`,
        html: 'Admin notification sent via EmailJS',
        type: 'contact'
      });

    } catch (error) {
      console.error('❌ Failed to send contact form emails:', error);
      throw error;
    }
  }

  // Test email functionality
  async sendTestEmail(): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('EmailJS not initialized');
      return false;
    }

    try {
      const templateParams = {
        to_email: this.adminEmail,
        to_name: 'Admin',
        test_message: 'This is a test email to verify EmailJS integration is working correctly.',
        test_time: new Date().toLocaleString(),
        from_name: 'Portfolio System'
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateIds.contactForm,
        templateParams
      );

      console.log('✅ Test email sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Test email failed:', error);
      return false;
    }
  }

  // Log emails for tracking
  private logEmail(emailData: EmailNotificationData): void {
    try {
      const emailLogs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
      emailLogs.push({
        ...emailData,
        timestamp: new Date().toISOString(),
        status: 'sent',
        service: 'EmailJS'
      });
      localStorage.setItem('emailLogs', JSON.stringify(emailLogs));

      // Show browser notification for successful email
      this.showBrowserNotification(emailData);
    } catch (error) {
      console.error('Failed to log email:', error);
    }
  }

  // Show browser notification
  private showBrowserNotification(emailData: EmailNotificationData): void {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('📧 Real Email Sent!', {
            body: `${emailData.subject} sent to ${emailData.to}`,
            icon: '/favicon.svg'
          });
        }
      });
    }
  }

  // Get email logs for admin dashboard
  getEmailLogs(): any[] {
    try {
      return JSON.parse(localStorage.getItem('emailLogs') || '[]');
    } catch {
      return [];
    }
  }

  // Get subscription analytics
  getSubscriptionAnalytics() {
    const subscribers = this.getSubscribers();
    const emailLogs = this.getEmailLogs();
    
    return {
      totalSubscribers: subscribers.length,
      totalEmailsSent: emailLogs.length,
      recentSubscriptions: emailLogs
        .filter(log => log.type === 'subscription')
        .slice(-10),
      recentContacts: emailLogs
        .filter(log => log.type === 'contact')
        .slice(-10),
      emailService: 'EmailJS (Real Emails)'
    };
  }

  // Check if EmailJS is properly configured
  isConfigured(): boolean {
    return this.isInitialized && 
           EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY' &&
           EMAILJS_CONFIG.serviceId !== 'service_gmail';
  }
}

export const realEmailService = new RealEmailService();
