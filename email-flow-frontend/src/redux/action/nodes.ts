import { ADD_NODE, DELETE_NODE, NODE_CREATION_REQUEST, UPDATE_NODE } from "../actionTypes/actionTypes";

export const addNode = (nodeData,type) => (dispatch) => {
    console.log(nodeData)
  dispatch({
    type: ADD_NODE,
    payload: {
      id: `node-${Date.now()}`,
      type: `${type}`, 
      position: {x:100,y:-100}, 
      data: nodeData 
    }
  });
};

export const updateNodePosition = (nodeUpdate) => (dispatch) => {
  dispatch({
    type: UPDATE_NODE,
    payload: nodeUpdate
  });
};

export const deleteNode = (nodeId) => (dispatch) => {
  dispatch({
    type: DELETE_NODE,
    payload: { id: nodeId }
  });
};


export const nodeCreationRequest = (originalNodeId, newNodeData) => (dispatch) => {
  console.log("OriginalNodeId:",originalNodeId,"NewNodeData:",newNodeData)
  dispatch({
    type: NODE_CREATION_REQUEST,
    payload: { originalNodeId:originalNodeId, newNodeData:newNodeData }
  });
};