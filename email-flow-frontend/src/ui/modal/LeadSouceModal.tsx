import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaArrowRight, FaPlus, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { LeadData } from "../../data/LeadData";
import LeadsFromListModal from "./LeadsFromListModal";
import { motion } from "framer-motion";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "1000px",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  outline: "none",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export default function LeadSourceModal() {
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [data, setData] = React.useState<SelectedListDetails[]>([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLeads = () => setIsModalOpen(true);
  const handleListClose = () => {
    setIsModalOpen(false);
    setOpen(false);
  };

  interface SelectedListDetails {
    id: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Add additional properties if needed
  }

  const onSubmit = (selectedListsDetails: SelectedListDetails[]) => {
    setData(selectedListsDetails);
  };

  console.log(data)
  return (
<div className={`${data.length>0 ? 'ml-64' : 'ml-0'}`}>
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

          {/* Sources Section */}
          <div className="flex-1 overflow-y-auto py-2 pr-2">
            <h1 className="text-lg font-semibold mb-3">Sources</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LeadData?.map((data) => (
                <motion.div
                  key={data.id}
                  onClick={handleLeads}
                  className="flex cursor-pointer items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-[#10B981] transition"
                  whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={data.src} 
                    alt={data.title}
                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-300" 
                  />
                  <div className="flex flex-col">
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
      onSubmit={onSubmit} 
        open={isModalOpen} 
        onClose={handleListClose} 
      />
    </div>
  );
}