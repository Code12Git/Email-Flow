import { CLOSE_MODAL, OPEN_MODAL } from "../actionTypes/actionTypes"


export const openModal = (modalType: string, currentNodeId: string) => ({
    type: OPEN_MODAL,
    payload: { modalType, currentNodeId }
  });
  
  export const closeModal = () => ({
    type: CLOSE_MODAL
  });
  