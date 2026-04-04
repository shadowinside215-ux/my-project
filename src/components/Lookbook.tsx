import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';

export const Lookbook: React.FC = () => {
  const { state, updateImages } = useAdmin();
  const { t } = useTranslation();
  const categoriesToShow = ['T-Shirts', 'Hoodies', 'Pants'];

  return (
    <section id="lookbook" className="w-full bg-ivory p-[60px] max-md:px-[24px] max-md:py-[40px] section-divider">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex justify-center mb-[40px]">
          <DraggableResizable id="lookbook-title">
            <h2 className="font-serif text-[38px] font-normal text-center">
              {t('lookbook_title', 'Crafted for the Modern Gentleman')}
            </h2>
          </DraggableResizable>
        </div>
        
        <div className="grid grid-cols-3 gap-[20px] max-md:gap-[10px]">
          {categoriesToShow.map((category) => (
            <div key={category} className="h-[300px] max-md:h-[150px]">
              <AdminImage 
                id={`cat-img-${category}`}
                src={state.categoryImages?.[category] || ''}
                alt={category}
                className="w-full h-full object-cover"
                onUpload={(url) => updateImages('categoryImages', { ...state.categoryImages, [category]: url })}
                noBorder
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
