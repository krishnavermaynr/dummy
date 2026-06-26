export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Sports Apparel' | 'Footwear' | 'Accessories' | 'Equipment' | 'Outdoor Games';
  image: string;
  images?: string[];
  features?: string[];
  rating: number;
  popular?: boolean;
  desc: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  role: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  benefits?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  customization?: {
    name?: string;
    number?: string;
  };
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}
