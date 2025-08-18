// Simple authentication service for admin access
interface AdminCredentials {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  username?: string;
  loginTime?: string;
}

interface LoginResult {
  success: boolean;
  message?: string;
}

class AuthService {
  private static readonly ADMIN_CREDENTIALS: AdminCredentials = {
    username: 'admindinesh',
    password: 'admind123'
  };

  private static readonly AUTH_KEY = 'portfolio_admin_auth';
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Check if user is currently authenticated
  isAuthenticated(): boolean {
    const authData = this.getAuthData();
    if (!authData || !authData.isAuthenticated) {
      return false;
    }

    // Check if session has expired
    if (authData.loginTime) {
      const loginTime = new Date(authData.loginTime).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - loginTime;

      if (timeDiff > AuthService.SESSION_DURATION) {
        this.logout();
        return false;
      }
    }

    return true;
  }

  // Authenticate user
  async login(credentials: AdminCredentials): Promise<LoginResult> {
    try {
      if (
        credentials.username === AuthService.ADMIN_CREDENTIALS.username &&
        credentials.password === AuthService.ADMIN_CREDENTIALS.password
      ) {
        const authState: AuthState = {
          isAuthenticated: true,
          username: credentials.username,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(authState));
        return { success: true };
      }

      return { success: false, message: 'Invalid username or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(AuthService.AUTH_KEY);
  }

  // Get current auth data
  private getAuthData(): AuthState | null {
    try {
      const authData = localStorage.getItem(AuthService.AUTH_KEY);
      return authData ? JSON.parse(authData) : null;
    } catch {
      return null;
    }
  }

  // Get current user info
  getCurrentUser(): { username: string; loginTime: string } | null {
    const authData = this.getAuthData();
    if (authData && authData.isAuthenticated && authData.username && authData.loginTime) {
      return {
        username: authData.username,
        loginTime: authData.loginTime
      };
    }
    return null;
  }

  // Check if session will expire soon (within 1 hour)
  isSessionExpiringSoon(): boolean {
    const authData = this.getAuthData();
    if (!authData || !authData.loginTime) return false;

    const loginTime = new Date(authData.loginTime).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - loginTime;
    const oneHour = 60 * 60 * 1000;

    return timeDiff > (AuthService.SESSION_DURATION - oneHour);
  }

  // Extend session
  extendSession(): void {
    const authData = this.getAuthData();
    if (authData && authData.isAuthenticated) {
      authData.loginTime = new Date().toISOString();
      localStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(authData));
    }
  }
}

export const authService = new AuthService();
