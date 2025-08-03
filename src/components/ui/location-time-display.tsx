import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';

interface LocationTimeProps {
  className?: string;
}

interface LocationData {
  country: string;
  city: string;
  timezone: string;
}

export const LocationTimeDisplay: React.FC<LocationTimeProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user location
    const fetchLocation = async () => {
      try {
        // First try to get timezone from browser
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // For demo purposes, we'll use a mock location
        // In production, you'd use a geolocation API like ipapi.co or similar
        const mockLocation: LocationData = {
          country: 'Sri Lanka',
          city: 'Colombo',
          timezone: timezone || 'Asia/Colombo'
        };
        
        setLocation(mockLocation);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching location:', error);
        // Fallback location
        setLocation({
          country: 'Unknown',
          city: 'Unknown',
          timezone: 'UTC'
        });
        setIsLoading(false);
      }
    };

    fetchLocation();

    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: location?.timezone
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: location?.timezone
    });
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-4 text-sm text-muted-foreground ${className}`}>
        <div className="animate-pulse-professional">Loading location...</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-2 text-sm ${className}`}>
      <div className="flex items-center space-x-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{location?.city}, {location?.country}</span>
      </div>
      
      <div className="flex items-center space-x-2 text-foreground font-medium">
        <Clock className="h-4 w-4" />
        <span className="font-mono">{formatTime(currentTime)}</span>
      </div>
      
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{formatDate(currentTime)}</span>
      </div>
    </div>
  );
};
