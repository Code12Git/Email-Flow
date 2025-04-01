import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { LeadSourceNodeData } from '../types';

export function SourceNode({ data }: NodeProps<LeadSourceNodeData>) {
  return (
    <div className="lead-node">
      <div className="node-header">Lead Source</div>
      <div className="node-content">
        <p>From: {data.source}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}