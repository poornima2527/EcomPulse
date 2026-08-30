import type { AiInsightData, AnalyticsData } from '../types/analytics';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('ecompulse_token');

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const payload = await response.json();
      message = payload.message || payload.error || message;
    } catch {
      const text = await response.text();
      if (text) {
        message = text;
      }
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};

export const analyticsService = {
  getAnalytics: async (): Promise<AnalyticsData> => request<AnalyticsData>('/analytics'),
  getInsights: async (): Promise<AiInsightData> => request<AiInsightData>('/ai-insights'),
};
