import {  FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import LeadSourceModal from '../ui/modal/LeadSouceModal';
import { LeadNodeData } from '../types';


const LeadNode = ({ data }: { data: LeadNodeData }) => {

  return (
    <motion.div 
      className="p-0"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: "#10B981",
        color: "white",
        border: "2px solid #059669",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        width: "180px",
        height: "auto",
        cursor: "pointer",
        boxShadow: "none",
        outline: "none" 
      }}
    >
      <div className="flex items-center gap-3 h-full" style={{ margin: 0 }}>
        <div>
         <LeadSourceModal />
        </div>
        
        <div className="flex-1" style={{ overflow: 'hidden' }}>
          <h2 className="text-base font-semibold text-white flex items-center gap-2" style={{ margin: 0 }}>
            {data?.label || 'Add Lead Source'}
            <FaArrowRight className="text-white text-sm opacity-70 flex-shrink-0" />
          </h2>
          <p className="text-xs text-white text-opacity-80 mt-1" style={{ margin: 0 }}>
            {data?.description || 'Click to add leads'}
          </p>
        </div>
      </div>
      
    </motion.div>
  );
};

export default LeadNode;