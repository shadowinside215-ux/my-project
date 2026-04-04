import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { motion } from 'motion/react';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';

export const Hero: React.FC = () => {
  const { state, updateImages, isAdmin, setIsScrollEnabled } = useAdmin();
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[580px] max-md:h-[420px] overflow-hidden bg-navy">
      {/* Background Image */}
      <div className="absolute inset-0">
        <AdminImage 
          id="hero-bg-img"
          src={state.heroImage || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80'}
          alt="Hero Background"
          className="w-full h-full object-cover object-top"
          onUpload={(url) => updateImages('heroImage', url)}
          noBorder
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-[60px] pb-[60px] max-md:px-[24px] max-md:pb-[40px]">
        <DraggableResizable id="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-[52px] max-md:text-[32px] text-white font-normal leading-[1.2]">
              {t('hero_title', 'Timeless Menswear.')}<br />{t('hero_subtitle', 'Refined Presence.')}
            </h1>
            <button 
              onClick={() => {
                setIsScrollEnabled(true);
                setTimeout(() => {
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="mt-[24px] font-sans text-[11px] text-white uppercase tracking-[3px] border-[1.5px] border-white px-[28px] py-[14px] bg-transparent hover:bg-white hover:text-navy transition-all duration-500"
            >
              {t('hero_cta', 'DISCOVER THE COLLECTION')}
            </button>
          </motion.div>
        </DraggableResizable>
      </div>
    </section>
  );
};
