import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from '../AdminContext';
import { CATEGORIES, Product } from '../types';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { DraggableResizable } from './DraggableResizable';

export const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { isAdmin, state, updateProducts } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? state.products 
    : state.products.filter(p => p.category === activeCategory);

  const handleDelete = (id: string) => {
    updateProducts(state.products.filter(p => p.id !== id));
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as string,
      image: formData.get('image') as string,
    };

    if (isAdding) {
      updateProducts([...state.products, productData]);
    } else {
      updateProducts(state.products.map(p => p.id === productData.id ? productData : p));
    }
    setEditingProduct(null);
    setIsAdding(false);
  };

  return (
    <section id="collection" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-4xl font-serif text-navy mb-4">{t('collection')}</h2>
          <div className="flex flex-wrap gap-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-widest pb-1 border-b-2 transition-all ${
                  activeCategory === cat ? 'border-gold text-navy' : 'border-transparent text-navy/40 hover:text-navy'
                }`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => { setIsAdding(true); setEditingProduct({ id: '', name: '', price: 0, category: 'tshirts', image: '' }); }}
            className="flex items-center space-x-2 bg-gold text-ivory px-6 py-3 text-xs uppercase tracking-widest hover:bg-gold-light transition-colors"
          >
            <Plus size={16} />
            <span>{t('add_product')}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-ivory border border-gold/10 mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingProduct(product); setIsAdding(false); }}
                      className="p-2 bg-ivory text-navy hover:text-gold shadow-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-ivory text-red-600 hover:bg-red-50 shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-serif text-navy mb-1">{product.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-gold">{t(`categories.${product.category}`)}</p>
                </div>
                <p className="text-lg font-medium text-navy">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product Edit Modal */}
      <AnimatePresence>
        {(editingProduct || isAdding) && (
          <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm flex items-center justify-center z-[300] p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ivory p-8 max-w-md w-full border border-gold shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-navy">{isAdding ? t('add_product') : t('edit')}</h2>
                <button onClick={() => { setEditingProduct(null); setIsAdding(false); }}><X /></button>
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">Product Name</label>
                  <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-transparent border-b border-navy/20 py-2 outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">Price ($)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full bg-transparent border-b border-navy/20 py-2 outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">Category</label>
                  <select name="category" defaultValue={editingProduct?.category} className="w-full bg-transparent border-b border-navy/20 py-2 outline-none focus:border-gold uppercase text-xs tracking-widest">
                    {CATEGORIES.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{t(`categories.${cat}`)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">Image URL (Cloudinary)</label>
                  <input name="image" defaultValue={editingProduct?.image} required className="w-full bg-transparent border-b border-navy/20 py-2 outline-none focus:border-gold" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-navy text-ivory py-3 text-xs uppercase tracking-widest hover:bg-navy-light">{t('save')}</button>
                  <button type="button" onClick={() => { setEditingProduct(null); setIsAdding(false); }} className="flex-1 border border-navy/20 py-3 text-xs uppercase tracking-widest hover:bg-navy/5">{t('cancel')}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
