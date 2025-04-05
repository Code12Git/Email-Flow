import LeadNode from "../../nodes/LeadNode";
import {
  ADD_NODE,
  UPDATE_NODE,
  NODE_CREATION_REQUEST,
  DELETE_NODE,
} from "../actionTypes/actionTypes";
import { NodePayload } from "../../types";

const initialState = {
  nodesData: [
    {
      id:"12",
      position:{x:100,y:-200},
      type: "leadNode",
    },
    {
      id: "1",
      data: { label: "Sequence Start Point" },
      position: { x: 100, y: 100 },
      style: {
        background: "#10B981",
        color: "white",
        border: "2px solid #059669",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        width: "15%",
      },
      type: LeadNode,
    },
    {
      id: "2",
      data: { label: "+" },
      position: { x: 100, y: 250 },
      style: {
        background: "#3B82F6",
        color: "white",
        border: "2px solid #2563EB",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        width: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      type: "output",
    },
  ],
  edgesData: [
    {
      id: "1-2",
      source: "1",
      target: "2",
      labelStyle: {
        fill: "#1F2937",
        fontWeight: "bold",
        fontSize: "12px",
      },
      labelBgStyle: {
        fill: "#E5E7EB",
        opacity: 0.9,
        rx: 4,
        ry: 4,
      },
      type: "straight",
      style: { stroke: "#6B7280", strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", color: "#6B7280" },
    },
  ],
};



console.log(initialState.nodesData);

const nodesReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: NodePayload }
) => {
  switch (type) {
    case ADD_NODE:
      console.log("payload", payload);
      return {
        ...state,
        nodesData: [
          ...state.nodesData,
          {
            id: payload.id,
            type: payload.type,
            position: payload.position,
            data: payload.data,
          },
        ],
      };
    case UPDATE_NODE:
      return {
        ...state,
        nodesData: state.nodesData.map((node) =>
          node.id === (payload as NodePayload).id
            ? { ...node, position: (payload as NodePayload).position }
            : node
        ),
      };

    case NODE_CREATION_REQUEST: {
      const { originalNodeId, newNodeData } = payload;
      console.log(
        "OriginalNodeId:",
        originalNodeId,
        "NewNodeId:",
        newNodeData
      );

      const {  time } = newNodeData;
      const plusNode = state.nodesData.find((node) => node.id === "2");
      if (!plusNode) return state;

      const nodeType =
        newNodeData.type === "delayNode" ? "waitTimeNode" : "emailNode";

      const nodeLabels = {
        emailNode: `📧 Email ${newNodeData.emailData?.subject || "New Email"} to ${newNodeData.emailData?.recipient || "Recipient"}`,
        waitTimeNode: `⏳ Wait Time is ${time?.hours} Hours ${time?.minutes} Minutes`,
      };

      const newNode = {
        id: `node-${Date.now()}`,
        type: nodeType,
        position: { ...plusNode.position },
        data: {
          label: nodeLabels[nodeType],
          ...(nodeType === "waitTimeNode" && {
            time: {
              hours: time?.hours || 0,
              minutes: time?.minutes || 0,
            },
          }),
        },
        style: {
          background: nodeType === "emailNode" ? "#E0F2FE" : "#FEF3C7",
          color: "#0F172A",
          border: `2px solid ${
            nodeType === "emailNode" ? "#0284C7" : "#D97706"
          }`,
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "bold",
          width: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
      };

      const updatedPlusNode = {
        ...plusNode,
        position: { x: plusNode.position.x, y: plusNode.position.y + 100 },
      };

      const previousEdges = state.edgesData.map((edge) =>
        edge.target === plusNode.id ? { ...edge, target: newNode.id } : edge
      );

      const newEdge = {
        id: `edge-${newNode.id}-plus`,
        source: newNode.id,
        target: plusNode.id,
        type: "customEdge",
        animated: true,
        style: { stroke: "#3B82F6", strokeWidth: 2 },
      };

      return {
        ...state,
        nodesData: [
          ...state.nodesData.filter((node) => node.id !== "2"),
          newNode,
          updatedPlusNode,
        ],
        edgesData: [...previousEdges, newEdge],
      };
    }
    case DELETE_NODE: {
      const nodeIdToDelete = payload.id;

      const updatedNodes = state.nodesData.filter(
        (node) => node.id !== nodeIdToDelete
      );

      const updatedEdges = state.edgesData.filter(
        (edge) =>
          edge.source !== nodeIdToDelete && edge.target !== nodeIdToDelete
      );

      return {
        ...state,
        nodesData: updatedNodes,
        edgesData: updatedEdges,
      };
    }

    default:
      return state;
  }
};

export default nodesReducer;
