import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';
import { cn } from '../lib/utils';

export const Lookbook: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages, isScrollEnabled, isMobile } = useAdmin();

  const showCompact = isMobile || !isScrollEnabled;

  return (
    <section id="lookbook" className={cn(
      "bg-ivory px-4 md:px-8 overflow-hidden transition-all duration-700",
      showCompact ? "flex-1 min-h-0 py-2" : "py-24"
    )}>
      <div className="max-w-[1800px] mx-auto h-full flex flex-col">
        <div className={cn(
          "mb-4 transition-all duration-700",
          showCompact ? "mb-1" : "mb-12"
        )}>
          <DraggableResizable id="lookbook-header">
            <h2 className={cn(
              "font-serif text-charcoal uppercase tracking-widest transition-all duration-700",
              showCompact ? "text-xs md:text-2xl" : "text-2xl md:text-4xl"
            )}>
              {t('feature_grid_title', 'Crafted for the Modern Gentleman')}
            </h2>
            {!showCompact && <div className="luxury-divider mt-4" />}
          </DraggableResizable>
        </div>

        <div className={cn(
          "grid gap-2 h-full transition-all duration-700",
          showCompact ? "grid-cols-3 flex-1 min-h-0" : "grid-cols-1 md:grid-cols-3 md:gap-8"
        )}>
          {state.lookbookImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="h-full min-h-0"
            >
              <AdminImage 
                id={`lookbook-img-${index}`}
                src={src}
                alt={`Lookbook ${index + 1}`}
                aspectRatio="aspect-[3/4]"
                className={cn(
                  "w-full object-cover transition-all duration-700",
                  showCompact ? "h-full" : "h-[500px]"
                )}
                onUpload={(url) => {
                  const newImages = [...state.lookbookImages];
                  newImages[index] = url;
                  updateImages('lookbookImages', newImages);
                }}
                onDelete={() => {
                  const newImages = [...state.lookbookImages];
                  newImages[index] = '';
                  updateImages('lookbookImages', newImages);
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
