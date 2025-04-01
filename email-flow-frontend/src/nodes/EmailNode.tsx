import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { EmailNodeData } from '../types';

export function EmailNode({ data }: NodeProps<EmailNodeData>) {
  return (
    <div className="email-node">
      <div className="node-header">Email</div>
      <div className="node-content">
        <p>To: {data.recipient}</p>
        <p>Subject: {data.subject}</p>
        <p>Content:{data.content}</p>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}