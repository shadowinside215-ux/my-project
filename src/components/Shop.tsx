import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';
import { CATEGORIES } from '../types';
import { cn } from '../lib/utils';

import { AdminImage } from './AdminImage';
import { Plus, Trash2, Edit2, Check, X as CloseIcon, Loader2 } from 'lucide-react';

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
        onDelete={() => updateProduct(product.id, { image: '' })}
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
              <input 
                type="number" 
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                className="w-20 bg-transparent border-b border-navy/10 text-center text-xs outline-none focus:border-gold"
              />
              <span className="text-xs text-charcoal/40">DH</span>
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
              {product.price} DH
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
  const { state, isAdmin, addProduct, updateImages, setPendingProduct } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('all');
  const [uploading, setUploading] = useState(false);

  const handleAddProductClick = async (e: React.ChangeEvent<HTMLInputElement>, targetCategory?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      let imageUrl = '';
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          imageUrl = data.url;
        } else {
          throw new Error('Server returned non-JSON response');
        }
      } else {
        // Fallback to base64
        const reader = new FileReader();
        imageUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }

      setPendingProduct({
        image: imageUrl,
        category: targetCategory || (activeCategory === 'all' ? CATEGORIES[1] : activeCategory),
        name: '',
        price: 0
      });
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

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

      <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar pb-4">
        <div className="flex space-x-8">
          {CATEGORIES.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "text-[10px] uppercase tracking-[0.4em] font-medium transition-all duration-500 relative py-2",
                activeCategory === category ? 'text-gold' : 'text-charcoal/30 hover:text-charcoal'
              )}
            >
              {t(`category_${category}`, category)}
              {activeCategory === category && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid with Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 flex-shrink-0">
        {CATEGORIES.filter(c => c !== 'all').map((category) => (
          <div key={category} className="flex flex-col space-y-2">
            <div className="relative aspect-square group/cat overflow-hidden luxury-border">
              <AdminImage 
                id={`cat-img-${category}`}
                src={state.categoryImages?.[category] || ''}
                alt={category}
                className="w-full h-full"
                onUpload={(url) => updateImages('categoryImages', { ...state.categoryImages, [category]: url })}
                onDelete={() => updateImages('categoryImages', { ...state.categoryImages, [category]: '' })}
                onClick={() => setActiveCategory(category)}
              />
              <div 
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "absolute inset-0 bg-navy/20 group-hover/cat:bg-navy/40 transition-colors cursor-pointer flex items-center justify-center",
                  activeCategory === category && "bg-gold/20"
                )}
              >
                <span className={cn(
                  "text-[10px] uppercase tracking-[0.3em] font-bold text-ivory drop-shadow-md",
                  activeCategory === category && "text-gold"
                )}>
                  {t(`category_${category}`, category)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            {isAdmin && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center justify-center aspect-[3/4] luxury-border border-dashed border-gold/40 bg-gold/5 cursor-pointer hover:bg-gold/10 transition-colors group"
              >
                {uploading ? (
                  <Loader2 size={24} className="animate-spin text-gold" />
                ) : (
                  <>
                    <Plus size={24} className="text-gold group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] uppercase tracking-[0.2em] text-gold font-bold mt-2">Add Product</span>
                  </>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept="image/*"
                  onChange={handleAddProductClick}
                  disabled={uploading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
