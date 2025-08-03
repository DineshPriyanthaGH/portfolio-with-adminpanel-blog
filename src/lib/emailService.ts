// Email service for handling notifications
// In production, you would integrate with services like EmailJS, Resend, or SendGrid

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

class EmailService {
  private adminEmail = 'dineshpriyantha200248@gmail.com';
  
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
        
        // Send welcome email to new subscriber
        this.sendWelcomeEmail(email);
        
        // Notify admin about new subscription
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

  // Send welcome email to new subscriber
  private sendWelcomeEmail(subscriberEmail: string): void {
    const emailData: EmailNotificationData = {
      to: subscriberEmail,
      subject: "Welcome to Dinesh's Tech Blog!",
      html: this.generateWelcomeEmailTemplate(subscriberEmail),
      type: 'subscription'
    };

    this.sendEmail(emailData);
  }

  // Notify admin about new subscription
  private notifyAdminNewSubscription(subscriberEmail: string): void {
    const emailData: EmailNotificationData = {
      to: this.adminEmail,
      subject: "New Blog Subscription",
      html: this.generateNewSubscriptionNotificationTemplate(subscriberEmail),
      type: 'subscription'
    };

    this.sendEmail(emailData);
  }

  // Send blog notification to all subscribers
  sendBlogNotificationToSubscribers(blogData: BlogNotificationData): void {
    const subscribers = this.getSubscribers();
    
    subscribers.forEach(subscriberEmail => {
      const emailData: EmailNotificationData = {
        to: subscriberEmail,
        subject: `New Blog Post: ${blogData.title}`,
        html: this.generateBlogNotificationTemplate(blogData, subscriberEmail),
        type: 'blog_notification'
      };

      this.sendEmail(emailData);
    });

    // Also notify admin
    const adminEmailData: EmailNotificationData = {
      to: this.adminEmail,
      subject: `Blog Notification Sent: ${blogData.title}`,
      html: this.generateAdminBlogNotificationTemplate(blogData, subscribers.length),
      type: 'blog_notification'
    };

    this.sendEmail(adminEmailData);
  }

  // Handle contact form submission
  sendContactFormNotification(formData: ContactFormData): void {
    // Send auto-reply to user
    const userEmailData: EmailNotificationData = {
      to: formData.email,
      subject: "Thank you for contacting me!",
      html: this.generateContactAutoReplyTemplate(formData),
      type: 'contact'
    };

    this.sendEmail(userEmailData);

    // Send notification to admin
    const adminEmailData: EmailNotificationData = {
      to: this.adminEmail,
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: this.generateContactNotificationTemplate(formData),
      type: 'contact'
    };

    this.sendEmail(adminEmailData);
  }

  // Core email sending function
  private async sendEmail(emailData: EmailNotificationData): Promise<void> {
    try {
      // For demo purposes, we'll log the email and show a browser notification
      console.log('📧 Email Notification:', emailData);
      
      // Store email log for tracking
      this.logEmail(emailData);
      
      // Show browser notification for demo
      this.showBrowserNotification(emailData);
      
      // In production, integrate with actual email service:
      // await emailjs.send('service_id', 'template_id', emailData);
      // or use fetch to send to your backend email API
      
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }

  // Log emails for tracking (in production, use proper logging)
  private logEmail(emailData: EmailNotificationData): void {
    try {
      const emailLogs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
      emailLogs.push({
        ...emailData,
        timestamp: new Date().toISOString(),
        status: 'sent'
      });
      localStorage.setItem('emailLogs', JSON.stringify(emailLogs));
    } catch (error) {
      console.error('Failed to log email:', error);
    }
  }

  // Show browser notification for demo
  private showBrowserNotification(emailData: EmailNotificationData): void {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('📧 Email Sent', {
            body: `${emailData.subject} sent to ${emailData.to}`,
            icon: '/favicon.svg'
          });
        }
      });
    }
  }

  // Email Templates
  private generateWelcomeEmailTemplate(subscriberEmail: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb;">Welcome to Dinesh's Tech Blog!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #334155;">Hello ${subscriberEmail}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Thank you for subscribing to my technical blog! I'm excited to share my latest insights on:
          </p>
          <ul style="color: #475569;">
            <li>Full-Stack Development with MERN Stack</li>
            <li>AI/ML Integration in Web Applications</li>
            <li>DevOps Best Practices</li>
            <li>Cloud Computing with AWS</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b; font-size: 14px;">
            You'll receive notifications when new articles are published.
            <br>You can unsubscribe at any time.
          </p>
        </div>
      </div>
    `;
  }

  private generateNewSubscriptionNotificationTemplate(subscriberEmail: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Blog Subscription 🎉</h2>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
          <p><strong>New Subscriber:</strong> ${subscriberEmail}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Total Subscribers:</strong> ${this.getSubscribers().length}</p>
        </div>
      </div>
    `;
  }

  private generateBlogNotificationTemplate(blogData: BlogNotificationData, subscriberEmail: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb;">New Blog Post Published!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #334155; margin-bottom: 10px;">${blogData.title}</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
            ${blogData.excerpt}
          </p>
          <div style="display: flex; gap: 15px; font-size: 14px; color: #64748b; margin-bottom: 20px;">
            <span>📅 ${blogData.date}</span>
            <span>⏱️ ${blogData.readTime}</span>
            <span>✍️ ${blogData.author}</span>
          </div>
          <div style="text-align: center;">
            <a href="${blogData.blogUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Read Full Article
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b; font-size: 12px;">
            You received this email because you're subscribed to Dinesh's Tech Blog.
          </p>
        </div>
      </div>
    `;
  }

  private generateAdminBlogNotificationTemplate(blogData: BlogNotificationData, subscriberCount: number): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Blog Notification Sent Successfully 📧</h2>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
          <p><strong>Blog Post:</strong> ${blogData.title}</p>
          <p><strong>Notifications Sent:</strong> ${subscriberCount} subscribers</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
  }

  private generateContactAutoReplyTemplate(formData: ContactFormData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb;">Thank you for contacting me!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #334155;">Hello ${formData.name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Thank you for reaching out! I have received your message about "${formData.subject}" 
            and will get back to you within 24-48 hours.
          </p>
          
          <div style="background: #e2e8f0; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <p style="margin: 0; color: #475569;"><strong>Your Message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #64748b; font-style: italic;">"${formData.message}"</p>
          </div>
          
          <p style="color: #475569;">
            In the meantime, feel free to check out my latest blog posts and projects on my portfolio.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b; font-size: 14px;">
            Best regards,<br>
            <strong>Dinesh Priyantha</strong><br>
            Full-Stack Developer
          </p>
        </div>
      </div>
    `;
  }

  private generateContactNotificationTemplate(formData: ContactFormData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Contact Form Submission 📝</h2>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
          <div style="margin-bottom: 15px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Time:</strong> ${formData.timestamp}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0; line-height: 1.6;">${formData.message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="mailto:${formData.email}?subject=Re: ${formData.subject}" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reply to ${formData.name}
          </a>
        </div>
      </div>
    `;
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
        .slice(-10)
    };
  }
}

export const emailService = new EmailService();
