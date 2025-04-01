import { ReactFlow, Controls, addEdge } from '@xyflow/react';
import { useCallback, useState } from 'react';
import type { Node, Edge, NodeChange, EdgeChange, Connection } from '@xyflow/react';
import { EmailNode } from '../nodes/EmailNode';
import { SourceNode } from '../nodes/SourceNode';
import { DelayNode } from '../nodes/DelayNode';
import type { AppNode } from '../types';

const nodeTypes = {
  email: EmailNode,
  delay: DelayNode,
  lead: SourceNode,
};

export function FlowBuilder() {
  const [nodes, setNodes] = useState<AppNode[]>([
    {
      id: 'lead-1',
      type: 'lead',
      position: { x: 250, y: 0 },
      data: { source: 'LinkedIn' },
    },
    {
      id: 'email-1',
      type: 'email',
      position: { x: 250, y: 150 },
      data: {
        subject: 'Introduction',
        content: 'Hi there!',
        recipient: 'example@email.com',
      },
    },
    {
      id: 'delay-1',
      type: 'delay',
      position: { x: 250, y: 300 },
      data: { delayHours: 24 },
    },
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { id: 'l1->e1', source: 'lead-1', target: 'email-1' },
    { id: 'e1->d1', source: 'email-1', target: 'delay-1' },
  ]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => nds.applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => eds.applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <aside style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        <div 
          onDragStart={(event) => onDragStart(event, 'email')} 
          draggable
          style={{ padding: '8px', border: '1px solid #ddd', marginBottom: '8px' }}
        >
          Email Node
        </div>
        <div 
          onDragStart={(event) => onDragStart(event, 'delay')} 
          draggable
          style={{ padding: '8px', border: '1px solid #ddd', marginBottom: '8px' }}
        >
          Delay Node
        </div>
        <div 
          onDragStart={(event) => onDragStart(event, 'lead')} 
          draggable
          style={{ padding: '8px', border: '1px solid #ddd' }}
        >
          Lead Source
        </div>
      </aside>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}