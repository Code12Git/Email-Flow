import { Delete } from '@mui/icons-material';
import { NodeData } from '../types';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteLeadNode } from '../redux/action/nodes';

const LeadNode = ({ data }: { data: NodeData }) => {
  const dispatch = useDispatch<AppDispatch>()
  const deleteLeadNodes = () => {
    dispatch(deleteLeadNode())
  }
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-4 w-64">
      <h2 className="text-lg font-semibold text-blue-600 mb-2">Lead Info</h2>
     { data?.map((lead)=>(<div className="flex items-center gap-5 text-sm text-gray-700">
        <div>
        <p><span className="font-medium">Referrer:</span> {lead.referrer}</p>
        <p><span className="font-medium">Lead:</span> {lead.lead}</p>
        </div>
        <Delete onClick={deleteLeadNodes} className='hover:scale-105 text-red-400 hover:text-red-600 cursor-pointer' />
      </div>))}
      <Handle type="source" position={Position.Bottom} id="a" />

{/* Handle to allow connection TO this node */}
<Handle type="target" position={Position.Top} id="b" />
    </div>
  );
};

export default LeadNode;
