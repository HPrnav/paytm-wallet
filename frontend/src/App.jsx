 import React from 'react'
 import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom"
 import {Signup} from './pages/Signup'
 import {Signin} from './pages/Signin'
 import {Dash} from './pages/Dash'
 import {SendMoney} from './pages/SendMoney'
 import {Receipt} from './pages/Receipt'
 import { Create_group } from './component/Create_group'
 import { Group } from './component/Group'
 import Split from './component/Split'
 import { Appbar } from './component/Appbar'
 import { Landing } from './pages/Landing'

 function App() {
   return (
    <div>
     <BrowserRouter>
      <Appbar></Appbar>
        <Routes >
          <Route path='/' element={<Landing/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dash" element={<Dash/>} />
          <Route path="/send" element={<SendMoney/>} />
          <Route path="/receipt" element={<Receipt/>}></Route>
          <Route path ="/Create_group" element={<Create_group></Create_group>}></Route>
          <Route path ="/Group" element={<Group></Group>}></Route>
          <Route path ="/Split" element={<Split></Split>}></Route>


        </Routes>
      </BrowserRouter>

    </div>
    )
 }
 
 export default App