import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Product, LayoutElement, DEFAULT_PRODUCTS } from './types';
import { getLocalStorage, setLocalStorage } from './lib/utils';
import { db, auth, googleProvider, signInWithPopup, handleFirestoreError, OperationType } from './firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, addDoc, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  login: () => Promise<boolean>;
  logout: () => void;
  state: AppState;
  updateLayout: (id: string, layout: Partial<LayoutElement>) => void;
  updateProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  updateImages: (key: keyof AppState, value: any) => void;
  saveChanges: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [state, setState] = useState<AppState>({
    products: [],
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
    facebookLink: 'https://web.facebook.com/profile.php?id=100083246295413',
    instagramLink: 'https://www.instagram.com/c8__men.s_wear__',
    whatsappNumber: '212661260954',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846357247714!2d-7.6326!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIzLjIiTiA3wrAzNyc1Ny40Ilc!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma',
    contactEmail: 'contact@men31.com',
    contactPhone: '+212 6 61 26 09 54'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'dragonballsam86@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Listen to products
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setState(prev => ({ ...prev, products: products.length > 0 ? products : DEFAULT_PRODUCTS }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'products'));

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
      unsubProducts();
      unsubLayouts();
      unsubSettings();
    };
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email === 'dragonballsam86@gmail.com') {
        setIsAdmin(true);
        return true;
      } else {
        alert('Unauthorized email');
        await signOut(auth);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    signOut(auth);
    setIsAdmin(false);
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

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, 'products'), product);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'products');
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
    }
  };

  const updateImages = (key: keyof AppState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
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

      await batch.commit();
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes.');
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, state, updateLayout, updateProducts, addProduct, removeProduct, updateProduct, updateImages, saveChanges }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
