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
        position: isAdmin ? 'relative' : 'static',
      }}
      className={cn(
        className,
        isAdmin && "admin-dashed-border group"
      )}
    >
      {isAdmin && (
        <>
          <div 
            className="move-handle"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <GripVertical size={16} />
          </div>
          <div 
            className="resize-handle opacity-0 group-hover:opacity-100"
            onMouseDown={handleResize}
          />
        </>
      )}
      {children}
    </motion.div>
  );
};
