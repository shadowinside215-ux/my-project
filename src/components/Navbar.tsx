import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { LogIn, LogOut, Globe, Menu, X, Search, Crown } from 'lucide-react';
import { DraggableResizable } from './DraggableResizable';
import { AdminImage } from './AdminImage';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAdmin, error, login, logout, state, updateImages, isScrollEnabled, setIsScrollEnabled, isMobile } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showCompact = isMobile || !isScrollEnabled;

  const toggleLanguage = () => {
    const langs = ['fr', 'en', 'ar'];
    const nextIndex = (langs.indexOf(i18n.language) + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      setShowLogin(false);
      setUsername('');
      setPassword('');
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (!isScrollEnabled) {
      setIsScrollEnabled(true);
      // Small delay to allow layout to update before scrolling
      setTimeout(() => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full bg-navy text-ivory z-[100] border-b border-gold/20 transition-all duration-700",
      showCompact ? "h-12" : "h-24"
    )}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4 cursor-pointer" onClick={() => window.location.reload()}>
          <AdminImage 
            id="nav-logo-img"
            src={state.logoImage}
            alt="Logo"
            className={cn(
              "transition-all duration-700",
              showCompact ? "w-8 h-8" : "w-20 h-20"
            )}
            onUpload={(url) => updateImages('logoImage', url)}
            noBorder
          />
          <div className="flex flex-col -space-y-1">
            <span className={cn(
              "font-serif text-platinum tracking-widest leading-none transition-all duration-700",
              showCompact ? "text-sm" : "text-2xl"
            )}>MEN</span>
            <span className={cn(
              "font-serif text-gold tracking-widest leading-none transition-all duration-700",
              showCompact ? "text-base" : "text-3xl"
            )}>31</span>
          </div>
          {showCompact ? null : (
            <DraggableResizable id="nav-tagline">
              <span className="hidden lg:block text-[10px] uppercase tracking-[0.4em] text-gold/80 font-light whitespace-nowrap ml-8">
                {t('tagline', 'Vêtements Intemporels')}
              </span>
            </DraggableResizable>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-12">
          <DraggableResizable id="nav-links">
            <div className={cn(
              "flex items-center space-x-6 md:space-x-10 uppercase tracking-[0.25em] font-light transition-all duration-700",
              showCompact ? "text-[8px]" : "text-[11px]"
            )}>
              <a href="#" className="hover:text-gold transition-colors">Home</a>
              <a href="#shop" onClick={(e) => handleNavLinkClick(e, '#shop')} className="hover:text-gold transition-colors">Collection</a>
              <a href="#about" onClick={(e) => handleNavLinkClick(e, '#about')} className="hover:text-gold transition-colors">About</a>
              <a href="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')} className="hover:text-gold transition-colors">Contact</a>
              <button className="hover:text-gold transition-colors">
                <Search size={showCompact ? 12 : 16} />
              </button>
            </div>
          </DraggableResizable>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleLanguage}
              className={cn(
                "flex items-center space-x-2 uppercase tracking-widest hover:text-gold transition-colors",
                showCompact ? "text-[8px]" : "text-[10px]"
              )}
            >
              <Globe size={showCompact ? 12 : 14} />
              <span>{i18n.language.toUpperCase()}</span>
            </button>

            {isAdmin ? (
              <button 
                onClick={logout}
                className={cn(
                  "flex items-center space-x-2 border border-gold/30 uppercase tracking-widest hover:bg-gold hover:text-navy transition-all",
                  showCompact ? "px-2 py-1 text-[8px]" : "px-4 py-2 text-[10px]"
                )}
              >
                <LogOut size={showCompact ? 12 : 14} />
                <span>{t('admin_logout')}</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="text-ivory hover:text-gold transition-colors"
              >
                <LogIn size={showCompact ? 14 : 18} />
              </button>
            )}
          </div>
        </div>

        <button className="md:hidden text-ivory" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={showCompact ? 18 : 24} /> : <Menu size={showCompact ? 18 : 24} />}
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
            <a href="#shop" onClick={(e) => handleNavLinkClick(e, '#shop')}>Collection</a>
            <a href="#about" onClick={(e) => handleNavLinkClick(e, '#about')}>About</a>
            <a href="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')}>Contact</a>
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
              className="bg-ivory p-10 max-w-md w-full border border-platinum shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif text-navy">Admin Portal</h2>
                <button onClick={() => setShowLogin(false)} className="text-navy"><X /></button>
              </div>
              <form onSubmit={handleLogin} className="space-y-8">
                {error && (
                  <div className="text-red-500 text-[10px] uppercase tracking-widest text-center bg-red-50 p-2 border border-red-100">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-3 text-charcoal/60">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/10 py-2 focus:border-gold outline-none transition-colors text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-3 text-charcoal/60">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/10 py-2 focus:border-gold outline-none transition-colors text-charcoal"
                  />
                </div>
                <button 
                  type="submit"
                  className="luxury-button w-full"
                >
                  Authenticate
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
