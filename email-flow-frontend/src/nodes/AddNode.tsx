import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import EmailTimeModal from '../ui/modal/EmailTimeModal';
import { useState } from 'react';

const AddNode = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)


  return (
    <motion.div
      className="relative group"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button onClick={()=>setIsOpen(true)} className="
        w-40 h-12 md:w-48 md:h-14
        bg-blue-500 hover:bg-blue-600
        rounded-lg md:rounded-xl
        shadow-md hover:shadow-lg
        flex items-center justify-center gap-2
        transition-all duration-200
        cursor-pointer
        border-2 border-white
      ">
        <FaPlus className="text-white text-lg md:text-xl" />
        <span className="
          text-white
          text-base md:text-lg
          font-semibold
          select-none
        ">
          Add Node
        </span>
      </button>

      {/* Tooltip - Removed since the label is now visible */}
           

      {/* Handle to allow connection TO this node */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-4 !h-4 !-top-2 !bg-blue-700 !border-white !border-2"
      />
      <EmailTimeModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.div>
  );
};

export default AddNode;