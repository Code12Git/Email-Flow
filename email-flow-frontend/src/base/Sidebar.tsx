import React from 'react';
import { useDnD } from '../context/DnDContext';

export default function Sidebar() {
  const { setType } = useDnD();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: 'email' | 'wait' | 'source') => {
    setType(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-60 p-4 border-r border-gray-200 bg-white">
      <div className="mb-4 text-sm text-gray-500">
        Drag nodes to the canvas to build your email sequence
      </div>
      <div
        className="p-3 mb-2 border border-gray-200 rounded cursor-grab bg-white"
        onDragStart={(event) => onDragStart(event, 'email')}
        draggable
      >
        ✉️ Cold Email
      </div>
      <div
        className="p-3 mb-2 border border-gray-200 rounded cursor-grab bg-white"
        onDragStart={(event) => onDragStart(event, 'wait')}
        draggable
      >
        ⏳ Wait/Delay
      </div>
      <div
        className="p-3 mb-2 border border-gray-200 rounded cursor-grab bg-white"
        onDragStart={(event) => onDragStart(event, 'source')}
        draggable
      >
        📌 Lead Source
      </div>
    </aside>
  );
}