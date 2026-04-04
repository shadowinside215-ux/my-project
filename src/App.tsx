import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewCollection } from './components/FeaturedGrid';
import { Collection } from './components/Shop';
import { Philosophy } from './components/Philosophy';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { PendingProductModal } from './components/PendingProductModal';
import { useAdmin } from './AdminContext';
import { AnimatePresence, motion } from 'motion/react';
import { X as CloseIcon, Loader2, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from './lib/utils';
import './i18n';

export default function App() {
  const { state, isDataLoading } = useAdmin();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (isDataLoading) {
    return (
      <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-[1000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col -space-y-2 mb-8 items-center">
            <span className="text-4xl font-serif text-white tracking-[0.3em] leading-none">MEN</span>
            <span className="text-5xl font-serif text-gold tracking-[0.3em] leading-none">31</span>
          </div>
          <div className="w-48 h-[1px] bg-gold/20 relative overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-gold"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-ivory selection:bg-gold selection:text-white">
      <Navbar />
      <AdminPanel />
      <PendingProductModal />
      
      <main className="w-full">
        <Hero />
        <NewCollection />
        <Collection />
        <Philosophy />
        <Lookbook />
      </main>
      <Footer />
    </div>
  );
}
