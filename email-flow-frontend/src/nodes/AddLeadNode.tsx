import LeadSourceModal from "../ui/modal/LeadSouceModal"
// import { Handle, Position } from 'reactflow';

const AddLeadNode = () => {
  // 🔍 1. Missing or Incorrect Handles on Custom Nodes
// If you're using a custom node type like AddLeadNode, React Flow needs Handle components defined inside that custom node to know where edges can connect.
  return (
    <div>
        <LeadSourceModal />
        {/* <Handle type="source" position={Position.Bottom} id="a" />

{/* Handle to allow connection TO this node */}
{/* <Handle type="target" position={Position.Top} id="b" /> */}
    </div>
  )
}

export default AddLeadNode