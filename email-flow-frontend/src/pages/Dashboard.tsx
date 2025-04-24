import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeTypes,
  BackgroundVariant,
  EdgeTypes,
} from '@xyflow/react';
import { Connection } from '@xyflow/react';
import CustomEdge from '../edges/CustomEdge';
import '@xyflow/react/dist/style.css';
import { useAppSelector } from '../hooks/hooks';
import AddLeadNode from '../nodes/AddLeadNode';
import LeadNode from '../nodes/LeadNode';
import AddNode from '../nodes/AddNode';
import EmailNode from '../nodes/EmailNode';
import DelayNode from '../nodes/DelayNode';
import { Button } from '@mui/material';
import { privateRequest } from '../helpers/axios';
import toast from 'react-hot-toast';
const nodeTypes:NodeTypes = {
  AddLeadNode:AddLeadNode,
  LeadNode:LeadNode,
  AddNode:AddNode,
  EmailNode:EmailNode,
  DelayNode:DelayNode
}

const edgeTypes:EdgeTypes= {
  customEdge:CustomEdge
}

export default function Dashboard() {
  const {nodesData,edgesData} = useAppSelector(state => state.nodes)
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);
  console.log(nodesData)
  console.log(edgesData)

  // Set Edges and Set Nodes should be used in useEffect because we cant see changes if the edge change 
  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData)
  }, [nodesData,setNodes,setEdges,edgesData]);
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
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
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>): (
        <div className="flex justify-center items-center h-full">
          <p>No nodes or edges found. Start by adding elements.</p>
        </div>
      )}
    </div>
  );
}


