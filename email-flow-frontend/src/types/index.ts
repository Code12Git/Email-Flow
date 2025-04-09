
// import type { Node, BuiltInNode } from '@xyflow/react';
export type UserLogin = {
    email:string,
    password:string
}

export type userRegister = {
    name:string,
    username:string,
    email:string,
    password:string,
}


 

export type EmailNodeData = {
    subject: string;
    content: string;
    recipient: string;
  };
  
  export type DelayNodeData = {
    delayHours: number;
  };
  
  export type LeadSourceNodeData = {
    source: string;
  };
  


  export interface ModalPayload {
    modalType: string | null;
    nodeId: string | null;
  }

  export const ModalState = [{
    isOpen:Boolean,
    modalType: String,
    currentNodeId: String
}]


export interface ListItems {
  id: string;
  name: string;
  email:string,
  company:string,
  status:string
}

export interface EmailFormData {
  recipient: string;
  subject: string;
  body: string;
}

export interface NodeCreation {
  originalNodeId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newNodeData: any;
}
export interface LeadNodeData {
  label?: string;
  description?: string;
}
export interface NodePayload {
  id: string;
  position: { x: number; y: number };
  type: string;
  data: unknown;
  originalNodeId:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edge?: any;
  newNodeData: {
    type: string;
    label: string;
    time?: {
      hours: number;
      minutes: number;
    };
    emailData?: {
      subject: string;
      recipient: string;
      body:string;
    };
  };
  // Add other node properties as needed
}

export interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  currentNodeId: string | null;
}

export interface NodeState {
  nodesData: Node[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edgesData: any[]; 
}

//   export type AppNode = {
//     id: string;
//     type: 'email' | 'delay' | 'lead' | 'input' | 'output';
//     position: { x: number; y: number };
//     data: EmailNodeData | DelayNodeData | LeadSourceNodeData | { label: string };
//   };
export type NodeData = {
  id: string;
  type?: string;

  time?: {
    hours: number;
    minutes: number;
  };
  label: string;
  [key: string]: unknown; // Add this to satisfy the constraint
};



export interface WaitNodeData {
  type: string;
  time: {
    hours: number;
    minutes: number;
  };
  // any other fields...
}
