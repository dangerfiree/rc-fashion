export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colorImages?: Record<string, string[]>;
  sizes: string[];
  colors: string[];
  stock: number;
  created_at: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  address: string;
  observations?: string;
  items: CartItem[];
  subtotal: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}
