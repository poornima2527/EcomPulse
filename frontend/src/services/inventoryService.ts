import type { Product } from '../types/product';

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

export interface InventoryItem {
  id: string;
  sku: string;
  product: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  status: 'Healthy' | 'Low Stock' | 'Out of Stock';
  location: string;
  lastUpdated: string;
}

export const inventoryService = {
  list: async (): Promise<InventoryItem[]> => request<InventoryItem[]>('/inventory'),
  restock: async (id: string, quantity: number): Promise<InventoryItem> =>
    request<InventoryItem>(`/inventory/${id}/restock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),
};
