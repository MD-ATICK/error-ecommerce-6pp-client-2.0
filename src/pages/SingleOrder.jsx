import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { GetSingleOrderFetch } from '../components/OrderSlice/GetSingleOrderSlice'

function SingleOrder() {

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { products, loading } = useSelector((state) => state.GetSingleOrderData)
  useEffect(() => {
    dispatch(GetSingleOrderFetch([id, token]))
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {
        products && <div className='singleorder flex justify-evenly items-center h-screen mx-14'> <div className="main-info left mt-16">
          <p className='text py-2' >User ID : <span className='text-green-700 text-lg'>{products.users._id}</span></p>
          <p className='text py-2' >Name : <span className='text-green-700 text-lg'>{products.users.name}</span></p>
          <p className='text py-2' >Email :  <span className='text-green-700 text-lg'>{products.users.email}</span></p>
          <p className='text py-2' >Order Status : <span className='text-green-700 text-lg'>{products.orderStatus}</span></p>
          <p className='text py-2' >Create At : <span className='text-green-700 text-lg'>{products.createTime}</span></p>
            <h1 className='h1z mt-4'>This Order Items</h1>
          <div className="itemsorder h-80 mt-3 overflow-scroll">
            {products.orderItems.map((order) => {
              return <div key={order._id} className='flex justify-between tracking-wider mx-20 mt-2 items-center'>
                <img className='w-14' src={order.images} alt="" />
                <p>{order._id}</p>
                <p>{order.productname}</p>
                <p></p>
                <p>{order.quantity}</p>
              </div>
            })}
          </div>
        </div>
          <div className="right">
               <div className='border-2 p-6 border-gray-500'>
                <div className='flex text justify-between items-center py-6'>
                  <p>Subtotal :</p>
                  <span>${products.itemsPrice}</span>
                </div>
                <div className='flex text justify-between items-center py-6 pb-10'>
                  <p>Tax Price :</p>
                  <span>${products.taxPrice}</span>
                </div>
                <div className='flex text justify-between items-center py-6 pb-10 border-b-2 border-gray-500'>
                  <p>Shipping Tax :</p>
                  <span>${products.shippingPrice}</span>
                </div>
                <div className='flex text justify-between items-center py-4'>
                  <p className='font-medium text-lg'>Total :</p>
                  <span>${products.totalPrice}</span>
                </div>
                
                {/* <button className='py-3 w-full bg-orange-600 text-white text mt-9' onClick={() => navigate('/payment')} >Process To Payment</button> */}
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SingleOrder;