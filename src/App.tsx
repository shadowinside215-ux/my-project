import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { AdminProvider } from './AdminContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedGrid } from './components/FeaturedGrid';
import { Shop } from './components/Shop';
import { Philosophy } from './components/Philosophy';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import './i18n';

export default function App() {
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
    <AdminProvider>
      <div className="min-h-screen selection:bg-gold selection:text-ivory">
        <Navbar />
        <AdminPanel />
        <main>
          <Hero />
          <FeaturedGrid />
          <Shop />
          <Philosophy />
        </main>
        <Footer />
      </div>
    </AdminProvider>
  );
}
