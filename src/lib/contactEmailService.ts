// Contact form email service for sending messages to Gmail
interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

class ContactEmailService {
  private readonly targetEmail = 'dineshpriyantha200248@gmail.com';

  // Send contact form message to Gmail using EmailJS
  async sendContactFormToGmail(contactData: ContactMessage): Promise<boolean> {
    try {
      // First, save to database/localStorage as backup
      this.saveContactMessage(contactData);

      // Try to send email using the browser's mailto (simple fallback)
      const subject = encodeURIComponent(`Portfolio Contact: ${contactData.subject}`);
      const body = encodeURIComponent(
        `New contact form submission:\n\n` +
        `Name: ${contactData.name}\n` +
        `Email: ${contactData.email}\n` +
        `Subject: ${contactData.subject}\n` +
        `Message: ${contactData.message}\n\n` +
        `Timestamp: ${contactData.timestamp}\n` +
        `---\n` +
        `This message was sent from your portfolio contact form.`
      );

      // If we have EmailJS configured, use that
      if (this.isEmailJSConfigured()) {
        return await this.sendViaEmailJS(contactData);
      } else {
        // Fallback: Open mailto link and save locally
        const mailtoLink = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
        
        // Show notification to user
        this.showEmailNotification(contactData);
        return true;
      }
    } catch (error) {
      console.error('Error sending contact form email:', error);
      return false;
    }
  }

  // Send via EmailJS if configured
  private async sendViaEmailJS(contactData: ContactMessage): Promise<boolean> {
    try {
      // Check if EmailJS is loaded
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const emailjs = (window as any).emailjs;
        
        const templateParams = {
          to_email: this.targetEmail,
          from_name: contactData.name,
          from_email: contactData.email,
          subject: `Portfolio Contact: ${contactData.subject}`,
          message: contactData.message,
          timestamp: contactData.timestamp
        };

        // Get EmailJS configuration from localStorage
        const config = this.getEmailJSConfig();
        if (!config.serviceId || !config.templateId || !config.publicKey) {
          throw new Error('EmailJS not properly configured');
        }

        const result = await emailjs.send(
          config.serviceId,
          config.templateId,
          templateParams,
          config.publicKey
        );

        console.log('✅ Contact form email sent via EmailJS:', result);
        return true;
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error('EmailJS sending failed:', error);
      throw error;
    }
  }

  // Check if EmailJS is configured
  private isEmailJSConfigured(): boolean {
    const config = this.getEmailJSConfig();
    return !!(config.serviceId && config.templateId && config.publicKey);
  }

  // Get EmailJS configuration
  private getEmailJSConfig() {
    return {
      serviceId: localStorage.getItem('emailjs_service_id') || '',
      templateId: localStorage.getItem('emailjs_template_id') || '',
      publicKey: localStorage.getItem('emailjs_public_key') || ''
    };
  }

  // Save contact message locally as backup
  private saveContactMessage(contactData: ContactMessage): void {
    try {
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const messageWithId = {
        ...contactData,
        id: Date.now(),
        status: 'sent',
        timestamp: new Date().toLocaleString()
      };
      
      existingMessages.unshift(messageWithId);
      
      // Keep only last 100 messages
      if (existingMessages.length > 100) {
        existingMessages.splice(100);
      }
      
      localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
      console.log('📝 Contact message saved locally');
    } catch (error) {
      console.error('Error saving contact message locally:', error);
    }
  }

  // Show notification to user about email status
  private showEmailNotification(contactData: ContactMessage): void {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 400px;
      font-family: system-ui, -apple-system, sans-serif;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">📧 Email Opened</div>
      <div style="font-size: 14px; opacity: 0.9;">
        Your default email client should open with the message pre-filled. 
        If not, please manually send an email to: ${this.targetEmail}
      </div>
    `;

    document.body.appendChild(notification);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    // Remove notification after 8 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }, 300);
    }, 8000);

    // Add slideOut animation
    style.textContent += `
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
  }

  // Get all contact messages (for admin panel)
  getContactMessages(): any[] {
    try {
      return JSON.parse(localStorage.getItem('contactMessages') || '[]');
    } catch {
      return [];
    }
  }

  // Mark message as read (for admin panel)
  markMessageAsRead(messageId: number): void {
    try {
      const messages = this.getContactMessages();
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        messages[messageIndex].isRead = true;
        localStorage.setItem('contactMessages', JSON.stringify(messages));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  // Delete contact message (for admin panel)
  deleteContactMessage(messageId: number): void {
    try {
      const messages = this.getContactMessages();
      const filteredMessages = messages.filter(msg => msg.id !== messageId);
      localStorage.setItem('contactMessages', JSON.stringify(filteredMessages));
    } catch (error) {
      console.error('Error deleting contact message:', error);
    }
  }

  // Get contact form statistics
  getContactStats() {
    const messages = this.getContactMessages();
    const today = new Date().toDateString();
    const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      total: messages.length,
      unread: messages.filter(msg => !msg.isRead).length,
      today: messages.filter(msg => new Date(msg.timestamp).toDateString() === today).length,
      thisWeek: messages.filter(msg => new Date(msg.timestamp) > thisWeek).length
    };
  }
}

export const contactEmailService = new ContactEmailService();
