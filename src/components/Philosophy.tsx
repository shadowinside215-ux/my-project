import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';
import { cn } from '../lib/utils';

export const Philosophy: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages, isScrollEnabled, isMobile } = useAdmin();

  const showCompact = isMobile || !isScrollEnabled;

  return (
    <section id="about" className={cn(
      "bg-ivory px-4 md:px-8 overflow-hidden transition-all duration-700",
      showCompact ? "flex-1 min-h-0 py-2" : "h-full md:py-40 p-4 md:p-8"
    )}>
      <div className={cn(
        "grid items-center h-full transition-all duration-700",
        showCompact ? "grid-cols-2 gap-2 max-h-full" : "grid-cols-1 lg:grid-cols-2 gap-4 md:gap-32"
      )}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <DraggableResizable id="philosophy-text-block" className="flex flex-col justify-center h-full">
            <h2 className={cn(
              "font-serif text-charcoal transition-all duration-700",
              showCompact ? "text-[10px] md:text-3xl mb-0.5" : "text-xl md:text-5xl mb-2 md:mb-12"
            )}>
              {t('philosophy_title', 'Our Philosophy')}
            </h2>
            <p className={cn(
              "leading-tight font-light text-charcoal/80 transition-all duration-700",
              showCompact ? "text-[6px] md:text-xs" : "text-[10px] md:text-lg"
            )}>
              {t('philosophy_text', 'At MEN31, we believe in the art of timeless dressing. Our collections are crafted to embody the elegance and sophistication of the modern gentleman, combining classic design with luxurious materials.')}
            </p>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-full min-h-0 flex items-center justify-center"
        >
          <AdminImage 
            id="philosophy-image-block"
            src={state.philosophyImage}
            alt="Philosophy Image"
            aspectRatio="aspect-square"
            className={cn(
              "w-full transition-all duration-700",
              showCompact ? "h-auto max-h-full object-cover" : "h-full object-cover"
            )}
            onUpload={(url) => updateImages('philosophyImage', url)}
            onDelete={() => updateImages('philosophyImage', '')}
          />
        </motion.div>
      </div>
    </section>
  );
};
