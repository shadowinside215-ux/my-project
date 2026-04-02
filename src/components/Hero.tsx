import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useAdmin();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={state.heroImage} 
          alt="Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-navy/20" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <DraggableResizable id="hero-content" className="flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl font-serif text-ivory mb-8 drop-shadow-2xl">
              MEN 31
            </h2>
            <a 
              href="#collection"
              className="bg-ivory text-navy px-12 py-5 text-sm uppercase tracking-[0.3em] font-medium hover:bg-gold hover:text-ivory transition-all duration-500 shadow-xl"
            >
              {t('shop_now')}
            </a>
          </DraggableResizable>
        </motion.div>
      </div>
    </section>
  );
};
