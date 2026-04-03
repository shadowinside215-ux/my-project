import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';

export const NewCollection: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages } = useAdmin();

  return (
    <section id="collection" className="py-24 bg-ivory overflow-hidden p-8">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <DraggableResizable id="new-collection-text">
            <h2 className="text-4xl md:text-6xl font-serif text-charcoal leading-tight mb-6">
              {t('new_collection_title', 'New Collection')}
            </h2>
            <p className="text-lg text-charcoal/70 mb-10 max-w-md">
              {t('new_collection_subtitle', 'Luxury essentials for the modern gentleman')}
            </p>
            <a 
              href="#shop"
              className="luxury-button inline-block px-10 py-4"
            >
              {t('new_collection_button', 'VIEW COLLECTION')}
            </a>
          </DraggableResizable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <AdminImage 
            id="new-collection-image"
            src={state.newCollectionImage}
            alt="New Collection"
            className="w-full h-[600px] object-cover"
            onUpload={(url) => updateImages('newCollectionImage', url)}
            onDelete={() => updateImages('newCollectionImage', '')}
          />
        </motion.div>
      </div>
    </section>
  );
};
