import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminImage } from './AdminImage';
import { useAdmin } from '../AdminContext';
import { Instagram, Facebook, Phone, MessageCircle, Mail, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { state, updateImages, isAdmin, updateImages: updateSettings, isScrollEnabled, isMobile } = useAdmin();

  const showCompact = isMobile || !isScrollEnabled;

  return (
    <footer id="contact" className={cn(
      "bg-navy text-ivory border-t border-gold/20 transition-all duration-700",
      showCompact ? "flex-1 min-h-0 py-2 px-4" : "py-16 px-8"
    )}>
      <div className={cn(
        "max-w-[1800px] mx-auto grid h-full items-center transition-all duration-700",
        showCompact ? "grid-cols-2 gap-2" : "grid-cols-1 md:grid-cols-3 gap-8"
      )}>
        {/* Column 1: Brand */}
        <div className={cn(
          "flex flex-col transition-all duration-700",
          showCompact ? "space-y-1 items-start" : "space-y-6 items-center md:items-start"
        )}>
          <div className="flex items-center space-x-2 md:space-x-4">
            <AdminImage 
              id="footer-logo-img"
              src={state.footerLogo || state.logoImage}
              alt="Footer Logo"
              className={cn(
                "transition-all duration-700",
                showCompact ? "w-8 h-8" : "w-20 h-20"
              )}
              onUpload={(url) => updateImages('footerLogo', url)}
              noBorder
            />
            <div className="flex flex-col -space-y-1">
              <span className={cn(
                "font-serif text-platinum tracking-widest leading-none transition-all duration-700",
                showCompact ? "text-sm" : "text-xl"
              )}>MEN</span>
              <span className={cn(
                "font-serif text-gold tracking-widest leading-none transition-all duration-700",
                showCompact ? "text-base" : "text-2xl"
              )}>31</span>
            </div>
          </div>
          {!showCompact && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-light text-center md:text-left">
              Vêtements Intemporels
            </p>
          )}
        </div>

        {/* Column 2: Contact */}
        <div className={cn(
          "flex flex-col transition-all duration-700",
          showCompact ? "space-y-1 items-end" : "space-y-6 items-center justify-center"
        )}>
          {!showCompact && (
            <h4 className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-2">Contact Us</h4>
          )}
          <div className={cn(
            "flex flex-col uppercase tracking-[0.2em] font-light w-full transition-all duration-700",
            showCompact ? "space-y-1 text-[8px] items-end" : "space-y-4 text-[10px] items-center"
          )}>
            <div className="flex items-center space-x-3">
              <Mail size={showCompact ? 10 : 12} className="text-gold" />
              {isAdmin && !showCompact ? (
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
              <Phone size={showCompact ? 10 : 12} className="text-gold" />
              {isAdmin && !showCompact ? (
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
          </div>
        </div>

        {/* Column 3: Socials & Map (Hidden in compact mobile view) */}
        {!showCompact && (
          <div className="flex flex-col items-center md:items-end justify-center space-y-6">
            <h4 className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-2">Follow Us</h4>
            <div className="flex space-x-6">
              <a href={state.instagramLink} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors border border-gold/20 rounded-full p-2">
                <Instagram size={18} />
              </a>
              <a href={state.facebookLink} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors border border-gold/20 rounded-full p-2">
                <Facebook size={18} />
              </a>
              <a href={`https://wa.me/${state.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors border border-gold/20 rounded-full p-2">
                <MessageCircle size={18} />
              </a>
            </div>
            
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
        )}
      </div>

      {!showCompact && (
        <div className="mt-16 pt-8 border-t border-gold/10 text-center">
          <p className="text-[8px] uppercase tracking-[0.5em] text-ivory/40">
            © {new Date().getFullYear()} MEN31. All Rights Reserved.
          </p>
        </div>
      )}
    </footer>
  );
};
