import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';
import { cn } from '../lib/utils';

export const NewCollection: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages, isScrollEnabled, setIsScrollEnabled, isMobile } = useAdmin();

  const showCompact = isMobile || !isScrollEnabled;

  return (
    <section id="collection" className={cn(
      "bg-ivory overflow-hidden px-4 md:px-8 transition-all duration-700",
      showCompact ? "flex-1 min-h-0 py-2" : "py-24 p-8"
    )}>
      <div className={cn(
        "max-w-[1800px] mx-auto grid items-center h-full transition-all duration-700",
        showCompact ? "grid-cols-2 gap-2 max-h-full" : "grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12"
      )}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <DraggableResizable id="new-collection-text">
            <h2 className={cn(
              "font-serif text-charcoal leading-tight transition-all duration-700",
              showCompact ? "text-sm md:text-3xl mb-0.5" : "text-4xl md:text-6xl mb-6"
            )}>
              {t('new_collection_title', 'New Collection')}
            </h2>
            <p className={cn(
              "text-charcoal/70 transition-all duration-700",
              showCompact ? "text-[8px] md:text-xs mb-1" : "text-lg mb-10 max-w-md"
            )}>
              {t('new_collection_subtitle', 'Luxury essentials for the modern gentleman')}
            </p>
            <button 
              onClick={() => setIsScrollEnabled(true)}
              className={cn(
                "luxury-button inline-block transition-all duration-700 whitespace-nowrap",
                showCompact ? "px-2 py-1 text-[8px]" : "px-10 py-4"
              )}
            >
              {t('new_collection_button', 'VIEW COLLECTION')}
            </button>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-full min-h-0 flex items-center justify-center"
        >
          <AdminImage 
            id="new-collection-image"
            src={state.newCollectionImage}
            alt="New Collection"
            aspectRatio={showCompact ? "aspect-square" : undefined}
            className={cn(
              "w-full object-cover transition-all duration-700",
              showCompact ? "h-auto max-h-full" : "h-[600px]"
            )}
            onUpload={(url) => updateImages('newCollectionImage', url)}
            onDelete={() => updateImages('newCollectionImage', '')}
          />
        </motion.div>
      </div>
    </section>
  );
};
