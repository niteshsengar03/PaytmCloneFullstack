import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { SendMoney } from "./pages/SendMoney"
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element ={<Signup/>}/>
        <Route path = "/sendmoney" element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
