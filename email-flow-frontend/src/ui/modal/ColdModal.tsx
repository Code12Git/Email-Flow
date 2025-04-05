import * as React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser, FiMail, FiAlignLeft } from "react-icons/fi";
import { EmailFormData } from "../../types";
import { useDispatch } from "react-redux";
import { nodeCreationRequest } from "../../redux/action/nodes";
import { generateEmailBody } from "../../helpers/openai";
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
  maxHeight: "90vh",
  overflowY: "auto",
};

interface ColdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emailData: EmailFormData) => void;
}



export const ColdModal: React.FC<ColdModalProps> = ({ isOpen, onClose }) => {
  const [emailData, setEmailData] = React.useState<EmailFormData>({
    recipient: "",
    subject: "",
    body: "",
  });
  const dispatch = useDispatch()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setEmailData(prev => ({ ...prev, [name]: value }));
  
    if (name === "subject" && emailData.body.trim() === "") {
      try {
        const generated = await generateEmailBody(value);
        setEmailData(prev => ({ ...prev, body: generated }));
      } catch (err) {
        console.error("Failed to auto-generate email body:", err);
      }
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailData)
    dispatch(nodeCreationRequest("3", { type: "emailNode", label: "Send Email", emailData }));
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={modalStyle} className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FiMail className="mr-2 text-blue-500" size={24} />
              Compose Cold Email
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
              <AiOutlineClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <FormInput 
              icon={<FiUser />}
              label="Recipient Email"
              name="recipient"
              type="email"
              value={emailData.recipient}
              onChange={handleChange}
              placeholder="example@company.com"
              required
            />

            <FormInput 
              icon={<FiMail />}
              label="Subject"
              name="subject"
              type="text"
              value={emailData.subject}
              onChange={handleChange}
              placeholder="Regarding potential collaboration"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1   items-center">
                <FiAlignLeft className="mr-2" />
                Email Body
              </label>
              <textarea
                name="body"
                value={emailData.body}
                onChange={handleChange}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your email content here..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
              >
                Send Email
              </Button>
            </div>
          </form>
        </Box>
      </motion.div>
    </Modal>
  );
};

const FormInput: React.FC<{
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>> = ({ icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
);