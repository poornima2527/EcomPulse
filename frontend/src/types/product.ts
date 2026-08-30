export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: 'Active' | 'Low Stock' | 'Draft' | 'Archived';
  sales: number;
  image?: string;
}

export interface ProductFormValues {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: Product['status'];
}
