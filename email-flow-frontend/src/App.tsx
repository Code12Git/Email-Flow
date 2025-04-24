import React from "react"
import { Toaster } from "react-hot-toast"
import Routing from "./routes/Routing"
import Navbar from "./base/Navbar";
const App = () => {
  return (
    <React.Fragment>
      
    <Toaster />
    <Navbar />
    <Routing />
    </React.Fragment>
  )
}

export default App