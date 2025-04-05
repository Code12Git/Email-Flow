import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
} from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../redux/actionTypes/actionTypes';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
}) {
  const dispatch = useDispatch();

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleOpenModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        modalType: 'delay-task',
        nodeId: source,
        position: { x: labelX, y: labelY },
      },
    });
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
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
        >
          +
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
