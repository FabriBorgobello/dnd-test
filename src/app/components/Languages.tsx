'use client';
import { useId, useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import { arrayMove } from '@dnd-kit/sortable';
import { type Language, type Container } from '../types';

export function Languages() {
  const [languages, setLanguages] = useState(LANGUAGES);
  const id = useId();

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
    const { active, over } = event;

    // Early returns
    if (!over || active.id === over.id) return;

    // Get the current element
    const activeData = active.data.current;
    if (!activeData) return;

    // Get the over element
    const overData = over.data.current;
    if (!overData) return;

    const oldType = activeData.type;
    const newType = overData.id;

    if (oldType === newType) return;

    setLanguages((prevLanguages) => {
      const oldIndex = prevLanguages.findIndex(
        (language) => language.id === activeData.id,
      );
      const newIndex = prevLanguages.findIndex(
        (language) => language.id === overData.id,
      );

      const newLanguages = arrayMove(prevLanguages, oldIndex, newIndex);

      return newLanguages.map((language) => {
        if (language.id === activeData.id) {
          return { ...language, type: newType };
        }

        if (language.id === overData.id) {
          return { ...language, type: oldType };
        }

        return language;
      });
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd} id={id}>
      <div className="p-4 flex justify-between border-2 gap-4">
        {CONTAINERS.map((c) => (
          <Droppable key={c.id} data={c}>
            <h2 className="text-xl">{c.name}</h2>
            {languages
              .filter((lang) => lang.type === c.id)
              .map((language) => (
                <Draggable key={language.id} data={language}>
                  {language.id} - {language.name}
                </Draggable>
              ))}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}

const LANGUAGES: Language[] = [
  { id: 1, name: 'JavaScript', type: 'frontend' },
  { id: 2, name: 'TypeScript', type: 'frontend' },
  { id: 3, name: 'Python', type: 'backend' },
  { id: 4, name: 'Java', type: 'backend' },
  { id: 5, name: 'C#', type: 'backend' },
  { id: 6, name: 'SQL', type: 'database' },
  { id: 7, name: 'NoSQL', type: 'database' },
];

const CONTAINERS: Container[] = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Database' },
];
