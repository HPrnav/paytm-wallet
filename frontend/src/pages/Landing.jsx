import React from 'react'
import { useNavigate } from 'react-router-dom'
;
export const Landing = () => {
    const navigate=useNavigate();
  return (
    <>
    <div> 
        <section className="bg-white dark:bg-sky-200">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight  text-amber-600 leading-none md:text-5xl xl:text-6xl ">WALLET-PAY</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">From payment transaction to splitting among friends tracking the payment stack all at one place .</p>
                    <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800">
                        Get started
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    
                    <a href="#" onClick={()=>{navigate('/signup') }} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-100 border border-gray-300 rounded-lg bg-amber-600 focus:ring-4 focus:ring-gray-100">
                        SIGNUP
                    </a> 
                    <a href="#" onClick={()=>{navigate('/signin') }} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-100 border border-gray-300 rounded-lg bg-amber-600 focus:ring-4 focus:ring-gray-100">
                        SIGNIN
                    </a> 
                    
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="../wallet.png" alt="mockup"></img>
                </div>                
            </div>
        </section>
    </div>
    </>
  )
}
