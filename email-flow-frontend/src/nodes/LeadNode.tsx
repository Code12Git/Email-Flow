import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { NodeProps } from 'reactflow';
import { DELETE_LEAD_NODE } from '../redux/actionTypes/actionTypes';
import { AppDispatch } from '../redux/store';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const LeadNode: React.FC<NodeProps<{ leads?: Lead[]; loading?: boolean; error?: string }>> = ({ data }) => {
  // Calculate dynamic dimensions based on number of leads
  const dispatch = useDispatch<AppDispatch>()
  const leadCount = data.leads?.length || 0;
  const baseHeight = 120; 
  const leadItemHeight = 60;  
  const maxHeight = 400; 
  const calculatedHeight = Math.min(baseHeight + (leadCount * leadItemHeight), maxHeight);

  if (data.loading) {
    return (
      <div className="p-4 rounded-lg bg-gray-50 text-gray-600" style={{ width: '200px', height: `${baseHeight}px` }}>
        Loading leads...
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg" style={{ width: '200px', height: `${baseHeight}px` }}>
        Error: {data.error}
      </div>
    );
  }

  if (!data.leads || data.leads.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-yellow-50 text-yellow-700" style={{ width: '200px', height: `${baseHeight}px` }}>
        No leads selected
      </div>
    );
  }

  const deleteChangeHandler = (leadId: string) => {
    dispatch({
      type: DELETE_LEAD_NODE,
      payload: leadId
    });
    
  }
  console.log("LeadNode data:", data)

  return (
    <motion.div
      className="relative p-4 rounded-lg shadow-md bg-white border  border-gray-200"
      whileHover={{ scale: 1.02 }}
      style={{ 
        width: '200px',
        height: `${calculatedHeight}px`,
        minHeight: `${baseHeight}px`
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">Leads</h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {data.leads.length} selected
        </span>
      </div>
      <button
        className='cursor-pointer text-red-500 hover:text-red-700 transition duration-200'
        onClick={() => deleteChangeHandler(data?.leads?.id)}
        title="Delete lead"
      >
        ✕
      </button>
      <div className="overflow-y-auto" style={{ height: `calc(100% - 40px)` }}>
      {data.leads.map(lead => {
  return (
    <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
          {lead.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{lead.name}</p>
          <p className="text-xs text-gray-500 truncate">{lead.company}</p>
        </div>
      </div>
     
    </div>
  );
})}


      </div>
    </motion.div>
  );
};

export default LeadNode;