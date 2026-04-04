import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { Crown, Instagram, Facebook } from 'lucide-react';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';

export const Footer: React.FC = () => {
  const { state, updateImages } = useAdmin();
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-navy text-white p-[50px] px-[60px] max-md:px-[24px] max-md:py-[40px]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-3 gap-12 max-md:gap-6 max-md:text-center">
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
                </div>
              </div>
            </div>
          </DraggableResizable>
        </div>
      </div>
    </footer>
  );
};
