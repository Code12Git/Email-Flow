// Importing required dependencies
import { useDispatch } from 'react-redux'; // For Redux state management
import { Handle, Position, NodeProps, Node } from '@xyflow/react'; // React Flow types and components
import { AppDispatch } from '../redux/store'; // Type for Redux dispatch
import { deleteNode } from '../redux/action/nodes';

/**
 * Type definition for the data structure specific to Delay Nodes
 * This matches what's stored in React Flow's node data
 */
type DelayNodeData = {

    hours: number,
    minutes: number
};


type DelayFlowNode = Node<DelayNodeData>;
/**
 * DelayNode Component
 * A custom node for React Flow that represents a waiting period in the email sequence
 * 
 * @param {NodeProps<DelayNodeData>} props - React Flow node properties with our custom data type
 * @returns {JSX.Element} - Rendered delay node UI
 */
export default function DelayNode({ data, id }: NodeProps<DelayFlowNode>) {
  // Debugging: Log node data to console
  console.log(data)

  // Get Redux dispatch function with proper TypeScript typing
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handles node deletion when the delete button is clicked
   * @param {React.MouseEvent} e - Mouse event from the click
   */
  const deleteHandler = (e: React.MouseEvent) => {
    e.preventDefault();  
    if (id) {
      dispatch(deleteNode(id));  
    } else {
      console.error("Node ID is undefined. Cannot delete node.");
    }
  };

  return (
    <div className="p-4 bg-white border border-purple-200 rounded-lg shadow-sm w-48">
      {/* Node Header Section */}
      <div className="flex items-center mb-2 gap-5">
        {/* Left side: Node icon and title */}
        <div className='flex items-center'>
          <div className="mr-2">⏳</div> {/* Wait/Delay emoji */}
          <div className="font-medium">Wait/Delay</div> {/* Node title */}
        </div>

        {/* Right side: Delete button */}
        <div>
          <button
            className='cursor-pointer' // Makes it clear this is clickable
            onClick={deleteHandler} // Attaches our delete handler
            aria-label="Delete node" // Accessibility improvement
          >
            ❌ {/* Delete icon */}
          </button>
        </div>
      </div>

      {/* Time Display Section */}
      <div className="text-xs">
        {/* Shows hours if specified, otherwise 0 */}
        {data?.hours || 0}h 
        {/* Shows minutes if specified, otherwise 0 */}
        {data?.minutes || 0}m
      </div>

      {/* React Flow Handles for Connections */}
      <Handle 
        type="target" // This is where connections FROM other nodes will attach
        position={Position.Top} // Placed at the top of the node
      />
      <Handle 
        type="source" // This is where connections TO other nodes will originate
        position={Position.Bottom} // Placed at the bottom of the node
      />
    </div>
  );
}