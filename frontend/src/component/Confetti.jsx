 import React from 'react'
 import { useState,useEffect } from 'react'
 import ReactConfetti from "react-confetti"

 function Confetti() {
    const [dimension,setdimension]=useState({width:Window.innerWidth,height:Window.innerHeight})

    useEffect(()=>{
        function setvalue(){
            setdimension({width:Window.innerWidth,height:Window.innerHeight})
        }
        window.addEventListener('resize',setvalue)
        return ()=>{
            window.removeEventListener('resize',setvalue)
        }
    },[dimension])


   return (
     <ReactConfetti width={dimension.width} height={dimension.height} ></ReactConfetti>
   )
 }
 
 export default Confetti