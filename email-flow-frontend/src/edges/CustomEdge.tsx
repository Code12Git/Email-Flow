import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  EdgeProps,
} from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../redux/actionTypes/actionTypes';
import DelayTaskModal from '../ui/modal/DelayTaskModal';
import { useState } from 'react';

interface CustomEdgeData {
  id: string;
  source: string;
  target: string;
  [key: string]: unknown;
}

interface ModalPayload {
  modalType: string;
  nodeId: string;
  position: {
    x: number;
    y: number;
  };
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  markerEnd,
  markerStart,
  style,
  interactionWidth,
}: EdgeProps<CustomEdgeData>) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Corrected getStraightPath call - only includes the required parameters
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch({
      type: OPEN_MODAL,
      payload: {
        modalType: 'delay-task',
        nodeId: source,
        position: { x: labelX, y: labelY },
      } as ModalPayload,
    });
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
        <DelayTaskModal 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen}
          edge={true}
        />
      </EdgeLabelRenderer>
    </>
  );
}