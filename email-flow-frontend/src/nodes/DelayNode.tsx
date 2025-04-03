import { Handle, Position, NodeProps } from 'reactflow';

type DelayNodeData = {
  days?: number;
  hours?: number;
  minutes?: number;
};

export default function DelayNode({ data }: NodeProps<DelayNodeData>) {
  return (
    <div className="p-4 bg-white border border-purple-200 rounded-lg shadow-sm w-48">
      <div className="flex items-center mb-2">
        <div className="mr-2">⏳</div>
        <div className="font-medium">Wait/Delay</div>
      </div>
      <div className="text-xs">
        {data?.days || 0}d {data?.hours || 0}h {data?.minutes || 0}m
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}