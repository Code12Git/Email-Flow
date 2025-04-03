import React, { useRef, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Node,
  Edge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from '../base/Sidebar';
import { DnDProvider, useDnD } from '../context/DnDContext';
import EmailNode from '../nodes/EmailNode';
import DelayNode from '../nodes/DelayNode';
import SourceNode from '../nodes/SourceNode';

const nodeTypes = {
  email: EmailNode,
  wait: DelayNode,
  source: SourceNode,
};

const initialNodes: Node[] = [
  {
    id: `source-${Date.now()}`,
    type: 'source',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Add Lead Source',
      description:'Click to add leads from Lisr or CRM'

     },
  },
];

const initialEdges: Edge[] = [];

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: { 
          label: `${type} node`,
          ...(type === 'wait' && { days: 1, hours: 0, minutes: 0 }),
          ...(type === 'email' && { subject: '', body: '', from: '' }),
          ...(type === 'source' && { sourceType: 'csv', file: null })
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const onSave = useCallback(() => {
    // Implement save logic here
    console.log('Saving flow:', { nodes, edges });
  }, [nodes, edges]);

  const addNode = (type, position) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: { label: `${type} node` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
        <div className="node-panel">
       
      </div>
        <button 
          onClick={onSave}
          className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Flow
        </button>
      </div>
    </div>
  );
};

const DnDFlowWrapper: React.FC = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);

export default DnDFlowWrapper;