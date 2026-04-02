import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Product, LayoutElement, DEFAULT_PRODUCTS } from './types';
import { getLocalStorage, setLocalStorage } from './lib/utils';

interface AdminContextType {
  isAdmin: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  state: AppState;
  updateLayout: (id: string, layout: Partial<LayoutElement>) => void;
  updateProducts: (products: Product[]) => void;
  updateImages: (key: keyof AppState, value: any) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => getLocalStorage('isAdmin', false));
  const [state, setState] = useState<AppState>(() => getLocalStorage('men31_state', {
    products: DEFAULT_PRODUCTS,
    layouts: {},
    heroImage: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1920',
    logoImage: '',
    lookbookImages: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=800'
    ]
  }));

  useEffect(() => {
    setLocalStorage('men31_state', state);
  }, [state]);

  useEffect(() => {
    setLocalStorage('isAdmin', isAdmin);
  }, [isAdmin]);

  const login = (user: string, pass: string) => {
    if (user === 'sam' && pass === 'sam2006') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const updateLayout = (id: string, layout: Partial<LayoutElement>) => {
    setState(prev => ({
      ...prev,
      layouts: {
        ...prev.layouts,
        [id]: { ...(prev.layouts[id] || { id, x: 0, y: 0 }), ...layout }
      }
    }));
  };

  const updateProducts = (products: Product[]) => {
    setState(prev => ({ ...prev, products }));
  };

  const updateImages = (key: keyof AppState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, state, updateLayout, updateProducts, updateImages }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
