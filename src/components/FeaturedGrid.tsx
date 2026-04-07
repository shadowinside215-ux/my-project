import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';
import { cn } from '../lib/utils';

export const NewCollection: React.FC = () => {
  const { state, updateImages, setIsScrollEnabled, isMobile } = useAdmin();
  const { t } = useTranslation();

  return (
    <section id="collection" className="w-full bg-ivory section-divider">
      <div className={cn(
        "grid grid-cols-2 overflow-hidden",
        !isMobile ? "h-[420px]" : "h-[220px]"
      )}>
        {/* Left Column: Text */}
        <div className="p-[60px] max-md:p-[30px] flex flex-col justify-center relative">
          <DraggableResizable id="new-collection-content">
            <div className="flex flex-col items-start">
              <div className="ornament-line mb-4" />
              <h2 className="font-serif text-[42px] max-md:text-[24px] font-normal leading-tight">
                {t('new_collection_title', 'New Collection')}
              </h2>
              <p className="font-sans text-[11px] tracking-[3px] mt-[12px] text-[#555] uppercase max-md:text-[9px]">
                {t('new_collection_subtitle', 'LUXURY ESSENTIALS FOR THE MODERN GENTLEMAN')}
              </p>
              <button 
                onClick={() => window.location.href = 'https://men31-clothes.netlify.app/'}
                className="mt-[24px] font-sans text-[11px] tracking-[3px] border-[1.5px] border-navy bg-transparent text-navy px-[24px] py-[12px] w-fit hover:bg-navy hover:text-white transition-all duration-500"
              >
                {t('new_collection_cta', 'VIEW COLLECTION')}
              </button>
            </div>
          </DraggableResizable>
        </div>

        {/* Right Column: Image */}
        <div className="h-full max-md:h-[280px]">
          <AdminImage 
            id="new-collection-img"
            src={state.newCollectionImage || 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80'}
            alt="New Collection"
            className="w-full h-full object-cover"
            onUpload={(url) => updateImages('newCollectionImage', url)}
            noBorder
          />
        </div>
      </div>
    </section>
  );
};
