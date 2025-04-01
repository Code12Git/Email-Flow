import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DelayNodeData } from '../types';

export function DelayNode({ data }: NodeProps<DelayNodeData>) {
  return (
    <div className="delay-node">
      <div className="node-header">Wait</div>
      <div className="node-content">
        <p>{data.delayHours} hours</p>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}