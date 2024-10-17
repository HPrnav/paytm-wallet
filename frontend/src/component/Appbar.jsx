import { useNavigate } from "react-router-dom"
import { Button } from "./Button";

export const Appbar = () => {
    const navigate= useNavigate();

    return<div className="drop-shadow-2xl border border-black  shadow-black h-14 flex justify-between  min-h-full bg-gradient-to-r from-sky-100 via-sky-200 to-sky-100 animate-gradient bg-100% bg-0%">
         <div className="flex flex-row justify-center  pt-1 h-full ml-4 text-blue-500">
            <img className="w-10 h-10"  src="../wallet.png" alt="" />
            <p className="font-mono pt-3 font-bold text-black" > - WALLET PAY -</p>
        </div>

        <div className="flex">
        <button onClick={() => navigate('/dash')} className=" font-bold bg-amber-200 px-2  hover:bg-sky-300 hover:text-gray-100 text-black rounded-md "> HOME</button>

            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    kk
                </div>
            </div>
        </div>
    </div>
}