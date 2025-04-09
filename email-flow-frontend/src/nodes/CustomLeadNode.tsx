import { motion } from 'framer-motion';
import LeadSourceModal from '../ui/modal/LeadSouceModal';
 
const CustomLeadNode = () => {

  return (
    <motion.div
      className="relative"
    >
          <LeadSourceModal />  
    </motion.div>
  );
};

export default CustomLeadNode;