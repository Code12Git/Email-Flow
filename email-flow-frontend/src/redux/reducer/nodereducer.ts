import { EdgeType,  NodePayload, NodeType } from "../../types/index";
import { ADD_NODE, DELETE_LEAD_NODE, DELETE_NODE, NODE_CREATION } from "../actionTypes/actionTypes"

const nodeState = {
nodesData:[
   {id:'0',position: { x: 550, y: 60 }, type:'AddLeadNode'},
  { id: '2', position: { x: 600, y: 200 }, data: { label: 'Sequence Start Point' },
  style: {
    background: "#10B981",
    color: "white",
    border: "2px solid #059669",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    width: "15%",
  },
   },
  { id: '3', position: { x: 600, y: 300 }, type:'AddNode' },
],
edgesData:[{ id: 'e1-1', source: '1', target: '2' },{id:'e2-2',source:'2',target:'3'}]
}


const nodesReducer = (
  state = nodeState,
  { type, payload }: { type: string; payload: NodePayload }
) => {
  switch(type){
    case ADD_NODE:{
      console.log(payload.data)
      const newNode ={
        id:'1',position:{x:550,y:60},
        type:'LeadNode',
        data:payload.data
      }
      const newEdge = {
        id:`e-${Date.now()}`,
        source:'1',
        target:'2'
      }
      return{
        ...state, nodesData: [...state.nodesData,newNode],edgesData:[...state.edgesData,newEdge]
      }
    }

    case NODE_CREATION: {
      const plusNode = state.nodesData.find((node) => node.id === "3");
      if (!plusNode) return state;
      // 1. First create the new node
      const newNode: NodeType = {
        id: `n1-${Date.now()}`,
        position: { 
          x: plusNode.position.x, 
          y: plusNode.position.y 
        },
        data: payload.data,
        type: payload.type,
      
      };
    
      // 2. Create the connecting edge
      const newEdge: EdgeType = {
        id: `e1-${Date.now()}`,
        source: newNode.id,
        target: plusNode.id,
        animated: true, 
        style: { stroke: "#3B82F6", strokeWidth: 2 },
        type:'customEdge'

      };
      const previousEdges = state.edgesData.map((edge) =>
        edge.target === plusNode.id ? { ...edge, target: newNode.id } : edge
      );
      // 3. Update plus node position
      const updatedPlusNode: NodeType = {
        ...plusNode,
        position: {
          x: plusNode.position.x,
          y: plusNode.position.y + 120
        }
      };

      return {
        ...state,
        nodesData: [
          ...state.nodesData.filter(node => node.id !== "3"),
          newNode,
          updatedPlusNode
        ],
        edgesData: [
          ...previousEdges,
          newEdge 
        ]
      };
    }

    case DELETE_NODE: {
      const nodeIdToDelete = payload.nodeId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeToDelete:any = state.nodesData.find(node => node.id === nodeIdToDelete);
      
      // Find connected edges
      const incomingEdge = state.edgesData.find(edge => edge.target === nodeIdToDelete);
      const outgoingEdge = state.edgesData.find(edge => edge.source === nodeIdToDelete);
      
      // Create new edge if bridging is needed
      const newEdges = [];
      if (incomingEdge && outgoingEdge) {
        newEdges.push({
          id: `edge-${incomingEdge.source}-${outgoingEdge.target}`,
          source: incomingEdge.source,
          target: outgoingEdge.target,
          type: 'customEdge'
        });
      }
    
      const updatedNodes = state.nodesData
        .filter(node => node.id !== nodeIdToDelete)
        .map(node => {
          if (node.position.x > nodeToDelete?.position.x && 
              node.position.y > nodeToDelete?.position.y) {
            return {
              ...node,
              position: {
                x: node.position.x - 100, 
                y: node.position.y - 100    
              }
            };
          }
          else if (node.position.x > nodeToDelete.position.x) {
            return {
              ...node,
              position: {
                ...node.position,
                x: node.position.x - 100  
              }
            };
          }
          // Move nodes only below (same column)
          else if (node.position.y > nodeToDelete.position.y) {
            return {
              ...node,
              position: {
                ...node.position,
                y: node.position.y - 100  // move up only
              }
            };
          }
          return node;
        });
      
      return {
        ...state,
        nodesData: updatedNodes,
        edgesData: [
          ...state.edgesData.filter(
            edge => edge.source !== nodeIdToDelete && edge.target !== nodeIdToDelete
          ),
          ...newEdges
        ]
      };
    }

    case DELETE_LEAD_NODE:{
      const outgoingEdge = state.edgesData.filter(edge=>edge.source !==  '1')
      return {
        ...state,
        nodesData:state.nodesData.filter(node=>node.id!=='1'),
        edgeData:[...state.edgesData,outgoingEdge]
      }
    }

    default: return state;
    
  }
}

export default nodesReducer;