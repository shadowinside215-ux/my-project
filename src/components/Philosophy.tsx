import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';

export const Philosophy: React.FC = () => {
  const { state, updateImages } = useAdmin();
  const { t } = useTranslation();

  return (
    <section id="about" className="w-full bg-ivory section-divider">
      <div className="grid grid-cols-2 h-[380px] max-md:h-auto overflow-hidden">
        {/* Left Column: Text */}
        <div className="p-[60px] max-md:p-[30px] flex flex-col justify-center relative">
          <DraggableResizable id="philosophy-content">
            <div className="flex flex-col items-start">
              <div className="ornament-line mb-4" />
              <h2 className="font-serif text-[42px] max-md:text-[24px] font-normal leading-tight">
                {t('philosophy_title', 'Our Philosophy')}
              </h2>
              <p className="font-serif text-[18px] max-md:text-[14px] leading-[1.7] mt-[16px] text-[#333] max-w-[380px]">
                {t('philosophy_text', 'At MEN31, we believe in the art of timeless dressing. Our collections are crafted to embody the elegance and sophistication of the modern gentleman, combining classic design with luxurious materials.')}
              </p>
            </div>
          </DraggableResizable>
        </div>

        {/* Right Column: Image */}
        <div className="h-full max-md:h-[260px]">
          <AdminImage 
            id="philosophy-img"
            src={state.philosophyImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80'}
            alt="Our Philosophy"
            className="w-full h-full object-cover"
            onUpload={(url) => updateImages('philosophyImage', url)}
            noBorder
          />
        </div>
      </div>
    </section>
  );
};
