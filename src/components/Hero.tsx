import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';
import { cn } from '../lib/utils';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages, isScrollEnabled, setIsScrollEnabled, isMobile } = useAdmin();

  const showCompact = isMobile || !isScrollEnabled;

  return (
    <section className={cn(
      "relative bg-ivory flex items-center overflow-hidden px-4 md:px-8 transition-all duration-700",
      showCompact ? "flex-1 min-h-0 py-2" : "h-screen p-8"
    )}>
      <div className={cn(
        "w-full h-full grid items-center transition-all duration-700",
        showCompact ? "grid-cols-2 gap-2 max-h-full" : "grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12"
      )}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <DraggableResizable id="hero-text-block">
            <h2 className={cn(
              "font-serif text-charcoal leading-none transition-all duration-700",
              showCompact ? "text-lg md:text-3xl lg:text-4xl mb-1" : "text-4xl md:text-6xl lg:text-7xl mb-10"
            )}>
              {t('hero_title', 'TIMELESS MENSWEAR')}
            </h2>
            <button 
              onClick={() => setIsScrollEnabled(true)}
              className={cn(
                "luxury-button-outline inline-block transition-all duration-700 whitespace-nowrap",
                showCompact ? "px-3 py-1 text-[8px]" : "px-10 py-4 text-sm"
              )}
            >
              {t('hero_button', 'DISCOVER THE COLLECTION')}
            </button>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-full min-h-0 flex items-center justify-center"
        >
          <AdminImage 
            id="hero-image-block"
            src={state.heroImage}
            alt="Hero Image"
            aspectRatio={showCompact ? "aspect-square" : undefined}
            className={cn(
              "w-full transition-all duration-700",
              showCompact ? "h-auto max-h-full object-cover" : "h-full object-cover"
            )}
            onUpload={(url) => updateImages('heroImage', url)}
            onDelete={() => updateImages('heroImage', '')}
          />
        </motion.div>
      </div>
    </section>
  );
};
