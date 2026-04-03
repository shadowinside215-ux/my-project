import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';
import { CATEGORIES } from '../types';

import { AdminImage } from './AdminImage';
import { Plus, Trash2, Edit2, Check, X as CloseIcon } from 'lucide-react';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { t } = useTranslation();
  const { isAdmin, updateProduct, removeProduct } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(product);

  const handleSave = () => {
    updateProduct(product.id, editData);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      <AdminImage 
        id={`product-img-${product.id}`}
        src={product.image}
        alt={product.name}
        aspectRatio="aspect-[3/4]"
        onUpload={(url) => updateProduct(product.id, { image: url })}
      />
      
      <div className="mt-6 text-center space-y-2">
        {isEditing ? (
          <div className="space-y-3 p-4 bg-white/50 backdrop-blur-sm luxury-border">
            <input 
              type="text" 
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full bg-transparent border-b border-navy/10 text-center text-sm font-serif outline-none focus:border-gold"
            />
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-charcoal/40">$</span>
              <input 
                type="number" 
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                className="w-20 bg-transparent border-b border-navy/10 text-center text-xs outline-none focus:border-gold"
              />
            </div>
            <select 
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full bg-transparent border-b border-navy/10 text-center text-[10px] uppercase tracking-widest outline-none focus:border-gold"
            >
              {CATEGORIES.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="flex justify-center space-x-4 pt-2">
              <button onClick={handleSave} className="text-green-600 hover:scale-110 transition-transform"><Check size={16} /></button>
              <button onClick={() => setIsEditing(false)} className="text-red-600 hover:scale-110 transition-transform"><CloseIcon size={16} /></button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">{t(`category_${product.category}`, product.category)}</p>
            <h3 className="text-sm font-serif text-charcoal group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs font-sans text-charcoal/60 tracking-widest group-hover:text-gold transition-colors duration-300">
              ${product.price}
            </p>
          </>
        )}
      </div>

      {isAdmin && !isEditing && (
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 bg-white/90 text-navy hover:bg-gold hover:text-white transition-all rounded-full shadow-lg"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => removeProduct(product.id)}
            className="p-2 bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full shadow-lg"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export const Collection: React.FC = () => {
  const { t } = useTranslation();
  const { state, isAdmin, addProduct } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? state.products 
    : state.products.filter(p => p.category === activeCategory);

  return (
    <section id="collection" className="h-full md:py-32 bg-ivory p-4 md:p-8 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 mb-4 md:mb-12">
        <DraggableResizable id="collection-header">
          <h2 className="text-xl md:text-4xl font-serif text-charcoal mb-2 uppercase tracking-widest">{t('feature_grid_title')}</h2>
          <div className="luxury-divider" />
        </DraggableResizable>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-4 mb-6 flex-shrink-0 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-300 relative pb-1 whitespace-nowrap ${
              activeCategory === category ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'
            }`}
          >
            {category}
            {activeCategory === category && (
              <motion.div 
                layoutId="activeCategory"
                className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            {isAdmin && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center aspect-[3/4] luxury-border border-dashed border-gold/40 bg-gold/5 cursor-pointer hover:bg-gold/10 transition-colors group"
                onClick={() => addProduct({
                  name: 'New Product',
                  price: 0,
                  category: activeCategory === 'all' ? 'tshirts' : activeCategory,
                  image: ''
                })}
              >
                <Plus size={24} className="text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[8px] uppercase tracking-[0.2em] text-gold font-bold mt-2">Add</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
