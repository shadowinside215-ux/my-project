import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../AdminContext';
import { AdminImage } from './AdminImage';
import { DraggableResizable } from './DraggableResizable';
import { cn } from '../lib/utils';

export const Lookbook: React.FC = () => {
  const { state, updateImages, isMobile } = useAdmin();
  const { t } = useTranslation();
  const categoriesToShow = ['T-Shirts', 'Hoodies', 'Pants'];

  return (
    <section id="lookbook" className={cn(
      "w-full bg-ivory section-divider overflow-hidden",
      !isMobile ? "p-[100px]" : "px-[24px] py-[40px]"
    )}>
      <div className="max-w-[1400px] mx-auto flex justify-center">
        <DraggableResizable id="lookbook-combined" isText={false}>
          <div className="flex flex-col items-center w-full h-full">
            <h2 className={cn(
              "font-serif font-normal text-center mb-12",
              !isMobile ? "text-[42px]" : "text-[24px]"
            )}>
              {t('lookbook_title', 'Crafted for the Modern Gentleman')}
            </h2>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Left Image */}
              <div className={cn(
                "absolute transition-transform duration-500 hover:z-20",
                !isMobile ? "w-[30%] aspect-[3/4] left-0 -translate-x-4 translate-y-8" : "w-[30%] aspect-[3/4] left-0 translate-y-4"
              )}>
                <AdminImage 
                  id={`cat-img-${categoriesToShow[0]}`}
                  src={state.categoryImages?.[categoriesToShow[0]] || ''}
                  alt={categoriesToShow[0]}
                  className="w-full h-full object-cover shadow-xl"
                  onUpload={(url) => updateImages('categoryImages', { ...state.categoryImages, [categoriesToShow[0]]: url })}
                  noBorder
                  isDraggable={false}
                />
              </div>

              {/* Middle Image (Main) */}
              <div className={cn(
                "relative z-10 transition-transform duration-500 hover:scale-105",
                !isMobile ? "w-[40%] aspect-[3/4]" : "w-[45%] aspect-[3/4]"
              )}>
                <AdminImage 
                  id={`cat-img-${categoriesToShow[1]}`}
                  src={state.categoryImages?.[categoriesToShow[1]] || ''}
                  alt={categoriesToShow[1]}
                  className="w-full h-full object-cover shadow-2xl border-4 border-white"
                  onUpload={(url) => updateImages('categoryImages', { ...state.categoryImages, [categoriesToShow[1]]: url })}
                  noBorder
                  isDraggable={false}
                />
              </div>

              {/* Right Image */}
              <div className={cn(
                "absolute transition-transform duration-500 hover:z-20",
                !isMobile ? "w-[30%] aspect-[3/4] right-0 translate-x-4 translate-y-8" : "w-[30%] aspect-[3/4] right-0 translate-y-4"
              )}>
                <AdminImage 
                  id={`cat-img-${categoriesToShow[2]}`}
                  src={state.categoryImages?.[categoriesToShow[2]] || ''}
                  alt={categoriesToShow[2]}
                  className="w-full h-full object-cover shadow-xl"
                  onUpload={(url) => updateImages('categoryImages', { ...state.categoryImages, [categoriesToShow[2]]: url })}
                  noBorder
                  isDraggable={false}
                />
              </div>
            </div>
          </div>
        </DraggableResizable>
      </div>
    </section>
  );
};
