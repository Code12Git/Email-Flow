import { useDispatch } from 'react-redux';
import { deleteNode } from '../redux/action/nodes';

const CustomNode = ({ id, data }) => {
  const dispatch = useDispatch();

  return (
    <div 
      style={{
        background: "#E0F2FE",
        border: "2px solid #0284C7",
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "150px",
      }}
    >
      <span>{data.label}</span>
      <button 
        onClick={() => dispatch(deleteNode(id))}
        style={{
          marginLeft: '10px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        ❌
      </button>
    </div>
  );
};

export default CustomNode;
