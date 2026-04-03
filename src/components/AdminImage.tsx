import React, { useState } from 'react';
import { Upload, Loader2, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { DraggableResizable } from './DraggableResizable';
import { useAdmin } from '../AdminContext';
import { cn } from '../lib/utils';

interface AdminImageProps {
  id: string;
  src: string;
  alt: string;
  className?: string;
  onUpload: (url: string) => void;
  onDelete?: () => void;
  onClick?: () => void;
  aspectRatio?: string;
  noBorder?: boolean;
}

export const AdminImage: React.FC<AdminImageProps> = ({ 
  id, 
  src, 
  alt, 
  className, 
  onUpload,
  onDelete,
  onClick,
  aspectRatio = "aspect-square",
  noBorder = false
}) => {
  const { isAdmin } = useAdmin();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          onUpload(data.url);
        } else {
          throw new Error('Server returned non-JSON response');
        }
      } else {
        // Fallback to base64 if server upload fails
        const reader = new FileReader();
        reader.onloadend = () => {
          onUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback to base64 on network error
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <DraggableResizable id={id} className={cn("relative group", className)}>
      <div className={cn("relative w-full h-full overflow-hidden", !noBorder && "luxury-border")}>
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className={cn("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105", onClick && "cursor-pointer")}
            referrerPolicy="no-referrer"
            onClick={!isAdmin ? onClick : undefined}
          />
        ) : (
          <div className="w-full h-full bg-platinum/10 flex flex-col items-center justify-center text-charcoal/30 group-hover:bg-platinum/20 transition-colors">
            {isAdmin ? (
              <>
                <Plus size={32} strokeWidth={1} className="text-gold" />
                <span className="text-[10px] uppercase tracking-widest mt-2 text-gold">Add Photo</span>
              </>
            ) : (
              <>
                <ImageIcon size={32} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-widest mt-2">Empty Slot</span>
              </>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-20">
            {uploading ? (
              <Loader2 size={24} className="animate-spin text-gold" />
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload size={24} className="text-gold mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-ivory">Click to Upload</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
                {src && onDelete && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="flex flex-col items-center justify-center text-red-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                    <span className="text-[8px] uppercase tracking-widest mt-1">Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </DraggableResizable>
  );
};
