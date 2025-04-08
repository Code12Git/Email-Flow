/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_NODE, DELETE_NODE, NODE_CREATION_REQUEST, UPDATE_NODE } from "../actionTypes/actionTypes";

interface NodeData {
  leads?: Array<{
    id: string;
    name: string;
    email: string;
    company: string;
    status: string;
  }>;
  loading?: boolean;
  error?: string;
}

interface NodePosition {
  x: number;
  y: number;
}

interface Node {
  id: string;
  type: string;
  position: NodePosition;
  data: NodeData;
}

interface NodeUpdate extends Partial<Node> {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addNode = (nodeData: NodeData, type: string, position: NodePosition,edge =null) => (dispatch: any) => {
  if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
    console.error('Invalid position provided:', position);
    position = { x: 0, y: 0 }; // Default position if invalid
  }
  console.log('Triggered',type)
  dispatch({
    type: ADD_NODE,
    payload: {
      id: `node-${Date.now()}`,
      position: position,
      type: type,
      data: nodeData ,
      edge
    }
  });
};

export const updateNodePosition = (nodeUpdate: NodeUpdate) => (dispatch: any) => {
  dispatch({
    type: UPDATE_NODE,
    payload: nodeUpdate
  });
};

export const deleteNode = (nodeId: string) => (dispatch: any) => {
  dispatch({
    type: DELETE_NODE,
    payload: { id: nodeId }
  });
};

export const nodeCreationRequest = (originalNodeId: string, newNodeData: NodeData) => (dispatch: any) => {
  dispatch({
    type: NODE_CREATION_REQUEST,
    payload: { 
      originalNodeId: originalNodeId, 
      newNodeData: newNodeData 
    }
  });
};