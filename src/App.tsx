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
  const { state, isDataLoading, isScrollEnabled, isMobile } = useAdmin();
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

  // On mobile/tablet, we want the compact view to be the "everything on one screen" view.
  // Scrolling is only allowed when isScrollEnabled is true.
  const showCompact = isMobile || !isScrollEnabled;

  return (
    <div className={cn(
      "min-h-screen flex flex-col selection:bg-gold selection:text-ivory bg-ivory",
      !isScrollEnabled && "h-screen overflow-hidden"
    )}>
      <Navbar />
      <AdminPanel />
      <PendingProductModal />
      
      <main className={cn(
        "flex-1 flex flex-col max-w-[1800px] mx-auto w-full transition-all duration-700",
        showCompact ? "pt-12" : "pt-24",
        !isScrollEnabled && "h-[calc(100vh-48px)]"
      )}>
        <Hero />
        <NewCollection />
        <Philosophy />
        <Lookbook />
        <Collection />
        <Footer />
      </main>
    </div>
  );
}
