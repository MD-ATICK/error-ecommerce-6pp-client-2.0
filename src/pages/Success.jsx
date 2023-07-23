import React from 'react'
import { Link } from 'react-router-dom'
import {MdOutlineDone} from 'react-icons/md'

function Succes() {
  const s = sessionStorage.getItem('paymentdata')
  const { totalPrice } = JSON.parse(s)
  return (
    <div className='h-screen flex flex-col border-4 justify-center items-center'>
      <div className="text-center">
        <MdOutlineDone className='text-9xl p-4 m-12 mx-auto bg-orange-700 rounded-full text-white'/>
        <h1 className='textShipping'>Your <span>{totalPrice}/- </span>  Order Placed Procceing SuccessFully</h1>
        <Link to='/order/me' className='py-3 px-9 mt-12 block mx-20 bg-stone-700 text-center text-white tracking-wider text'>View Orders</Link>
      </div>
    </div>
  )
}

export default Succes