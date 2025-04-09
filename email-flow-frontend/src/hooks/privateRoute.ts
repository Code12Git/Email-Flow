import { useNavigate } from "react-router";

interface PrivateRouteProps {
    children: React.ReactNode;
  }
  
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {  
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const  navigate = useNavigate();

  if (user && token) {
    return children;
  }
  
  navigate("/login", { replace: true });
  return null;
};

export default PrivateRoute;