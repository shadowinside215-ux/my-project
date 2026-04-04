import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { Search, Menu, X, Crown, Globe, LogIn, LogOut, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAdmin, error, login, logout, state, updateImages, isMobile, isScrollEnabled, setIsScrollEnabled } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <nav className="h-[70px] bg-navy flex justify-between items-center px-[60px] max-md:px-[24px] relative z-[100] nav-shadow">
      {/* Left: Brand */}
      <div className="flex items-center">
        <AdminImage 
          id="nav-logo-img"
          src={state.logoImage}
          alt="Logo"
          className="w-10 h-10 transition-all duration-700"
          onUpload={(url) => updateImages('logoImage', url)}
          noBorder
        />
      </div>

      {/* Right: Links (Visible on both Desktop and Mobile) */}
      <div className="flex items-center space-x-[15px] md:space-x-[30px]">
        <DraggableResizable id="nav-links">
          <div className="flex items-center space-x-[10px] md:space-x-[30px] font-sans text-white text-[8px] md:text-[12px] tracking-[1px] md:tracking-[3px] uppercase">
            <a href="#" className="hover:text-gold transition-colors">Home</a>
            <a href="#collection" className="hover:text-gold transition-colors">Collection</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
            <button className="hover:text-gold transition-colors max-md:hidden">
              <Search size={14} />
            </button>
          </div>
        </DraggableResizable>

        <div className="flex items-center space-x-2 md:space-x-6 border-l border-white/10 pl-2 md:pl-6">
          <button 
            onClick={() => setIsScrollEnabled(!isScrollEnabled)}
            className={cn(
              "p-1 md:p-2 rounded-full transition-all duration-500",
              isScrollEnabled ? "bg-gold text-navy shadow-lg shadow-gold/20" : "text-white/40 hover:text-white"
            )}
            title={isScrollEnabled ? "Disable Scroll" : "Enable Scroll"}
          >
            <MousePointer2 size={12} className={cn("md:w-4 md:h-4", isScrollEnabled && "animate-bounce")} />
          </button>

          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 md:space-x-2 uppercase tracking-widest hover:text-gold transition-colors text-[8px] md:text-[10px] text-white"
          >
            <Globe size={12} className="md:w-3.5 md:h-3.5" />
            <span>{i18n.language.toUpperCase()}</span>
          </button>

          {isAdmin ? (
            <button 
              onClick={logout}
              className="flex items-center space-x-1 md:space-x-2 border border-gold/30 uppercase tracking-widest hover:bg-gold hover:text-navy transition-all px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] text-gold"
            >
              <LogOut size={12} className="md:w-3.5 md:h-3.5" />
              <span className="max-md:hidden">LOGOUT</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="text-white hover:text-gold transition-colors"
            >
              <LogIn size={14} className="md:w-[18px] md:h-[18px]" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button (Hidden as links are now always visible) */}
      <button 
        className="hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[70px] left-0 w-full bg-navy border-t border-white/10 px-8 py-10 flex flex-col space-y-6 text-center font-sans text-white text-[12px] tracking-[3px] uppercase z-[99]"
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
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center z-[200] p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ivory p-10 max-w-md w-full border border-gold/20 shadow-2xl"
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
                  <label className="block text-[10px] uppercase tracking-widest mb-3 text-navy/60">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/10 py-2 focus:border-gold outline-none transition-colors text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-3 text-navy/60">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/10 py-2 focus:border-gold outline-none transition-colors text-navy"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-navy text-white py-4 text-[11px] uppercase tracking-[3px] hover:bg-gold transition-colors"
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
