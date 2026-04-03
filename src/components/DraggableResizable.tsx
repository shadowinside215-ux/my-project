import React, { useRef, useEffect } from 'react';
import { motion, useDragControls } from 'motion/react';
import { GripVertical } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { cn } from '../lib/utils';

interface DraggableResizableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
}

export const DraggableResizable: React.FC<DraggableResizableProps> = ({ 
  id, 
  children, 
  className,
  defaultWidth,
  defaultHeight
}) => {
  const { isAdmin, state, updateLayout } = useAdmin();
  const dragControls = useDragControls();
  const layout = state.layouts[id] || { id, x: 0, y: 0, width: defaultWidth, height: defaultHeight };
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: any, info: any) => {
    if (!isAdmin) return;
    updateLayout(id, { x: layout.x + info.offset.x, y: layout.y + info.offset.y });
  };

  const handleResize = (e: React.MouseEvent) => {
    if (!isAdmin || !containerRef.current) return;
    e.preventDefault();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = containerRef.current.offsetWidth;
    const startHeight = containerRef.current.offsetHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      updateLayout(id, { width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.div
      ref={containerRef}
      drag={isAdmin}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
        position: 'relative',
        zIndex: isAdmin ? 100 : 'auto',
      }}
      className={cn(
        className,
        isAdmin && "hover:outline hover:outline-1 hover:outline-gold/50 group"
      )}
    >
      {isAdmin && (
        <>
          {/* Move Handle */}
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold text-navy p-1 rounded-t-md cursor-move z-[110] opacity-0 group-hover:opacity-100 transition-opacity"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <GripVertical size={12} />
          </div>
          
          {/* Resize Scale Circle */}
          <div 
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-gold rounded-full cursor-nwse-resize z-[110] opacity-0 group-hover:opacity-100 transition-opacity border border-navy shadow-sm"
            onMouseDown={handleResize}
          />
        </>
      )}
      {children}
    </motion.div>
  );
};
