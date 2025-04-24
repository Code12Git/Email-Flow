import * as React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser, FiMail, FiAlignLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { nodeCreation } from "../../redux/action/nodes";
import { generateEmailBody } from "../../helpers/openai";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: "16px",
  boxShadow: 24,
  outline: "none",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
};

type Props = {
  isColdEmailModalOpen: boolean;
  setIsColdEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

interface EmailData {
  recipient: string;
  subject: string;
  body: string;
}

const ColdEmailModal: React.FC<Props> = ({ isColdEmailModalOpen, setIsColdEmailModalOpen, onClose }) => {
  const [emailData, setEmailData] = React.useState<EmailData>({
    recipient: "",
    subject: "",
    body: "",
  });

  const [error, setError] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();

  const emailDataChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

  const submitEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailData.recipient.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!emailData.subject) {
      setError("Subject is required");
      return;
    }
    if (!emailData.body) {
      setError("Message is required");
      return;
    }

    dispatch(nodeCreation(emailData, "EmailNode"));
    setEmailData({ recipient: "", subject: "", body: "" });
    onClose();
  };

  return (
    <Modal open={isColdEmailModalOpen}>
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
            <button
              onClick={() => setIsColdEmailModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <form className="mt-6 space-y-4">
            <FormInput
              icon={<FiUser />}
              label="Recipient Email"
              type="email"
              name="recipient"
              onChange={emailDataChangeHandler}
              value={emailData.recipient}
              placeholder="example@company.com"
              required
            />

            <FormInput
              icon={<FiMail />}
              label="Subject"
              type="text"
              name="subject"
              onChange={emailDataChangeHandler}
              value={emailData.subject}
              placeholder="Regarding potential collaboration"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiAlignLeft className="mr-2" />
                <span>Email Body</span>
              </label>
              <textarea
                name="body"
                value={emailData.body}
                rows={6}
                onChange={emailDataChangeHandler}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your email content here..."
                required
              />
            </div>

            <div className="flex justify-end gap-2 space-x-3 pt-4">
              <Button
                type="button"
                onClick={() => setIsColdEmailModalOpen(false)}
                className="!text-gray-700 !bg-white !border !border-gray-300 !hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={submitEmail}
                className="!bg-blue-600 !text-white !hover:bg-blue-700"
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
    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
);

export default ColdEmailModal;
