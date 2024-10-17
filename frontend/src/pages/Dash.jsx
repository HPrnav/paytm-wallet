import React from 'react'
import { Appbar } from '../component/Appbar'
import Balance from '../component/Balance'
import { Users } from '../component/User'
import {Group} from '../component/Group'
 
export const Dash=()=>{
  return (
    <div className=" min-h-full bg-gradient-to-r from-sky-200 via-gray-50 to-sky-200 animate-gradient bg-100% bg-0%">
         <Balance></Balance>
        <div className='md:flex gap-0 '>
          <Group></Group>
          <Users ></Users>
         </div>
        
    </div>
   )
}

 