import { Handle, Position, NodeProps } from 'reactflow';

type EmailNodeData = {
  subject?: string;
  body?: string;
  from?: string;
};

export default function EmailNode({ data }: NodeProps<EmailNodeData>) {
  
  return (
    <div className="p-4 bg-white border border-blue-200 rounded-lg shadow-sm w-48">
      <div className="flex items-center mb-2">
        <div className="mr-2">✉️</div>
        <div className="font-medium">Cold Email</div>
      </div>
      {data.subject && (
        <div className="text-xs truncate" title={data.subject}>
          Subject: {data.subject}
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}