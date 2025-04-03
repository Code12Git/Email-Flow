import { Handle, Position, NodeProps } from 'reactflow';
import { FaPlus } from "react-icons/fa";
import { openModal } from '../redux/action/modal';
import { useDispatch } from 'react-redux';
import LeadSourceModal from '../ui/modal/LeadSouceModal';
import { useState } from 'react';
type SourceNodeData = {
  label: string;
  description?: string;
  sourceType?: 'manual' | 'csv' | 'api'; 
  count?: number; 
};

export default function SourceNode({ 
  data, 
  selected ,
   id, 
}: NodeProps<SourceNodeData>) {

  const dispatch = useDispatch()
  const[FetchData,setFetchData] = useState([])
  console.log(id)

  const handleClick = () => {
    console.log("Triggered")
    dispatch(openModal({ 
      modalType: 'source', 
      currentNodeId: id,
      // initialData: data
    }));
  };

  const onSubmit = (data) => {
    console.log(data)
    setFetchData(data)
  }

  return (
    <div className={`
      p-4 bg-white rounded-lg shadow-sm w-72 border-2
      ${selected ? 'border-green-400' : 'border-green-200'}
      transition-colors duration-200
    `} onClick={handleClick}>
      <div className="flex items-start gap-3">
        <div className="mt-1 text-green-500">
         <LeadSourceModal onSubmit={onSubmit} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900">
              {data.label || 'Lead Source'}
            </h3>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {data.sourceType || 'manual'}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {data.description || 'Add description...'}
          </p>
          {data.count && (
            <div className="mt-2 text-xs text-gray-400">
              {data.count} leads
            </div>
          )}
        </div>
      </div>
      {/* <Handle 
        type="source" 
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500"
      /> */}
    </div>
  );
}