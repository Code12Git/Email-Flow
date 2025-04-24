import React from "react"
import { Toaster } from "react-hot-toast"
import Routing from "./routes/Routing"
const App = () => {
  return (
    <React.Fragment>
    <Toaster />
    <Routing />
    </React.Fragment>
  )
}

export default App