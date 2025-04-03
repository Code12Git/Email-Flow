
import { useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Routing from './routes/Routing';
import { ReactFlowProvider } from '@xyflow/react';


function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]); 

 


  return (
    <div> 
      <Toaster />
      <ReactFlowProvider>
      <Routing />
      </ReactFlowProvider>
    </div>
  )
}

export default App
