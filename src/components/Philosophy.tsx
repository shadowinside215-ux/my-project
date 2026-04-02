import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';

export const Philosophy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="py-32 bg-navy text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <DraggableResizable id="philosophy-text">
            <h2 className="text-5xl font-serif mb-12 text-gold">{t('philosophy')}</h2>
            <p className="text-xl leading-relaxed font-light opacity-90 max-w-xl">
              {t('philosophy_text')}
            </p>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <DraggableResizable id="philosophy-image">
            <div className="aspect-[4/5] border border-gold/30 p-4">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" 
                alt="Philosophy" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </DraggableResizable>
        </motion.div>
      </div>
    </section>
  );
};
