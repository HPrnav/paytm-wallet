import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Confetti from "../component/Confetti"
import { useRef } from "react";
import { Receipt } from "./Receipt";
import generatePDF from"react-to-pdf"

export const SendMoney=()=>{
    const targetref=useRef();

    const [SearchParams]=useSearchParams();
    const id=SearchParams.get('id')
    const name=SearchParams.get('name')
    const [showConfetti, setShowConfetti] = useState(false);
    
    const [amount,setamount]=useState(0);
    console.log(name)
return (
    <div className="flex justify-center h-screen bg-gray-300  ">
        {showConfetti && <Confetti/>}
        <div className="flex flex-col justify-center">
            <div className=" flex flex-col gap-5 w-80 h-80 bg-white rounded-xl shadow-black shadow-xl p-4 ">
                 
                <div className="text-center p-3 font-bold text-2xl text-blue-500">SEND MONEY</div>
                <div className="flex gap-2">
                    <div className="rounded-full h-12 w-12 bg-yellow-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">{name[0].toUpperCase()}</div>
                    </div>
                    <p className="font-bold text-2xl">{name.toUpperCase()}</p>
                </div>
                <div className="flex flex-col gap-5">
 
                        <input type="Integer"  onChange={(e)=>{setamount(e.target.value)}}
                        placeholder="Enter Your Amount" className="p-2 w-full border border-black rounded-md" />
                        <button className="w-full p-1 hover:bg-blue-950 text-white font-bold bg-blue-400 rounded-xl " 
        
                        onClick={
                            async()=>{
                            try {
                                const response=await axios.post("http://localhost:3000/api/v1/account/transfer",{
                                    to:id,
                                    amount
                                },{
                                    headers:{
                                        Authorization:"Bearer "+localStorage.getItem("token")
                                    }
                                })
                                console.log(response +"----"+response.status)
                                if (response.status === 200) {
                                    setShowConfetti(true);
                                    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
                                } else {
                                    alert('ERROR !!! in Transaction');
                                }
    
                            }catch (error) {
                                alert("ERROR !!! in Transaction")
                                return ;
                            }

                        }}
                        >INITIATE TRANSFER</button>
                        <button  className="w-full p-1 text-white font-bold bg-blue-400 rounded-xl "
                        onClick={()=>{
                            generatePDF(targetref,{filename:name+ +".pdf"})
                        }
                        }
                        >DOWNLOAD RECIEPT</button>
                        <div className="opacity-0">

                            <div ref={targetref} className=" ">
                                <Receipt from={localStorage.getItem("username")} to={name} amount={amount} id={id} />
                            </div>
                        </div>


                </div>

            </div>
            
            
        </div>

    </div>
)
}