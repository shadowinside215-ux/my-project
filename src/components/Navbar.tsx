import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { LogIn, LogOut, Globe, Menu, X, Search, Crown } from 'lucide-react';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAdmin, login, logout, state, updateImages } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const handleLogin = async () => {
    const success = await login();
    if (success) {
      setShowLogin(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-navy text-ivory z-[100] border-b border-gold/20">
      <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <AdminImage 
            id="nav-logo-img"
            src={state.logoImage}
            alt="Logo"
            className="w-32 h-12"
            onUpload={(url) => updateImages('logoImage', url)}
            onClick={() => window.location.reload()}
          />
          <DraggableResizable id="nav-tagline">
            <span className="hidden lg:block text-[10px] uppercase tracking-[0.4em] text-gold/80 font-light whitespace-nowrap">
              {t('tagline', 'Vêtements Intemporels')}
            </span>
          </DraggableResizable>
        </div>

        <div className="hidden md:flex items-center space-x-12">
          <DraggableResizable id="nav-links">
            <div className="flex items-center space-x-10 text-[11px] uppercase tracking-[0.25em] font-light">
              <a href="#" className="hover:text-gold transition-colors">Home</a>
              <a href="#collection" className="hover:text-gold transition-colors">Collection</a>
              <a href="#about" className="hover:text-gold transition-colors">About</a>
              <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
              <button className="hover:text-gold transition-colors">
                <Search size={16} />
              </button>
            </div>
          </DraggableResizable>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-[10px] uppercase tracking-widest hover:text-gold transition-colors"
            >
              <Globe size={14} />
              <span>{i18n.language.toUpperCase()}</span>
            </button>

            {isAdmin ? (
              <button 
                onClick={logout}
                className="flex items-center space-x-2 border border-gold/30 px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-gold hover:text-navy transition-all"
              >
                <LogOut size={14} />
                <span>{t('admin_logout')}</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="text-ivory hover:text-gold transition-colors"
              >
                <LogIn size={18} />
              </button>
            )}
          </div>
        </div>

        <button className="md:hidden text-ivory" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-navy border-b border-gold/20 px-8 py-10 flex flex-col space-y-8 text-center uppercase tracking-[0.2em] text-xs font-light"
          >
            <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#collection" onClick={() => setIsMenuOpen(false)}>Collection</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <button onClick={toggleLanguage} className="flex items-center justify-center space-x-2">
              <Globe size={14} />
              <span>{i18n.language.toUpperCase()}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center z-[200] p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ivory p-10 max-w-md w-full border border-platinum shadow-2xl text-center"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif text-navy">Admin Portal</h2>
                <button onClick={() => setShowLogin(false)} className="text-navy"><X /></button>
              </div>
              <div className="space-y-8">
                <p className="text-sm text-charcoal/60">Please sign in with your authorized Google account to access admin features.</p>
                <button 
                  onClick={handleLogin}
                  className="luxury-button w-full flex items-center justify-center space-x-3"
                >
                  <Globe size={18} />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
