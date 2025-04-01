import type { NodeTypes } from '@xyflow/react';
import { EmailNode } from './EmailNode';
import { DelayNode } from './DelayNode';
import {SourceNode } from './SourceNode';
import type { AppNode } from '../types';

export const initialNodes: AppNode[] = [
  {
    id: 'lead-1',
    type: 'lead',
    position: { x: 250, y: 0 },
    data: { source: 'LinkedIn' },
  },
  {
    id: 'email-1',
    type: 'email',
    position: { x: 250, y: 150 },
    data: {
      subject: 'Introduction',
      content: 'Hi there!',
      recipient: 'example@email.com',
    },
  },
  {
    id: 'delay-1',
    type: 'delay',
    position: { x: 250, y: 300 },
    data: { delayHours: 24 },
  },
];

export const nodeTypes = {
  email: EmailNode,
  delay: DelayNode,
  lead: SourceNode,
} satisfies NodeTypes;