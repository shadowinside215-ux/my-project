import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';

export const Philosophy: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages } = useAdmin();

  return (
    <section id="about" className="h-full md:py-40 bg-ivory p-4 md:p-8 overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <DraggableResizable id="philosophy-text-block">
            <h2 className="text-xl md:text-5xl font-serif text-charcoal mb-2 md:mb-12">{t('philosophy_title')}</h2>
            <p className="text-[10px] md:text-lg leading-relaxed font-light text-charcoal/80">
              {t('philosophy_text')}
            </p>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <AdminImage 
            id="philosophy-image-block"
            src={state.philosophyImage}
            alt="Philosophy Image"
            aspectRatio="aspect-square"
            className="h-full w-full"
            onUpload={(url) => updateImages('philosophyImage', url)}
          />
        </motion.div>
      </div>
    </section>
  );
};
