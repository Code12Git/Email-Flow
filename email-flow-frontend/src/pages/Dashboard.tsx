import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DelayTaskModal from '../ui/modal/DelayTaskModal';
import { useSelector } from 'react-redux';
import EmailNode from '../nodes/EmailNode';  

const nodeTypes = {
  emailNode: EmailNode, 
};

const Dashboard = () => {
  const { nodesData, edgesData } = useSelector((state) => state.nodes);
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => setNodes(nodesData), [nodesData]);
  useEffect(() => setEdges(edgesData), [edgesData]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = useCallback((event, node) => {
    if (node.id === '2') setIsModalOpen(true);
  }, []);

  console.log(nodesData)
  return (
    
         <ReactFlowProvider>
    <div style={{ height: '100vh', width: '100vw' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          // nodeTypes={nodeTypes}  
          fitView
        >
          <DelayTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Background color="#E5E7EB" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
      </ReactFlowProvider>
   );
}

export default Dashboard;