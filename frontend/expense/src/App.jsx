import React from "react"
import {BrowserRouter as Router , 
      Routes,
      Route,
      Navigate
} from "react-router-dom"

import Nav from "./components/layout/NavBar"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/dashboard/Home"
import Income from "./pages/dashboard/Income"
import Expense from "./pages/dashboard/Expense"
function App() {


  return (
    <>
     
      <Router> 
        <Nav></Nav>
        <Routes>
            <Route path="/" element={<Root/>}/>
            <Route path="/login" exct element={<Login/>} /> 
            <Route path="/signup" exct element={<SignUp/>} />
            <Route path="/dashboard" exct element={<Home/>}/>
            <Route path="/income" exct element={<Income/>}/>
            <Route path="/expense" exct element={<Expense/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

const Root = () => {
  // check if exsit 
  const isAuthLocated = !!localStorage.getItem("token");

  // 
  return isAuthLocated ? (<Navigate to="/Login"/>
      
  ) : (
      <Navigate to="/dashboard"/>
  )
}