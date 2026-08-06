export type Category = 'Single Origin' | 'Signature Blend' | 'Dark Roast' | 'Espresso' | 'Decaf' | 'Brewing Gear';

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: Category;
  origin: string;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  flavorNotes: string[];
  description: string;
  story: string;
  elevation?: string;
  process?: string;
  images: string[];
  weightOptions: number[]; // e.g. [250, 500, 1000] in grams
  stock: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  brewingRecommendation: string;
  reviewsList: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: number; // in grams
  selectedGrind: 'Whole Bean' | 'Espresso' | 'Filter / V60' | 'French Press';
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  weight: number;
  grind: string;
}

export type OrderStatus = 'Processing' | 'Roasted' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  perksPoints: number;
  avatar: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend: number;
  description: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface BrewGuideItem {
  id: string;
  name: string;
  subtitle: string;
  ratio: string; // e.g. "1:15"
  grindSize: string;
  temp: string;
  brewTime: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  description: string;
  steps: { title: string; instruction: string }[];
  image: string;
}
