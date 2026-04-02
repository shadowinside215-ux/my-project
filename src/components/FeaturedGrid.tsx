import React from 'react';
import { motion } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';

export const FeaturedGrid: React.FC = () => {
  const { state } = useAdmin();

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <DraggableResizable id="featured-grid-unit">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {state.lookbookImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden border border-gold/10"
            >
              <img 
                src={img} 
                alt={`Lookbook ${i + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </DraggableResizable>
    </section>
  );
};
