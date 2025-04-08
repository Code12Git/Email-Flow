import * as React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { ColdModal } from "./ColdModal";
import { WaitModal } from "./WaitModal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: "16px",
  boxShadow: 24,
  outline: "none",
  width: 500,
};

function DelayTaskModal({
  isModalOpen,
  setIsModalOpen,
  edge
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  edge: boolean | null;
}) {
  const [coldEmailModalOpen, setColdEmailModalOpen] = React.useState(false);
  const [waitModalOpen, setWaitModalOpen] = React.useState(false);

  const handleClose = () => setIsModalOpen(false);

  const handleEmailSubmit = (emailData: any) => {
    console.log("Email data submitted:", emailData);
    setColdEmailModalOpen(false);
    setIsModalOpen(false);
    
  };

  const handleWaitSubmit = (waitTime: { hours: number; minutes: number }) => {
    console.log("Wait time submitted:", waitTime);
    const totalMinutes = waitTime.hours * 60 + waitTime.minutes;
    console.log("Total wait minutes:", totalMinutes);
    setWaitModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal open={isModalOpen} onClose={handleClose}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center min-h-screen"
        >
          <Box sx={modalStyle} className="p-6 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Add Blocks</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
                onClick={() => setColdEmailModalOpen(true)}
              >
                <div className="p-3 bg-blue-500 text-white rounded-lg">
                  <AiOutlineMail size={28} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Cold Email</h3>
                  <p className="text-sm text-gray-600">Send an email to a lead.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
                onClick={() => setWaitModalOpen(true)}
              >
                <div className="p-3 bg-green-500 text-white rounded-lg">
                  <BiTimeFive size={28} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Wait Time</h3>
                  <p className="text-sm text-gray-600">Add a delay between steps.</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleClose}
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          </Box>
        </motion.div>
      </Modal>

      <ColdModal 
        isOpen={coldEmailModalOpen} 
        onClose={() => setColdEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />

      <WaitModal
        isOpen={waitModalOpen}
        onClose={() => setWaitModalOpen(false)}
        onSubmit={handleWaitSubmit}
      />
    </>
  );
}

export default DelayTaskModal;