import { ModalPayload } from "../../types";
import { CLOSE_MODAL, OPEN_MODAL } from "../actionTypes/actionTypes"
 
export const initialModalState = [{
    isOpen:false,
    modalType: null,
    currentNodeId: null
}]



const modalReducer = (
    state = initialModalState,
    { type, payload }: { type: string; payload: ModalPayload }
  ) => {    switch (type) {
      case OPEN_MODAL:
        console.log('Triggered OPEN_MODAL')
        return {
          ...state,
          isOpen: true,
          modalType:payload.modalType,
          currentNodeId:payload.nodeId
        };
      case CLOSE_MODAL:
        return {
          ...state,
          isOpen: false,
          modalType: null,
          currentNodeId: null
        };
      default:
        return state;
    }
  };

  export default modalReducer;