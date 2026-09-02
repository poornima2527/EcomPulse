import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../types/auth';

// Production backend on Render
const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://ecompulse-backend.onrender.com/api';

const request = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem('ecompulse_token');

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = 'Request failed';

    try {
      const payload = await response.json();

      message =
        payload.message ||
        payload.error ||
        message;
    } catch {
      try {
        const text = await response.text();

        if (text) {
          message = text;
        }
      } catch {
        // Ignore response parsing errors
      }
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
};

export const authService = {
  // Login
  login: async (
    credentials: LoginRequest
  ): Promise<AuthResponse> => {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Register
  register: async (
    data: RegisterRequest
  ): Promise<AuthResponse> => {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get logged-in user
  me: async (): Promise<{ user: User }> => {
    return request<{ user: User }>('/auth/me');
  },

  // Logout
  logout: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    return request<{
      success: boolean;
      message: string;
    }>('/auth/logout', {
      method: 'POST',
    });
  },
};