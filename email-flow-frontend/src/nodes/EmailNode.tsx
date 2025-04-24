import { motion } from 'framer-motion';
import { FiMail, FiUser, FiType, FiX } from 'react-icons/fi';
import { NodeProps } from '@xyflow/react'
import { EmailFlowNode } from '../types';
import { Handle, Position } from '@xyflow/react'
import { deleteNode } from '../redux/action/nodes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const EmailNode = ({ data, id,isConnectable }: NodeProps<EmailFlowNode>) => {
  const dispatch = useDispatch<AppDispatch>()
  const onDelete = () => {
    dispatch(deleteNode(id))
  }
  return (
    <div className="relative group">
      <button
        onClick={onDelete}
        className="absolute -right-8 top-1/2 transform -translate-y-1/2
                   opacity-0 group-hover:opacity-100 transition-opacity
                   cursor-pointer
                   bg-red-500 text-white p-1 rounded-full hover:bg-red-600
                   focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
        aria-label="Delete node"
      >
        <FiX className="w-3 h-3" />
      </button>
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-64"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      
        <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-blue-600 !-top-1.5" 
        isConnectable={isConnectable}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-blue-600 !-bottom-1.5" 
        isConnectable={isConnectable}
      />
      {/* Header */}
      <div className="bg-blue-500 p-3 flex items-center gap-2">
        <FiMail className="text-white text-lg" />
        <h3 className="text-white font-semibold">Email Node</h3>
      </div>

      {/* Email Content */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <FiUser className="text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Recipient</p>
            <p className="text-sm font-medium text-gray-800 truncate">
              {data.recipient || 'Not specified'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiType className="text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Subject</p>
            <p className="text-sm font-medium text-gray-800 line-clamp-2">
              {data.subject || 'No subject'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-right">
          {new Date().toLocaleString()}
        </p>
      </div>
      
    </motion.div>
 

    </div>
  );
};

export default EmailNode;

