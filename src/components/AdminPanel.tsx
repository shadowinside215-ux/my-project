import React from 'react';
import { useAdmin } from '../AdminContext';
import { X, Image as ImageIcon, Layout, Package, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPanel: React.FC = () => {
  const { isAdmin, logout, state, updateImages } = useAdmin();

  if (!isAdmin) return null;

  const handleImageUpdate = (key: 'heroImage' | 'logoImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      // Add cache buster for unique URLs as requested
      const uniqueUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
      updateImages(key, uniqueUrl);
    }
  };

  return (
    <motion.div 
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      className="fixed top-24 right-6 w-80 bg-navy text-ivory p-6 shadow-2xl z-[150] border border-gold/30"
    >
      <div className="flex justify-between items-center mb-8 border-b border-gold/20 pb-4">
        <div className="flex items-center space-x-2">
          <Layout size={18} className="text-gold" />
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Admin Panel</h2>
        </div>
        <button onClick={logout} className="text-gold hover:text-ivory transition-colors">
          <LogOut size={18} />
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <label className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gold mb-3">
            <ImageIcon size={14} />
            <span>Hero Image URL</span>
          </label>
          <input 
            type="text" 
            placeholder="Cloudinary URL..."
            className="w-full bg-ivory/10 border border-gold/20 p-2 text-xs outline-none focus:border-gold transition-colors"
            onBlur={(e) => handleImageUpdate('heroImage', e)}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gold mb-3">
            <ImageIcon size={14} />
            <span>Logo Image URL</span>
          </label>
          <input 
            type="text" 
            placeholder="Cloudinary URL..."
            className="w-full bg-ivory/10 border border-gold/20 p-2 text-xs outline-none focus:border-gold transition-colors"
            onBlur={(e) => handleImageUpdate('logoImage', e)}
          />
        </div>

        <div className="pt-4 border-t border-gold/10">
          <p className="text-[10px] text-ivory/40 uppercase tracking-widest leading-relaxed">
            * Layout changes are saved automatically.
            <br />
            * Use handles to move/resize elements.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
