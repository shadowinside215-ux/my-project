import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { LogIn, LogOut, Globe, Menu, X } from 'lucide-react';
import { DraggableResizable } from './DraggableResizable';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAdmin, login, logout, state } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setShowLogin(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-ivory/90 backdrop-blur-md z-[100] border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <DraggableResizable id="nav-logo">
          <div className="flex flex-col">
            <h1 className="text-3xl font-serif font-bold tracking-tighter text-navy">MEN 31</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
              {t('tagline')}
            </p>
          </div>
        </DraggableResizable>

        <div className="hidden md:flex items-center space-x-12">
          <DraggableResizable id="nav-links">
            <div className="flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
              <a href="#collection" className="hover:text-gold transition-colors">{t('collection')}</a>
              <a href="#philosophy" className="hover:text-gold transition-colors">{t('philosophy')}</a>
              <a href="#contact" className="hover:text-gold transition-colors">{t('contact')}</a>
            </div>
          </DraggableResizable>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest hover:text-gold transition-colors"
            >
              <Globe size={14} />
              <span>{i18n.language.toUpperCase()}</span>
            </button>

            {isAdmin ? (
              <button 
                onClick={logout}
                className="flex items-center space-x-2 bg-navy text-ivory px-4 py-2 text-xs uppercase tracking-widest hover:bg-navy-light transition-colors"
              >
                <LogOut size={14} />
                <span>{t('admin_logout')}</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="text-navy hover:text-gold transition-colors"
              >
                <LogIn size={20} />
              </button>
            )}
          </div>
        </div>

        <button className="md:hidden text-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className="md:hidden bg-ivory border-b border-gold/20 px-6 py-8 flex flex-col space-y-6 text-center uppercase tracking-widest text-sm font-medium"
          >
            <a href="#collection" onClick={() => setIsMenuOpen(false)}>{t('collection')}</a>
            <a href="#philosophy" onClick={() => setIsMenuOpen(false)}>{t('philosophy')}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t('contact')}</a>
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
          <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm flex items-center justify-center z-[200] p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ivory p-8 max-w-md w-full border border-gold shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-navy">Admin Access</h2>
                <button onClick={() => setShowLogin(false)}><X /></button>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-navy/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-navy text-ivory py-4 uppercase tracking-[0.2em] text-xs hover:bg-navy-light transition-colors"
                >
                  Enter Dashboard
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
