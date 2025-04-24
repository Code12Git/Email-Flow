import React, { useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import{ motion} from 'framer-motion'
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import ColdEmailModal from './ColdEmailModal';
import { WaitModal } from './WaitModal';


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
  
type Props ={
    isOpen:boolean;
     setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
 }

// Passing Props to open the modal and changing the state

const EmailTimeModal:React.FC<Props>= ({isOpen,setIsOpen}) => {

    const [isColdEmailModalOpen,setIsColdEmailModalOpen] = useState<boolean>(false);
    const [isWaitModalOpen,setIsWaitModalOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsWaitModalOpen(false)
    setIsColdEmailModalOpen(false)
    setIsOpen(false)
  }
 
  return (
    <>
    <Modal open={isOpen} >
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
              <button onClick={()=>setIsOpen(false)}  className="text-gray-500 cursor-pointer hover:text-gray-700">
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <motion.div 
                onClick={()=>setIsColdEmailModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
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
              onClick={()=>setIsWaitModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
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
                onClick={()=>setIsOpen(false)}
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          </Box>
        </motion.div>
      </Modal>
        <ColdEmailModal isColdEmailModalOpen={isColdEmailModalOpen} setIsColdEmailModalOpen={setIsColdEmailModalOpen} onClose={onClose}/>
        <WaitModal isWaitModalOpen={isWaitModalOpen} setIsWaitModalOpen={setIsWaitModalOpen}  onClose={onClose}/>
        </>
  )
}

export default EmailTimeModal