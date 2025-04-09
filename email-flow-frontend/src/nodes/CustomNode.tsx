
import React from "react";

interface CustomNodeProps {
  data: {
    deleteNode?: () => void;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {

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
      {/* <span>{data.label}</span> */}
      <button onClick={(e) => {
  e.stopPropagation();
  data.deleteNode?.();
}}>
  ❌
</button>
    </div>
  );
};

export default CustomNode;
