import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FaPlus, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { LeadData } from "../../data/LeadData";
import LeadsFromListModal from "./LeadsFromListModal";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 450,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function LeadSourceModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleLeads = () => {
    setIsModalOpen(true);  
  };
  const handleListClose = () => {
     setIsModalOpen(false)
     setOpen(false)
  }
  return (
    <div>
      <Button onClick={handleOpen} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
        <FaPlus />
        Add Source
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Add a Source Block</h1>
              <FaQuestionCircle className="text-gray-500 cursor-pointer hover:text-gray-700 transition" />
            </div>
            <FaTimes className="text-gray-600 cursor-pointer hover:text-red-500 transition text-lg" onClick={handleClose} />
          </div>

          {/* Modal Description */}
          <div className="my-4 text-gray-700">
            <p className="text-sm">
              Pick a block & configure, any new leads that match rules will be added to sequence automatically.
            </p>
          </div>

          {/* Sources Section */}
          <div className="max-h-72 overflow-auto p-4">
            <h1 className="text-lg font-semibold mb-3">Sources</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LeadData?.map((data) => (
                <div onClick={handleLeads} key={data.id} className="flex cursor-pointer items-center gap-3 bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition">
                  <img src={data.src} alt="leadfromlist" className="w-14 h-14 object-cover rounded-full border border-gray-300" />
                  <div className="flex flex-col">
                    <h2 className="text-sm font-medium">{data.title}</h2>
                    <p className="text-xs text-gray-600">{data.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
      <LeadsFromListModal 
        open={isModalOpen} 
        onClose={handleListClose} 
      />
    </div>
  );
}
