import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  EdgeProps,
} from '@xyflow/react';

import { useState } from 'react';
import EmailTimeModal from '../ui/modal/EmailTimeModal';




export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  markerStart,
  style,
  interactionWidth,
}: EdgeProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={style as React.CSSProperties | undefined}
        markerEnd={markerEnd}
        markerStart={markerStart}
        interactionWidth={interactionWidth}
      />
      <EdgeLabelRenderer>
        <button
          onClick={handleOpenModal}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            background: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            fontSize: '18px',
            cursor: 'pointer',
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Add edge connection"
        >
          +
        </button>
        <EmailTimeModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </EdgeLabelRenderer>
    </>
  );
}