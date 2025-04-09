import "./App.css";
import { Toaster } from "react-hot-toast";
import Routing from "./routes/Routing";
import Navbar from "./base/Navbar";
 
function App() {


  return (
    <>
       <Toaster />
       <Navbar />
      <Routing />
      </>
   );
}

export default App;
