import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';
import { CATEGORIES } from '../types';
import { cn } from '../lib/utils';

import { AdminImage } from './AdminImage';
import { Plus, Trash2, Edit2, Check, X as CloseIcon, Loader2, AlertCircle } from 'lucide-react';
import imageCompression from 'browser-image-compression';

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
    <div className="group relative flex flex-col h-full max-w-2xl mx-auto w-full">
      <AdminImage 
        id={`product-img-${product.id}`}
        src={product.image}
        alt={product.name}
        aspectRatio="aspect-[3/4]"
        onUpload={(url) => updateProduct(product.id, { image: url })}
        onDelete={() => updateProduct(product.id, { image: '' })}
        className="w-full"
      />
      
      <div className="mt-6 text-center space-y-2 flex-1 flex flex-col justify-between pb-8">
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
          <DraggableResizable id={`product-info-${product.id}`}>
            <div className="flex flex-col items-center px-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60 font-bold mb-1">{t(`category_${product.category}`, product.category)}</p>
              <h3 className="text-lg md:text-xl font-serif text-charcoal group-hover:text-gold transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-sm md:text-base font-sans text-charcoal/60 tracking-widest group-hover:text-gold transition-colors duration-300 mt-1">
                {product.price} DH
              </p>
            </div>
          </DraggableResizable>
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
  const { state, isAdmin, addProduct, updateImages, setPendingProduct, isScrollEnabled, setIsScrollEnabled, isMobile } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddProductClick = async (e: React.ChangeEvent<HTMLInputElement>, targetCategory?: string) => {
    const originalFile = e.target.files?.[0];
    if (!originalFile) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Compress image on client side
      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(originalFile, options);
      
      // 2. Try to upload to server/Cloudinary
      const formData = new FormData();
      formData.append('image', compressedFile);

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
        const errorData = await response.json().catch(() => ({ error: 'Unknown upload error' }));
        throw new Error(errorData.error || 'Upload failed. Please check Cloudinary configuration.');
      }

      setPendingProduct({
        image: imageUrl,
        category: targetCategory || (activeCategory === 'all' ? CATEGORIES[1] : activeCategory),
        name: '',
        price: 0
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? state.products 
    : state.products.filter(p => p.category === activeCategory);

  if (!isScrollEnabled) return null;

  return (
    <section id="shop" className={cn(
      "bg-ivory p-4 md:p-8 flex flex-col overflow-hidden",
      !isMobile && "min-h-screen py-24",
      isMobile && "py-10"
    )}>
      <div className="flex justify-center mb-12">
        <DraggableResizable id="shop-title">
          <h2 className="font-serif text-[42px] font-normal text-center">
            {t('shop_title', 'Our Collection')}
          </h2>
        </DraggableResizable>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="flex-1 flex flex-col overflow-hidden"
      >
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

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <motion.div 
            layout
            className="grid grid-cols-1 gap-12 md:gap-24"
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
                      {error && (
                        <div className="flex flex-col items-center text-red-400 mb-2 px-4 text-center">
                          <AlertCircle size={16} />
                          <span className="text-[8px] uppercase tracking-widest mt-1">{error}</span>
                        </div>
                      )}
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
      </motion.div>
    </section>
  );
};
