export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface LayoutElement {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface AppState {
  products: Product[];
  layouts: Record<string, LayoutElement>;
  heroImage: string;
  logoImage: string;
  lookbookImages: string[];
}

export const DEFAULT_PRODUCTS: Product[] = [
  { id: '1', name: 'Navy Cashmere Overcoat', price: 850, category: 'jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Gold Silk Tie', price: 120, category: 'accessories', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Ivory Linen Shirt', price: 180, category: 'tshirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Tailored Navy Trousers', price: 250, category: 'pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' },
  { id: '5', name: 'Premium Leather Boots', price: 450, category: 'boots', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800' },
  { id: '6', name: 'Merino Wool Hoodie', price: 220, category: 'hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
];

export const CATEGORIES = [
  'all', 'tshirts', 'hoodies', 'pants', 'jackets', 'boots', 'accessories'
];
