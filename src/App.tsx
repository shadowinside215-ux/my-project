import React, { useEffect, useState, useRef } from 'react';
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
  const { state, isDataLoading, isMobile } = useAdmin();
  const { i18n } = useTranslation();
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (isMobile && !isDataLoading) {
      const updateScale = () => {
        if (!wrapperRef.current || !contentRef.current) return;
        
        const contentHeight = contentRef.current.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        if (contentHeight === 0) return;

        // Calculate scale to fit height
        const newScale = viewportHeight / contentHeight;
        
        // Apply scale
        setScale(newScale);
      };

      const resizeObserver = new ResizeObserver(() => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(() => {
          updateScale();
        });
      });

      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }

      // Initial update
      updateScale();
      
      window.addEventListener('resize', updateScale);
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateScale);
      };
    } else {
      setScale(1);
    }
  }, [isMobile, isDataLoading, state]);

  if (isDataLoading) {
    return (
      <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-[1000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          {state.logoImage ? (
            <img 
              src={state.logoImage} 
              alt="MEN 31 Logo" 
              className="w-32 h-32 object-contain mb-8"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center mb-8">
              <Crown className="text-gold w-12 h-12 mb-4" />
              <h1 className="text-ivory font-serif text-3xl tracking-[0.2em]">MEN 31</h1>
            </div>
          )}
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
    <div 
      className={cn(
        "w-full bg-ivory selection:bg-gold selection:text-white",
        isMobile && "h-screen overflow-hidden relative"
      )}
    >
      <AdminPanel />
      <PendingProductModal />
      
      <div 
        ref={wrapperRef}
        style={isMobile ? {
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: `${100 / scale}%`,
          height: 'auto',
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: `-${(100 / scale) / 2}%`
        } : {}}
      >
        <div ref={contentRef} className="w-full">
          <Navbar />
          <main className="w-full">
            <Hero />
            <NewCollection />
            <Collection />
            <Philosophy />
            <Lookbook />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
