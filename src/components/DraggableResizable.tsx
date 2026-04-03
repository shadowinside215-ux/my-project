import React, { useRef } from 'react';
import { motion, useDragControls } from 'motion/react';
import { GripVertical, Type, Plus, Minus } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { cn } from '../lib/utils';

interface DraggableResizableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  isText?: boolean;
}

export const DraggableResizable: React.FC<DraggableResizableProps> = ({ 
  id, 
  children, 
  className,
  defaultWidth,
  defaultHeight,
  isText = true
}) => {
  const { isAdmin, state, updateLayout } = useAdmin();
  const dragControls = useDragControls();
  const layout = state.layouts[id] || { id, x: 0, y: 0, width: defaultWidth, height: defaultHeight, fontSize: 100 };
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: any, info: any) => {
    if (!isAdmin) return;
    updateLayout(id, { x: layout.x + info.offset.x, y: layout.y + info.offset.y });
  };

  const handleResize = (e: React.MouseEvent) => {
    if (!isAdmin || !containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = containerRef.current.offsetWidth;
    const startHeight = containerRef.current.offsetHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      
      if (containerRef.current) {
        containerRef.current.style.width = `${newWidth}px`;
        containerRef.current.style.height = `${newHeight}px`;
      }
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      const newWidth = startWidth + (upEvent.clientX - startX);
      const newHeight = startHeight + (upEvent.clientY - startY);
      updateLayout(id, { width: newWidth, height: newHeight });
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const adjustFontSize = (delta: number) => {
    const currentSize = layout.fontSize || 100;
    updateLayout(id, { fontSize: Math.max(10, currentSize + delta) });
  };

  return (
    <motion.div
      ref={containerRef}
      drag={isAdmin}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
        '--draggable-font-size': isText && layout.fontSize ? `${layout.fontSize}%` : undefined,
        position: 'relative',
        zIndex: isAdmin ? 100 : 'auto',
      } as any}
      className={cn(
        className,
        "draggable-resizable-container",
        isAdmin && "hover:outline hover:outline-1 hover:outline-gold/50 group cursor-move select-none"
      )}
    >
      {isAdmin && (
        <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-navy/95 border border-gold/30 p-1.5 rounded-md z-[110] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto shadow-2xl">
          <div className="p-1 text-gold/50">
            <GripVertical size={14} />
          </div>
          
          {isText && (
            <div className="flex items-center border-l border-gold/20 pl-1 ml-1">
              <button 
                onClick={(e) => { e.stopPropagation(); adjustFontSize(-5); }}
                className="p-1 hover:bg-gold/20 rounded text-gold transition-colors"
                title="Smaller"
              >
                <Minus size={14} />
              </button>
              <div className="px-2 text-[10px] text-gold font-mono min-w-[35px] text-center">
                {layout.fontSize || 100}%
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); adjustFontSize(5); }}
                className="p-1 hover:bg-gold/20 rounded text-gold transition-colors"
                title="Bigger"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <div 
          className="absolute -bottom-1 -right-1 w-3 h-3 bg-gold rounded-full cursor-nwse-resize z-[110] opacity-0 group-hover:opacity-100 transition-opacity border border-navy shadow-sm"
          onMouseDown={handleResize}
        />
      )}
      
      <div className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
