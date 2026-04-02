import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';
import { Instagram, Facebook, Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-ivory pt-32 pb-12 px-6 border-t border-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          <DraggableResizable id="footer-brand">
            <div>
              <h3 className="text-2xl font-serif text-navy mb-6">MEN 31</h3>
              <p className="text-sm text-navy/60 leading-relaxed max-w-xs">
                {t('tagline')}
                <br /><br />
                {t('location')}
              </p>
            </div>
          </DraggableResizable>

          <DraggableResizable id="footer-links">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold mb-8">{t('quick_links')}</h4>
              <ul className="space-y-4 text-sm uppercase tracking-widest font-medium">
                <li><a href="#collection" className="hover:text-gold transition-colors">{t('collection')}</a></li>
                <li><a href="#philosophy" className="hover:text-gold transition-colors">{t('philosophy')}</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">{t('contact')}</a></li>
              </ul>
            </div>
          </DraggableResizable>

          <DraggableResizable id="footer-social">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold mb-8">{t('showroom')}</h4>
              <div className="flex space-x-6 mb-8">
                <a href="https://www.instagram.com/c8__men.s_wear__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://web.facebook.com/profile.php?id=100083246295413" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="tel:0661260954" className="text-navy hover:text-gold transition-colors">
                  <Phone size={20} />
                </a>
              </div>
              <p className="text-sm font-medium text-navy">06 61 26 09 54</p>
            </div>
          </DraggableResizable>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gold/10 text-[10px] uppercase tracking-[0.3em] text-navy/40">
          <p>© 2026 MEN 31. All Rights Reserved.</p>
          <p>Designed for Excellence.</p>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/212661260954" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[150]"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
};
