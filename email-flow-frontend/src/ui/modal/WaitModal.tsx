import * as React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { nodeCreation } from "../../redux/action/nodes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

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

interface WaitModalProps {
  isWaitModalOpen: boolean;
  onClose: () => void;
  setIsWaitModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}



export const WaitModal: React.FC<WaitModalProps> = ({ isWaitModalOpen,setIsWaitModalOpen, onClose }) => {
  const [waitTime, setWaitTime] = React.useState({
    hours: 0,
    minutes: 30, 
  });

  const dispatch = useDispatch<AppDispatch>()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWaitTime(prev => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    dispatch(nodeCreation( waitTime, 'DelayNode'))

    onClose();
  };
  

  return (
    <Modal open={isWaitModalOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={modalStyle} className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <BiTimeFive className="mr-2 text-green-500" size={24} />
              Add Wait Time
            </h2>
            <button onClick={()=>setIsWaitModalOpen(false)} className="text-gray-500 hover:text-gray-700  cursor-pointer transition">
              <AiOutlineClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours
                </label>
                <input
                  type="number"
                  name="hours"
                  min="0"
                  max="24"
                  value={waitTime.hours}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minutes
                </label>
                <input
                  type="number"
                  name="minutes"
                  min="0"
                  max="59"
                  value={waitTime.minutes}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end space-x-3">
              <Button
                type="button"
                onClick={()=>setIsWaitModalOpen(false)}
                variant="outlined"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add Wait Time
              </Button>
            </div>
          </form>
        </Box>
      </motion.div>
    </Modal>
  );
};