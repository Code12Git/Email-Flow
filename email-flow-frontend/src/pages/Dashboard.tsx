// @ts-nocheck
import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
  NodeTypes,
  EdgeTypes,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DelayTaskModal from '../ui/modal/DelayTaskModal';
import CustomEdge from '../edges/CustomEdge';
import CustomNode from '../nodes/CustomNode';
import CustomLeadNode from '../nodes/CustomLeadNode';
import LeadNode from '../nodes/LeadNode';
import { Button } from '@mui/material';
import { privateRequest } from '../helpers/axios';
import DelayNode from '../nodes/DelayNode';
import EmailNode from '../nodes/EmailNode';
import { useAppSelector } from '../hooks/hooks';
import { RootState } from '../redux/store';
import toast from 'react-hot-toast';

// Strongly typed interfaces
interface CustomNodeData {
  label?: string;
  [key: string]: unknown;
}

interface CustomEdgeData {
  label?: string;
  [key: string]: unknown;
}

// Node & Edge Types for React Flow
const nodeTypes: NodeTypes = {
  leadSourceNode: CustomNode,
  customNode: CustomLeadNode,
  leadNode: LeadNode,
  waitTimeNode: DelayNode,
  emailNode: EmailNode,
};

const edgeTypes: EdgeTypes = {
  customEdge: CustomEdge,
};

const Dashboard = () => {
  // Strongly typed selector with fallback
  const { nodesData, edgesData } = useAppSelector((state: RootState) => ({
    nodesData: state.nodes?.nodesData ?? [],
    edgesData: state.nodes?.edgesData ?? []
  }));

  // State with explicit types
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>(nodesData);
  const [edges, setEdges] = useState<Edge<CustomEdgeData>[]>(edgesData);
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize flow data
  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData);
    setIsReady(true);
  }, [nodesData, edgesData]);

  // Event handlers with proper typing
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick: NodeMouseHandler<CustomNodeData> = useCallback(
    (_, node) => {
      if (node.id === '2') setIsModalOpen(true);
    },
    []
  );

  const handleSaveFlow = async () => {
    try {
      await privateRequest.post('/flow', { nodes, edges });
      toast.success('Flow saved successfully!');
    } catch (error) {
      console.error('Failed to save flow:', error);
      toast.error('Failed to save flow');
    }
  };

  if (!isReady) return <div>Loading...</div>;

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 600, right: 40, zIndex: 10 }}>
        <Button onClick={handleSaveFlow} variant="contained" color="primary">
          Save Flow
        </Button>
      </div>

      {nodes.length > 0 && edges.length > 0 ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <DelayTaskModal edge={null} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Background color="#E5E7EB" gap={16} />
          <Controls />
        </ReactFlow>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>No nodes or edges found. Start by adding elements.</p>
        </div>
      )}
    </div>
  );
};

const FlowWrapper = () => (
  <ReactFlowProvider>
    <Dashboard />
  </ReactFlowProvider>
);

export default FlowWrapper;