export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images?: string[];
  colorImages?: Record<string, string[]>;
  category: string;
  sizes: string[];
  colors: string[];
  in_stock: boolean;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user';
}
