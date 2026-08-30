export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Processing' | 'Shipped' | 'Refunded';
  channel?: string;
}
