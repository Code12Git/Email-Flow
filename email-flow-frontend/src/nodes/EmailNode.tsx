import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store"; // Adjust the path to your store file
import { Handle, Position, NodeProps } from "reactflow";
import { deleteNode } from "../redux/action/nodes";
type EmailNodeData = {
  subject?: string;
  body?: string;
  from?: string;
  label?: string;
  nodeId: string;  
  emailData?: {
    subject?: string;
    recipient?: string;
  };
};


export default function EmailNode({ data }: NodeProps<EmailNodeData>) {
const dispatch: AppDispatch = useDispatch();
    const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteNode(data.nodeId))
  }

  return (
    <div className="email-node" style={styles.emailNode}>
      <div className="flex items-center gap-16" style={styles.header}>
        <div className="flex items-center ">
          <div className="email-icon" style={styles.icon}>
            📧
          </div>
          <div className="email-title" style={styles.title}>
            Email
          </div>
        </div>
        <div>
          <button
            className="cursor-pointer"
            onClick={handleDelete}
          >
            ❌
          </button>
        </div>
      </div>

      <div className="email-content" style={styles.content}>
        {data?.emailData?.subject && (
          <div className="email-subject" style={styles.subject}>
            <strong>Subject:</strong> {data.emailData.subject}
          </div>
        )}

        {data?.emailData?.recipient && (
          <div className="email-recipient" style={styles.recipient}>
            <strong>To:</strong> {data.emailData.recipient}
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Top} style={styles.handle} />
      <Handle type="source" position={Position.Bottom} style={styles.handle} />
    </div>
  );
}

const styles = {
  emailNode: {
    backgroundColor: "#f0f9ff",
    borderRadius: "8px",
    border: "2px solid #0284c7",
    padding: "12px 16px",
    width: "240px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "8px",
  },
  icon: {
    fontSize: "20px",
    marginRight: "8px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#0369a1",
  },
  content: {
    fontSize: "12px",
    lineHeight: "1.4",
  },
  subject: {
    marginBottom: "6px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  recipient: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#64748b",
  },
  handle: {
    backgroundColor: "#0284c7",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
};
