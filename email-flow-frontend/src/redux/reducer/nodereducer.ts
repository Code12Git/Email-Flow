import LeadNode from "../../nodes/CustomLeadNode";
import {
  NODE_CREATION_REQUEST,
  DELETE_NODE,
  ADD_NODE,
  DELETE_LEAD_NODE,
} from "../actionTypes/actionTypes";
import { NodePayload } from "../../types";

const initialState = {
  nodesData: [
    {
      id:"12",
      position:{x:100,y:-100},
      type: "customNode",
    },
    {
      id: "1",
      data: { label: "Sequence Start Point" },
      position: { x: 100, y: 100 },
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
      type: LeadNode,
    },
    {
      id: "2",
      data: { label: "+" },
      position: { x: 100, y: 250 },
      style: {
        background: "#3B82F6",
        color: "white",
        border: "2px solid #2563EB",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        width: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      type: "output",
    },
  ],
  edgesData: [
    {
      id: "1-2",
      source: "1",
      target: "2",
      labelStyle: {
        fill: "#1F2937",
        fontWeight: "bold",
        fontSize: "12px",
      },
      labelBgStyle: {
        fill: "#E5E7EB",
        opacity: 0.9,
        rx: 4,
        ry: 4,
      },
      type: "straight",
      style: { stroke: "#6B7280", strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", color: "#6B7280" },
    },
  ],
};




const nodesReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: NodePayload }
) => {
  switch (type) {
    case ADD_NODE: {
      const newNode = {
        id: payload.id,
        type: payload.type,
        position: payload.position,
        data: payload.data,
      };
    
      const newEdge = {
        id: `${payload.id}-12`,
        source: payload.id,
        target: "12",
        type: "straight",
        style: { stroke: "#6B7280", strokeWidth: 2 },
        markerEnd: { type: "arrowclosed", color: "#6B7280" },
      };
    
      return {
        ...state,
        nodesData: [...state.nodesData, newNode],
        edgesData: [...state.edgesData, newEdge],
      };
    }
    

      case NODE_CREATION_REQUEST: {
        const { newNodeData } = payload;
        const { time, emailData } = newNodeData;
        const plusNode = state.nodesData.find((node) => node.id === "2");
        if (!plusNode) return state;
      
        const nodeType = newNodeData.type === "delayNode" ? "waitTimeNode" : "emailNode";
      
       
        const newNodeId = `node-${Date.now()}`;
        const newNode = {
          id: newNodeId,
          type: nodeType,
          position: { ...plusNode.position },
          data: {
            label:  nodeType,
            ...(nodeType === "waitTimeNode"
              ? {
                nodeId:newNodeId,
                  time: {
                    hours: time?.hours || 0,
                    minutes: time?.minutes || 0,
                  },
                }
              : {
                nodeId: newNodeId,
                  emailData: {
                    subject: emailData?.subject || '',
                    html: emailData?.body || '',
                    recipient: emailData?.recipient || ''
                  }
                }),
          },
     
        };
      
        const updatedPlusNode = {
          ...plusNode,
          position: { x: plusNode.position.x, y: plusNode.position.y + 100 },
        };
      
        const previousEdges = state.edgesData.map((edge) =>
          edge.target === plusNode.id ? { ...edge, target: newNode.id } : edge
        );
      
        const newEdge = {
          id: `edge-${newNode.id}-plus`,
          source: newNode.id,
          target: plusNode.id,
          type: "customEdge",
          animated: true,
          style: { stroke: "#3B82F6", strokeWidth: 2 },
        };
      
        return {
          ...state,
          nodesData: [
            ...state.nodesData.filter((node) => node.id !== "2"),
            newNode,
            updatedPlusNode,
          ],
          edgesData: [...previousEdges, newEdge],
        };
      }

 case DELETE_NODE: {
  const nodeIdToDelete = payload.id;
  
   state.edgesData.filter(
    edge => edge.source === nodeIdToDelete || edge.target === nodeIdToDelete
  );

   const incomingEdge = state.edgesData.find(edge => edge.target === nodeIdToDelete);
  const outgoingEdge = state.edgesData.find(edge => edge.source === nodeIdToDelete);

   const newEdges = [];
  if (incomingEdge && outgoingEdge) {
    newEdges.push({
      id: `edge-${incomingEdge.source}-${outgoingEdge.target}`,
      source: incomingEdge.source,
      target: outgoingEdge.target,
      type: 'customEdge'
    });
  }

  return {
    ...state,
    nodesData: state.nodesData.filter(node => node.id !== nodeIdToDelete),
    edgesData: [
       ...state.edgesData.filter(
        edge => edge.source !== nodeIdToDelete && edge.target !== nodeIdToDelete
      ),
       ...newEdges
    ]
  };
}

case DELETE_LEAD_NODE: {
  const leadNodeId = payload.id || payload; 
  return {
    ...state,
    nodesData: state.nodesData.filter((node) => node.id !== leadNodeId),
}
}

    default:
      return state;
  }
};

export default nodesReducer;
