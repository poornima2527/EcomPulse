export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpending: number;
  lastOrder: string;
  status: 'Active' | 'VIP' | 'Inactive';
}
