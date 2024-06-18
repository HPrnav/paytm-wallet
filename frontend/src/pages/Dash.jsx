import React from 'react'
import { Appbar } from '../component/Appbar'
import Balance from '../component/Balance'
import { Users } from '../component/User'
 
export const Dash=()=>{
  return (
    <div className=''>
        <Appbar></Appbar>
        <Balance></Balance>
        <Users></Users>
    </div>
   )
}

 