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
  fontSize?: number;
}

export interface AppState {
  products: Product[];
  layouts: Record<string, LayoutElement>;
  heroImage: string;
  logoImage: string;
  footerLogo: string;
  newCollectionImage: string;
  philosophyImage: string;
  lookbookImages: string[];
  categoryImages: Record<string, string>;
  facebookLink: string;
  instagramLink: string;
  whatsappNumber: string;
  googleMapsEmbed: string;
  contactEmail: string;
  contactPhone: string;
}

export const DEFAULT_PRODUCTS: Product[] = [
  { id: '1', name: 'Navy Cashmere Overcoat', price: 850, category: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Ivory Linen Shirt', price: 180, category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Tailored Navy Trousers', price: 250, category: 'Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' },
  { id: '5', name: 'Premium Leather Boots', price: 450, category: 'Boots', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800' },
  { id: '6', name: 'Merino Wool Hoodie', price: 220, category: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
  { id: '7', name: 'Silk Pocket Square', price: 45, category: 'Accessories', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800' },
];

export const CATEGORIES = [
  'all', 'T-Shirts', 'Hoodies', 'Pants'
];
