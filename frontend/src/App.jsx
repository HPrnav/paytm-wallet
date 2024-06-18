 import React from 'react'
 import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom"
 import {Signup} from './pages/Signup'
 import {Signin} from './pages/Signin'
 import {Dash} from './pages/Dash'
 import {SendMoney} from './pages/SendMoney'
 import {Receipt} from './pages/Receipt'
 
 function App() {
   return (
    <BrowserRouter>
        <Routes >
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dash" element={<Dash/>} />
          <Route path="/send" element={<SendMoney/>} />
          <Route path="/receipt" element={<Receipt/>}></Route>
        </Routes>
      </BrowserRouter>
    )
 }
 
 export default App