import * as React from 'react';
import Box from '@mui/material/Box';
 import Modal from '@mui/material/Modal';
import {motion} from 'framer-motion'
import { FaArrowRight, FaPlus, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { LeadData } from '../../data/LeadData';
import LeadsFromListModal from './LeadsFromListModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// This is used for showing the node modal that we are using as first node


  type LeadItem = {
    id: string;
    referrer: string;
    lead: string;
};


export default function LeadSourceModal() {
  const [open, setOpen] = React.useState(false);
  const [isLeadsModalOpen,setLeadsModal] = React.useState(false)
  const [data, setData] = React.useState<LeadItem[]>([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (selectedListsDetails: LeadItem[]) => {
    setData(selectedListsDetails);
  };

console.log(data)
  return (
<div className={`${data?.length>0 ? 'ml-76' : 'ml-0'}`}>
    <motion.button
        onClick={handleOpen}
        className="bg-red-400 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#059669] transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus />
        <div className="flex-1 overflow-hidden">
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span>Add Lead Source</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaArrowRight className="text-white text-sm opacity-90" />
            </motion.span>
          </div>
          
          <p className="text-xs text-white text-opacity-90 mt-2 leading-relaxed">
            Click to add new leads to your campaign
          </p>
        </div>
      </motion.button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Add a Source Block</h1>
              <FaQuestionCircle className="text-gray-500 cursor-pointer hover:text-gray-700 transition" />
            </div>
            <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <FaTimes 
                className="text-gray-600 cursor-pointer hover:text-red-500 transition text-lg" 
                onClick={handleClose} 
              />
            </motion.div>
          </div>

          {/* Modal Description */}
          <div className="my-4 text-gray-700">
            <p className="text-sm">
              Pick a block & configure, any new leads that match rules will be added to sequence automatically.
            </p>
          </div>
{/* This is used to open the modal after we click on add leadSource Button */}
          {/* Sources Section */}
          <div className="flex-1 overflow-y-auto py-2 pr-2">
            <h1 className="text-lg font-semibold mb-3">Sources</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LeadData?.map((data) => (
                <motion.div

                    key={data.id}
                   className="flex cursor-pointer items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-[#10B981] transition"
                  whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                 
                  <div onClick={()=>setLeadsModal(true)} className="flex flex-col">
                    <h2 className="text-sm font-medium">{data.title}</h2>
                    <p className="text-xs text-gray-600">{data.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
      <LeadsFromListModal
      isLeadsModalOpen={isLeadsModalOpen}
      setLeadsModal={setLeadsModal}
      setOpen={setOpen}
      onSubmit={onSubmit}
      />
    </div>
  );
}
