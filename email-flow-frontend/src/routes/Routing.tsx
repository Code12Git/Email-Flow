import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";

const Routing = () => {
  return (
    <Routes>
      <Route>
      <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Route>
    </Routes>
  );
};

export default Routing;