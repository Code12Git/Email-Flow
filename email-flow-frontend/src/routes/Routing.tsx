import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FlowWrapper from "../pages/Dashboard";
import PrivateRoute from "../hooks/privateRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><FlowWrapper /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
