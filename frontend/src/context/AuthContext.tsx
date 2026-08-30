import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const TOKEN_STORAGE_KEY = 'ecompulse_token';
const USER_STORAGE_KEY = 'ecompulse_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const persistAuth = (authResponse: AuthResponse) => {
    const nextUser = authResponse.user;
    setUser(nextUser);
    if (authResponse.token) {
      setToken(authResponse.token);
    }
  };

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    persistAuth(response);
  };

  const register = async (data: RegisterRequest) => {
    const response = await authService.register(data);
    persistAuth(response);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    void authService.logout().catch(() => undefined);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
