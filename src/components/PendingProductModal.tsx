import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminContext';
import { CATEGORIES } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon, Check, Package, Tag, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PendingProductModal: React.FC = () => {
  const { t } = useTranslation();
  const { pendingProduct, setPendingProduct, addProduct } = useAdmin();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState(CATEGORIES[1]); // Default to first real category

  useEffect(() => {
    if (pendingProduct) {
      setName(pendingProduct.name || '');
      setPrice(pendingProduct.price || 0);
      setCategory(pendingProduct.category || CATEGORIES[1]);
    }
  }, [pendingProduct]);

  if (!pendingProduct) return null;

  const handleSave = () => {
    if (!name || price <= 0) {
      alert('Please enter a valid name and price.');
      return;
    }

    addProduct({
      name,
      price,
      category,
      image: pendingProduct.image || ''
    });
    setPendingProduct(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-ivory w-full max-w-md overflow-hidden luxury-border shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-navy text-ivory">
            <div className="flex items-center space-x-3">
              <Package className="text-gold" size={20} />
              <h3 className="text-sm font-serif uppercase tracking-[0.3em]">New Product Details</h3>
            </div>
            <button 
              onClick={() => setPendingProduct(null)}
              className="text-gold hover:scale-110 transition-transform"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            {/* Image Preview */}
            <div className="relative aspect-[3/4] w-48 mx-auto luxury-border overflow-hidden group">
              <img 
                src={pendingProduct.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-charcoal/60 font-bold flex items-center space-x-2">
                  <Tag size={12} className="text-gold" />
                  <span>Product Name</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Navy Cashmere Overcoat"
                  className="w-full bg-transparent border-b border-navy/10 py-2 text-sm font-serif outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/60 font-bold flex items-center space-x-2">
                    <DollarSign size={12} className="text-gold" />
                    <span>Price (DH)</span>
                  </label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-navy/10 py-2 text-sm outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/60 font-bold flex items-center space-x-2">
                    <Package size={12} className="text-gold" />
                    <span>Category</span>
                  </label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/10 py-2 text-[10px] uppercase tracking-widest outline-none focus:border-gold transition-colors"
                  >
                    {CATEGORIES.filter(c => c !== 'all').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-platinum/10 flex justify-end space-x-4">
            <button 
              onClick={() => setPendingProduct(null)}
              className="px-6 py-2 text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center space-x-2 bg-gold text-navy px-8 py-2 rounded-full hover:bg-navy hover:text-ivory transition-all shadow-lg group"
            >
              <Check size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Save Product</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
