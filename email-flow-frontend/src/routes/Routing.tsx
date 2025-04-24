import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FlowWrapper from "../pages/Dashboard";
import PrivateRoute from "../hooks/privateRoute";
import FrontPage from "../pages/FrontPage";
import { useEffect, useState } from "react";

const Routing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!(localStorage.getItem("user") && localStorage.getItem("token"))
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setIsAuthenticated(true);
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <PrivateRoute>
              <FlowWrapper />
            </PrivateRoute>
          ) : (
            <FrontPage />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
