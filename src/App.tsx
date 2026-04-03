import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewCollection } from './components/FeaturedGrid';
import { Collection } from './components/Shop';
import { Philosophy } from './components/Philosophy';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { useAdmin } from './AdminContext';
import { AnimatePresence, motion } from 'motion/react';
import { X as CloseIcon } from 'lucide-react';
import './i18n';

export default function App() {
  const { state } = useAdmin();
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

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold selection:text-ivory bg-ivory">
      <Navbar />
      <AdminPanel />
      
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
