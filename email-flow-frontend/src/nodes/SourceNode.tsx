import { Handle, Position, NodeProps } from 'reactflow';
import { FaPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import LeadsFromListModal from '../ui/modal/LeadsFromListModal';
import { nodeCreationRequest } from '../redux/action/nodes';

type SourceNodeData = {
  label: string;
  description?: string;
  sourceType?: 'manual' | 'csv' | 'api'; 
  count?: number;
  lists?: any[];
};

export default function SourceNode({ 
  id,
  data, 
  selected,

}: NodeProps<SourceNodeData>) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmitFromModal = (listsData: any[]) => {
    if (listsData && listsData.length > 0) {
      const newNodeData = {
        label: data.label || 'Lead Source',
        description: 'Imported from lists',
        sourceType: 'manual',
        count: listsData.length,
        lists: listsData,
      };
      console.log(newNodeData)

      dispatch(nodeCreationRequest({
        originalNodeId: id,
        newNodeData
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`
        p-4 bg-white rounded-lg shadow-sm w-72 border-2
        ${selected ? 'border-green-400' : 'border-green-200'}
        transition-colors duration-200
      `} onClick={handleClick}>
        <div className="flex items-start gap-3">
          <div className="mt-1 text-green-500">
            <FaPlus />
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
        <Handle 
          type="source" 
          position={Position.Bottom}
          className="w-3 h-3 bg-green-500"
        />
      </div>

      <LeadsFromListModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitFromModal}
      />
    </>
  );
}