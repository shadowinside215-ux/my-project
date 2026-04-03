import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewCollection } from './components/FeaturedGrid';
import { Collection } from './components/Shop';
import { Philosophy } from './components/Philosophy';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { PendingProductModal } from './components/PendingProductModal';
import { useAdmin } from './AdminContext';
import { AnimatePresence, motion } from 'motion/react';
import { X as CloseIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './i18n';

export default function App() {
  const { state, isDataLoading } = useAdmin();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (isDataLoading) {
    return (
      <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-[1000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col -space-y-2 mb-8 items-center">
            <span className="text-4xl font-serif text-platinum tracking-[0.3em] leading-none">MEN</span>
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
          <span className="mt-4 text-[10px] uppercase tracking-[0.5em] text-gold/60 font-light">
            Loading Collection
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold selection:text-ivory bg-ivory">
      <Navbar />
      <AdminPanel />
      <PendingProductModal />
      
      <main className="flex-1 flex flex-col max-w-[1800px] mx-auto w-full pt-20">
        <Hero />
        <NewCollection />
        <Philosophy />
        <Collection />
        <Footer />
      </main>
    </div>
  );
}
