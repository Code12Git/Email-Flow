import { Node } from "@xyflow/react";

export type UserLogin = {
  email:string,
  password:string
}

export type userRegister = {
email: string;
password: string;
name?: string;
username?: string;
id?: number;
role?: "admin" | "user";
emailQuota?: number;
isVerified?: boolean;
};

export interface NodeState {
  nodesData: Node[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edgesData: any[]; 
}

export interface SingleLead {
  id: string;
  lead: string;
  referrer: string;
}

// For adding array
export type NodeData = SingleLead[];  

export interface NodePayload {
  nodeId?:string;
  id?: string;
  position?: { x: number; y: number };
  type?: string;
  data?: unknown;
  originalNodeId?:string;
  hours?: number;
  minutes?: number;
    subject?: string;
    recipient?: string;
    body?:string;
}

export interface NodeType {
  id:string,
  position?:{
    x:number,
    y:number
  },
  data?:unknown,
  type?:string
}

export type NodeToDelete = NodeData | undefined;

export type nodeToDelete = {
  id: string;
  position: {
      x: number;
      y: number;
  };
  type: string;
  data?: unknown
  style?: unknown
} 

export interface EdgeType{
  id:string;
  source:string;
  target:string;
  animated?:boolean;
  style: { stroke: string; strokeWidth: number }
  type:string;
}

  export type EmailNodeData = {
      recipient: number,
      subject: number
    
  };
  export type EmailFlowNode = Node<EmailNodeData>;


export interface EdgeType {

  id: string; 

  source: string;

  target: string;

  animated?: boolean;

}