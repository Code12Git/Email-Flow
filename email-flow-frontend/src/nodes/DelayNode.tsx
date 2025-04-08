import { useDispatch } from 'react-redux';
import { Handle, Position, NodeProps } from 'reactflow';
import { deleteNode } from '../redux/action/nodes';
import { AppDispatch } from '../redux/store';

type DelayNodeData = {
  nodeId: string;
  days?: number;
  time:{
    hours?: number;
    minutes?: number;
  }
};

export default function DelayNode({ data }: NodeProps<DelayNodeData>) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteNode(data.nodeId))
  }

  return (
    <div className="p-4 bg-white border border-purple-200 rounded-lg shadow-sm w-48">
      <div className="flex items-center mb-2 gap-5">
        <div className='flex items-center '>
        <div className="mr-2">⏳</div>
        <div className="font-medium">Wait/Delay</div>
        </div>
        <div>
        <div>
          <button
          className='cursor-pointer'
            onClick={handleDelete}
          >
            ❌
          </button>
        </div>
      </div>
      </div>
      <div className="text-xs">
        {data?.days || 0}d {data?.time?.hours || 0}h {data?.time?.minutes || 0}m
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}