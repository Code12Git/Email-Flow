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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DelayTaskModal from '../ui/modal/DelayTaskModal';
import { useSelector } from 'react-redux';
import EmailNode from '../nodes/EmailNode';  
import CustomEdge from '../edges/CustomEdge';
import CustomNode from '../nodes/CustomNode';
import LeadNode from '../nodes/LeadNode';

interface CustomNodeData {
  // Define your node data interface here
  [key: string]: any;
}

interface CustomEdgeData {
  // Define your edge data interface here
  [key: string]: any;
}

const nodeTypes = {
  emailNode: EmailNode, 
  leadSourceNode: CustomNode,
  leadNode: LeadNode
};

const edgeTypes = {
  customEdge: CustomEdge
}

const FlowWrapper = () => {
  return (
    <ReactFlowProvider>
      <Dashboard />
    </ReactFlowProvider>
  )
}

const Dashboard = () => {
  const { nodesData, edgesData } = useSelector((state: any) => state.nodes);
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>(nodesData);
  const [edges, setEdges] = useState<Edge<CustomEdgeData>[]>(edgesData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => setNodes(nodesData), [nodesData]);
  useEffect(() => setEdges(edgesData), [edgesData]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<CustomNodeData>) => {
      if (node.id === '2') setIsModalOpen(true);
    }, 
    []
  );

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
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
        <DelayTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Background color="#E5E7EB" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowWrapper;