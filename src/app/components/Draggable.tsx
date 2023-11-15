'use client';
import { useDraggable } from '@dnd-kit/core';
import { Language } from '../types';

interface DraggableProps {
  data: Language;
  children: React.ReactNode;
}

export function Draggable({ data, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id.toString(),
    data,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      className="w-full"
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
