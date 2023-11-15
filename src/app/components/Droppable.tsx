'use client';
import { useDroppable } from '@dnd-kit/core';
import { type Container } from './Languages';

interface DroppableProps {
  children: React.ReactNode;
  data: Container;
}

export function Droppable({ children, data }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({ id: data.id.toString(), data });

  return (
    <div
      ref={setNodeRef}
      style={{ color: isOver ? 'green' : undefined }}
      className="flex flex-col items-center border-2 flex-1"
    >
      {children}
    </div>
  );
}
