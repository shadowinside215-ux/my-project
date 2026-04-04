import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'motion/react';
import { GripVertical, Type, Plus, Minus, RotateCcw, Maximize2 } from 'lucide-react';
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
  const layout = state.layouts[id] || { id, x: 0, y: 0, width: defaultWidth, height: defaultHeight, fontSize: 100 };
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const requestRef = useRef<number>();
  const posRef = useRef({ x: layout.x, y: layout.y });
  const sizeRef = useRef({ width: layout.width, height: layout.height });

  const handleDrag = useCallback((e: React.MouseEvent) => {
    if (!isAdmin || !containerRef.current) return;
    if ((e.target as HTMLElement).closest('button')) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = layout.x;
    const initialY = layout.y;

    setIsDragging(true);
    document.body.classList.add('admin-dragging');

    const updatePosition = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      const newX = initialX + deltaX;
      const newY = initialY + deltaY;
      
      posRef.current = { x: newX, y: newY };

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => updatePosition(moveEvent));
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.classList.remove('admin-dragging');
      updateLayout(id, { x: posRef.current.x, y: posRef.current.y });
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [isAdmin, layout.x, layout.y, id, updateLayout]);

  const handleResize = useCallback((e: React.MouseEvent) => {
    if (!isAdmin || !containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = containerRef.current.offsetWidth;
    const startHeight = containerRef.current.offsetHeight;

    setIsResizing(true);

    const updateSize = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(50, startHeight + (moveEvent.clientY - startY));
      
      sizeRef.current = { width: newWidth, height: newHeight };

      if (containerRef.current) {
        containerRef.current.style.width = `${newWidth}px`;
        containerRef.current.style.height = `${newHeight}px`;
        
        if (isText) {
          const scaleFactor = newWidth / startWidth;
          const newFontSize = Math.round((layout.fontSize || 100) * scaleFactor);
          const contentDiv = containerRef.current.querySelector('.draggable-content') as HTMLElement;
          if (contentDiv) {
            contentDiv.style.transform = `scale(${newFontSize / 100})`;
            contentDiv.style.width = `${10000 / newFontSize}%`;
            contentDiv.style.height = `${10000 / newFontSize}%`;
          }
          (containerRef.current as any)._pendingFontSize = newFontSize;
        }
      }
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => updateSize(moveEvent));
    };

    const onMouseUp = () => {
      setIsResizing(false);
      const pendingFontSize = (containerRef.current as any)?._pendingFontSize;
      updateLayout(id, { 
        width: sizeRef.current.width, 
        height: sizeRef.current.height,
        fontSize: isText && pendingFontSize ? pendingFontSize : layout.fontSize
      });
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [isAdmin, id, updateLayout]);

  const adjustFontSize = (delta: number) => {
    const currentSize = layout.fontSize || 100;
    updateLayout(id, { fontSize: Math.max(10, currentSize + delta) });
  };

  const resetLayout = () => {
    updateLayout(id, { x: 0, y: 0, width: undefined, height: undefined, fontSize: 100 });
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={isAdmin ? handleDrag : undefined}
      style={{
        transform: `translate3d(${layout.x}px, ${layout.y}px, 0)`,
        width: layout.width ? `${layout.width}px` : undefined,
        height: layout.height ? `${layout.height}px` : undefined,
        '--draggable-font-size': isText && layout.fontSize ? `${layout.fontSize}%` : undefined,
        position: 'relative',
        zIndex: isAdmin ? 100 : 'auto',
        touchAction: 'none',
        transition: (!isDragging && !isResizing) ? 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), width 0.3s cubic-bezier(0.23, 1, 0.32, 1), height 0.3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
      } as any}
      className={cn(
        className,
        "draggable-resizable-container",
        isAdmin && "hover:ring-1 hover:ring-gold/50 group cursor-move select-none",
        isDragging && "ring-2 ring-gold z-[200] shadow-2xl scale-[1.01] opacity-90",
        isResizing && "ring-2 ring-gold z-[200]"
      )}
    >
      {isAdmin && (
        <div className="absolute -top-12 left-0 flex items-center space-x-1 bg-navy/95 border border-gold/30 p-1.5 rounded-md z-[110] opacity-0 group-hover:opacity-100 transition-all pointer-events-auto shadow-2xl transform group-hover:-translate-y-1">
          <div className="p-1 text-gold/50 cursor-grab active:cursor-grabbing">
            <GripVertical size={14} />
          </div>
          
          {isText && (
            <div className="flex items-center border-l border-gold/20 pl-1 ml-1">
              <Type size={12} className="text-gold/50 mr-1" />
              <button 
                onClick={(e) => { e.stopPropagation(); adjustFontSize(-5); }}
                className="p-1 hover:bg-gold/20 rounded text-gold transition-colors"
                title="Smaller"
              >
                <Minus size={14} />
              </button>
              <div className="px-2 text-[10px] text-gold font-mono min-w-[40px] text-center">
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

          <div className="flex items-center border-l border-gold/20 pl-1 ml-1">
            <button 
              onClick={(e) => { e.stopPropagation(); resetLayout(); }}
              className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors"
              title="Reset Position"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      )}

      {isAdmin && (
        <div 
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-gold rounded-full cursor-nwse-resize z-[110] opacity-0 group-hover:opacity-100 transition-all border-2 border-navy shadow-lg flex items-center justify-center hover:scale-125"
          onMouseDown={handleResize}
        >
          <Maximize2 size={8} className="text-navy" />
        </div>
      )}
      
      <div 
        className={cn("w-full h-full origin-top-left draggable-content", isDragging && "pointer-events-none")}
        style={{ 
          transform: layout.fontSize ? `scale(${layout.fontSize / 100})` : 'scale(1)',
          width: layout.fontSize ? `${10000 / layout.fontSize}%` : '100%',
          height: layout.fontSize ? `${10000 / layout.fontSize}%` : '100%',
        } as any}
      >
        {children}
      </div>

      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-gold/30 pointer-events-none" />
      )}
    </div>
  );
};
