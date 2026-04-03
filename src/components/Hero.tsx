import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages } = useAdmin();

  return (
    <section className="relative h-screen bg-ivory flex items-center overflow-hidden p-8">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <DraggableResizable id="hero-text-block">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-charcoal leading-tight mb-10">
              {t('hero_title', 'Timeless Menswear. Refined Presence.')}
            </h2>
            <a 
              href="#collection"
              className="luxury-button-outline inline-block text-sm px-10 py-4"
            >
              {t('hero_button', 'DISCOVER THE COLLECTION')}
            </a>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-full"
        >
          <AdminImage 
            id="hero-image-block"
            src={state.heroImage}
            alt="Hero Image"
            className="h-full w-full"
            onUpload={(url) => updateImages('heroImage', url)}
          />
        </motion.div>
      </div>
    </section>
  );
};
