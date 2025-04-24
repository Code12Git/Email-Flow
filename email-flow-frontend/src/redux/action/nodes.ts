import { ADD_NODE, DELETE_LEAD_NODE, DELETE_NODE, NODE_CREATION} from "../actionTypes/actionTypes";
import { AppDispatch } from "../store";
import { NodeData, NodePayload } from "../../types";


export const addLeadNode = (nodeData:NodeData) => (dispatch:AppDispatch) => {
  console.log(nodeData)
  
  dispatch({
      type:ADD_NODE,
      payload:{
          data:nodeData
      }
  })
}


export const deleteNode = (nodeId: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: DELETE_NODE,
    payload: { nodeId: nodeId }
  });
};

export const deleteLeadNode = () => (dispatch: AppDispatch) => {
  dispatch({
    type: DELETE_LEAD_NODE,
  });
};

export const nodeCreation = (emailData:NodePayload,type:string) => (dispatch:AppDispatch) => {
  dispatch({
      type:NODE_CREATION,
      payload:{
          data:emailData,
          type:type
      }
  })
}