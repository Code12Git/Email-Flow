import type { Node, BuiltInNode } from '@xyflow/react';
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
  
  export type AppNode = {
    id: string;
    type: 'email' | 'delay' | 'lead' | 'input' | 'output';
    position: { x: number; y: number };
    data: EmailNodeData | DelayNodeData | LeadSourceNodeData | { label: string };
  };
 