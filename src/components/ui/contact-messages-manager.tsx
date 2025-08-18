import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Trash2, Eye, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const ContactMessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    // Load messages from localStorage or database
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const markAsRead = (messageId: string) => {
    setMessages(prev => {
      const updated = prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      );
      localStorage.setItem('contactMessages', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => {
      const updated = prev.filter(msg => msg.id !== messageId);
      localStorage.setItem('contactMessages', JSON.stringify(updated));
      return updated;
    });
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-muted-foreground">
            Manage incoming contact form submissions
          </p>
        </div>
        <Badge variant={unreadCount > 0 ? "destructive" : "default"}>
          {unreadCount} unread
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Messages ({messages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
                <p className="text-sm">Contact form submissions will appear here</p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? 'border-blue-500 bg-blue-50/50'
                      : 'border-border hover:border-blue-300'
                  } ${!message.read ? 'bg-blue-50/30' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.read) {
                      markAsRead(message.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4" />
                        <span className="font-semibold">{message.name}</span>
                        {!message.read && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {message.email}
                      </p>
                      <p className="font-medium text-sm">{message.subject}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {message.message.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {message.timestamp}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Message Details */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Message Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      From
                    </label>
                    <p className="font-semibold">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <p className="font-semibold">{selectedMessage.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Subject
                  </label>
                  <p className="font-semibold">{selectedMessage.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <div className="mt-2 p-4 bg-accent/50 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Received
                  </label>
                  <p className="text-sm">{selectedMessage.timestamp}</p>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a message to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
