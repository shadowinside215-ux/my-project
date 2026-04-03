import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminImage } from './AdminImage';
import { useAdmin } from '../AdminContext';
import { Instagram, Facebook, Phone, MessageCircle, Mail, Crown } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages, isAdmin, updateImages: updateSettings } = useAdmin();

  return (
    <footer id="contact" className="bg-navy text-ivory py-16 px-8 border-t border-gold/20">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Column 1: Brand */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="flex items-center space-x-4">
            <AdminImage 
              id="footer-logo-img"
              src={state.footerLogo}
              alt="Footer Logo"
              className="w-20 h-20"
              onUpload={(url) => updateImages('footerLogo', url)}
              noBorder
            />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-serif text-platinum tracking-widest leading-none">MEN</span>
              <span className="text-2xl font-serif text-gold tracking-widest leading-none">31</span>
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-light text-center md:text-left">
            Vêtements Intemporels
          </p>
        </div>

        {/* Column 2: Contact & Map */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <h4 className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-2">Contact Us</h4>
          <div className="flex flex-col items-center space-y-4 text-[10px] uppercase tracking-[0.2em] font-light w-full">
            <div className="flex items-center space-x-3">
              <Mail size={12} className="text-gold" />
              {isAdmin ? (
                <input 
                  type="text" 
                  value={state.contactEmail} 
                  onChange={(e) => updateSettings('contactEmail', e.target.value)}
                  className="bg-transparent border-b border-gold/20 outline-none focus:border-gold"
                />
              ) : (
                <span>{state.contactEmail}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={12} className="text-gold" />
              {isAdmin ? (
                <input 
                  type="text" 
                  value={state.contactPhone} 
                  onChange={(e) => updateSettings('contactPhone', e.target.value)}
                  className="bg-transparent border-b border-gold/20 outline-none focus:border-gold"
                />
              ) : (
                <span>{state.contactPhone}</span>
              )}
            </div>
            
            {/* Google Maps Embed */}
            <div className="w-full h-32 rounded-lg overflow-hidden luxury-border mt-4 relative">
              <iframe 
                src={state.googleMapsEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {isAdmin && (
                <div className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <input 
                    type="text" 
                    placeholder="Paste Google Maps Embed URL"
                    value={state.googleMapsEmbed}
                    onChange={(e) => updateSettings('googleMapsEmbed', e.target.value)}
                    className="w-4/5 text-[8px] bg-ivory text-navy px-2 py-1 rounded outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col items-center md:items-end justify-center space-y-6">
          <h4 className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-2">Follow Us</h4>
          <div className="flex space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <a href={state.instagramLink} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors p-2 border border-gold/20 rounded-full">
                <Instagram size={18} />
              </a>
              {isAdmin && (
                <input 
                  type="text" 
                  value={state.instagramLink} 
                  onChange={(e) => updateSettings('instagramLink', e.target.value)}
                  className="text-[6px] bg-transparent border-b border-gold/20 outline-none w-20 text-center"
                />
              )}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <a href={state.facebookLink} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors p-2 border border-gold/20 rounded-full">
                <Facebook size={18} />
              </a>
              {isAdmin && (
                <input 
                  type="text" 
                  value={state.facebookLink} 
                  onChange={(e) => updateSettings('facebookLink', e.target.value)}
                  className="text-[6px] bg-transparent border-b border-gold/20 outline-none w-20 text-center"
                />
              )}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <a href={`https://wa.me/${state.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors p-2 border border-gold/20 rounded-full">
                <MessageCircle size={18} />
              </a>
              {isAdmin && (
                <input 
                  type="text" 
                  value={state.whatsappNumber} 
                  onChange={(e) => updateSettings('whatsappNumber', e.target.value)}
                  className="text-[6px] bg-transparent border-b border-gold/20 outline-none w-20 text-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gold/10 text-center">
        <p className="text-[8px] uppercase tracking-[0.5em] text-ivory/40">
          © {new Date().getFullYear()} MEN31. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
