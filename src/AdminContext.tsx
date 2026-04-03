import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Product, LayoutElement, DEFAULT_PRODUCTS } from './types';
import { getLocalStorage, setLocalStorage } from './lib/utils';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, addDoc, writeBatch } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

interface AdminContextType {
  isAdmin: boolean;
  error: string | null;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
  state: AppState;
  updateLayout: (id: string, layout: Partial<LayoutElement>) => void;
  updateProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateImages: (key: keyof AppState, value: any) => void;
  saveChanges: () => Promise<void>;
  pendingProduct: Partial<Product> | null;
  setPendingProduct: (product: Partial<Product> | null) => void;
  loginWithGoogle: () => Promise<void>;
  user: User | null;
  isLoginLoading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => getLocalStorage('isAdmin', false));
  const [user, setUser] = useState<User | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Partial<Product> | null>(null);
  const [state, setState] = useState<AppState>(() => {
    const savedProducts = getLocalStorage('products', null);
    return {
      products: savedProducts || DEFAULT_PRODUCTS,
      layouts: {},
      heroImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
      logoImage: '',
      footerLogo: '',
      newCollectionImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1200',
      philosophyImage: 'https://images.unsplash.com/photo-1520639889313-7272175b1c39?auto=format&fit=crop&q=80&w=1200',
      lookbookImages: [
        'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1473188588955-719d4b732de3?auto=format&fit=crop&q=80&w=800'
      ],
      categoryImages: {},
      facebookLink: 'https://web.facebook.com/profile.php?id=100083246295413',
      instagramLink: 'https://www.instagram.com/c8__men.s_wear__',
      whatsappNumber: '212661260954',
      googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846357247714!2d-7.6326!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIzLjIiTiA3wrAzNyc1Ny40Ilc!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma',
      contactEmail: 'contact@men31.com',
      contactPhone: '+212 6 61 26 09 54'
    };
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user?.email === 'dragonballsam86@gmail.com') {
        setIsAdmin(true);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setLocalStorage('isAdmin', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    setLocalStorage('products', state.products);
  }, [state.products]);

  useEffect(() => {
    // Listen to layouts
    const unsubLayouts = onSnapshot(collection(db, 'layouts'), (snapshot) => {
      const layouts = snapshot.docs.reduce((acc: Record<string, LayoutElement>, doc) => ({ 
        ...acc, 
        [doc.id]: { ...doc.data(), id: doc.id } as LayoutElement 
      }), {});
      setState(prev => ({ ...prev, layouts }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'layouts'));

    // Listen to settings
    const unsubSettings = onSnapshot(collection(db, 'settings'), (snapshot) => {
      const settings = snapshot.docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.data().value }), {});
      setState(prev => ({ ...prev, ...settings }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'settings'));

    return () => {
      unsubLayouts();
      unsubSettings();
    };
  }, []);

  const [error, setError] = useState<string | null>(null);

  const login = async (user: string, pass: string) => {
    console.log('Attempting login with:', user);
    if (user === 'sam' && pass === 'sam2006') {
      setIsAdmin(true);
      setError(null);
      return true;
    }
    console.log('Login failed');
    setError('Invalid credentials');
    return false;
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
    setError(null);
  };

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

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setState(prev => ({ ...prev, products: [...prev.products, newProduct] }));
  };

  const removeProduct = (id: string) => {
    setState(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const updateImages = (key: keyof AppState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const loginWithGoogle = async () => {
    if (isLoginLoading) return;
    setIsLoginLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Google login error:', error);
      if (error.code === 'auth/cancelled-popup-request') {
        setError('Login cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign in with Google');
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  const saveChanges = async () => {
    try {
      const { products, layouts, ...settings } = state;
      const batch = writeBatch(db);

      // Save layouts
      Object.values(layouts as Record<string, LayoutElement>).forEach(layout => {
        batch.set(doc(db, 'layouts', layout.id), layout);
      });

      // Save settings
      Object.entries(settings).forEach(([key, value]) => {
        batch.set(doc(db, 'settings', key), { value });
      });

      // Save products to Firestore
      for (const product of products) {
        batch.set(doc(db, 'products', product.id), product);
      }

      await batch.commit();
      alert('Changes saved successfully to Cloud and Local Storage!');
    } catch (error) {
      console.error('Error saving changes:', error);
      handleFirestoreError(error, OperationType.WRITE, 'batch-commit');
    }
  };

  return (
    <AdminContext.Provider value={{ 
      isAdmin, error, login, logout, state, updateLayout, updateProducts, 
      addProduct, removeProduct, updateProduct, updateImages, saveChanges,
      pendingProduct, setPendingProduct, loginWithGoogle, user, isLoginLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
