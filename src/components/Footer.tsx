import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { Crown, Instagram, Facebook } from 'lucide-react';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';
import { cn } from '../lib/utils';

export const Footer: React.FC = () => {
  const { state, updateImages, isMobile } = useAdmin();
  const { t } = useTranslation();

  return (
    <footer className={cn(
      "w-full bg-navy text-white",
      !isMobile ? "p-[50px] px-[60px]" : "px-[24px] py-[20px]"
    )}>
      <div className="max-w-[1800px] mx-auto grid grid-cols-3 gap-12 max-md:gap-4 max-md:text-center">
        {/* Left: Brand */}
        <div className="flex flex-col max-md:items-center">
          <DraggableResizable id="footer-brand">
            <div className="flex flex-col items-start max-md:items-center">
              <div className="flex items-center space-x-2 mb-2">
                <AdminImage 
                  id="footer-logo-img"
                  src={state.footerLogo || state.logoImage}
                  alt="Footer Logo"
                  className="w-8 h-8"
                  onUpload={(url) => updateImages('footerLogo', url)}
                  noBorder
                />
                <span className="font-serif text-white text-[20px] tracking-tight">MEN31</span>
              </div>
              <p className="font-sans text-[11px] tracking-[2px] text-gold uppercase">
                {t('footer_tagline', 'Vêtements Intemporels')}
              </p>
            </div>
          </DraggableResizable>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col max-md:items-center">
          <DraggableResizable id="footer-links">
            <div className="flex flex-col items-start max-md:items-center">
              <h3 className="font-sans text-[12px] tracking-[2px] uppercase mb-4 text-white">Quick Links</h3>
              <div className="flex flex-col space-y-2 font-serif text-[14px] text-[#ccc]">
                <a href="#" className="hover:text-gold transition-colors">Home</a>
                <a href="#collection" className="hover:text-gold transition-colors">Collection</a>
                <a href="#about" className="hover:text-gold transition-colors">About</a>
                <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
              </div>
            </div>
          </DraggableResizable>
        </div>

        {/* Right: Contact */}
        <div className="flex flex-col max-md:items-center">
          <DraggableResizable id="footer-contact">
            <div className="flex flex-col items-start max-md:items-center">
              <h3 className="font-sans text-[12px] tracking-[2px] uppercase mb-4 text-white">Contact</h3>
              <div className="flex flex-col space-y-2 font-serif text-[14px] text-[#ccc]">
                <a href={`mailto:${state.contactEmail || 'dragonballsam86@gmail.com'}`} className="hover:text-gold transition-colors">
                  {state.contactEmail || 'dragonballsam86@gmail.com'}
                </a>
                <a href={`tel:${state.contactPhone || '+212 6 61 26 09 54'}`} className="hover:text-gold transition-colors">
                  {state.contactPhone || '+212 6 61 26 09 54'}
                </a>
                <div className="flex items-center space-x-4 mt-4">
                  <a href={state.instagramLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    <Instagram size={16} />
                  </a>
                  <a href={state.facebookLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    <Facebook size={16} />
                  </a>
                  <a href={`https://wa.me/${(state.contactPhone || '+212661260954').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.634 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </DraggableResizable>
        </div>
      </div>
    </footer>
  );
};
