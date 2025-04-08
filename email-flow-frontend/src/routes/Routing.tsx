import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FlowWrapper from "../pages/Dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<FlowWrapper />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
