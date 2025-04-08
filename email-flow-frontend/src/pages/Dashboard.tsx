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
import CustomEdge from '../edges/CustomEdge';
import CustomNode from '../nodes/CustomNode';
import CustomLeadNode from '../nodes/CustomLeadNode';
import LeadNode from '../nodes/LeadNode';
import { Button } from '@mui/material';
import {   privateRequest } from '../helpers/axios';
import DelayNode from '../nodes/DelayNode';
import EmailNode from '../nodes/EmailNode';

interface CustomNodeData {
  // Define your node data interface here
  [key: string]: any;
}

interface CustomEdgeData {
  // Define your edge data interface here
  [key: string]: any;
}

const nodeTypes = {
  leadSourceNode: CustomNode,
  customNode: CustomLeadNode,
  leadNode:LeadNode,
  waitTimeNode: DelayNode,
  emailNode:EmailNode
};

const edgeTypes = {
  customEdge: CustomEdge
}



const Dashboard = () => {
  const { nodesData, edgesData } = useSelector((state: any) => state.nodes);
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>(nodesData);
  const [edges, setEdges] = useState<Edge<CustomEdgeData>[]>(edgesData);
  const [isReady, setIsReady] = useState(false); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData);
    setIsReady(true); 
  }, [nodesData, edgesData]);





  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );


  const handleSaveFlow = async () => {
    try {
      const response = await privateRequest.post('/flow',nodesData)
      console.log("Flow executed successfully:", response.data);
    } catch (error) {
      console.error("Failed to execute flow:", error);
    }
  };
  
 

  
  

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<CustomNodeData>) => {
      if (node.id === '2') setIsModalOpen(true);
    }, 
    []
  );
    if (!isReady) return <div>Loading...</div>;

  console.log(nodesData)

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Save Flow Button (Always Visible) */}
      <div style={{ position: 'absolute', top: 600, right: 40, zIndex: 10 }}>
        <Button onClick={handleSaveFlow} variant="contained" color="primary">
          Save Flow
        </Button>
      </div>


      {/* ReactFlow (Only Renders if Nodes & Edges Exist) */}
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
          <DelayTaskModal
          edge={null}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Background color="#E5E7EB" gap={16} />
          <Controls />
        </ReactFlow>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <p>No nodes or edges found. Start by adding elements.</p>
        </div>
      )}
    </div>
  );
};

const FlowWrapper = () => {
  return (
    <ReactFlowProvider>
      <Dashboard />
    </ReactFlowProvider>
  )
}

export default FlowWrapper;