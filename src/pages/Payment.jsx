import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckOutStep from './CheckOutStep'
import { createBrowserHistory } from 'history'
import { BsCreditCard2BackFill } from 'react-icons/bs'
import { BsCalendar2Date } from 'react-icons/bs'
import { RiShieldKeyholeLine } from 'react-icons/ri'
// import { IoMdHappy } from 'react-icons/ri'
import { useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-hot-toast'
import  { PostOrderFetch } from '../components/OrderSlice/PostOrderSlice'

// const x = sessionStorage.getItem()


function Payment() {
  const history = createBrowserHistory();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ls = localStorage.getItem('PaymentInfo')
  const paymentInfo = ls ? JSON.parse(ls) : ''
  
  const lsSI = localStorage.getItem('ShippingDetails')
  const shippingInfo = lsSI ? JSON.parse(lsSI) : ''
  

  const lsOI = localStorage.getItem('cardItems')
  const orderItems = lsOI ? JSON.parse(lsOI) : ''

  const lsPD = sessionStorage.getItem('paymentdata')
  const priceDetails = lsPD ? JSON.parse(lsPD) : ''

  const token = localStorage.getItem('token')



  const [cardcode, setcardcode] = useState(paymentInfo && paymentInfo.cardcode || '');
  const [date, setdate] = useState( paymentInfo && paymentInfo.date || '');
  const [cvc, setcvc] = useState( paymentInfo && paymentInfo.cvc || '');

  const CardInfo = {
    cardcode,
    date,
    cvc,
  }


  const imtdata = {
    shippingInfo ,
    orderItems ,
    paymentInfo ,
    itemsPrice : priceDetails.itemsPrice ,
    taxPrice : priceDetails.taxPrice ,
    shippingPrice : priceDetails.shippingPrice,
    totalPrice : priceDetails.totalPrice ,
    token ,
  }

  const time = new Date()
  const updateTime = `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} at ${time.getHours()}:${time.getMinutes()} AM`
   
  const HandleSubmit = (w) => {
    w.preventDefault()
    if(cardcode.length !== 14){
      return toast.error(<p className='tracking-wider'>Enter 14 Digit Must !!</p>)
    }
    if(!date.match('\\d{4}-\\d{2}-\\d{2}')){
      return toast.error(<p className='tracking-wider'>Date 14 Digit Must !!</p>)
    }
    alert('Are you sure to ensure this payment ?')
    localStorage.setItem('time' , updateTime )
      // toast.success(`Hurray , Shipping processing </>`)
      localStorage.setItem('PaymentInfo' , JSON.stringify(CardInfo))
      console.log(imtdata)
    { ls && lsOI && lsPD && lsSI && token && dispatch(PostOrderFetch(imtdata)) }
      navigate('/success')
    }
  return (
    <>
      <CheckOutStep activeSteps={2} />
    <div className='paymain'>
      <div className="paycontainer m-auto block">
        <h1 className='font-medium tracking-wide  text-center border-b-2 pb-3 mb-4 pl-2  my-2 border-gray-500 text-2xl'>Card Requiment</h1>
        <form action="" onSubmit={HandleSubmit} className='frompayment'>
          <div>
            <BsCreditCard2BackFill className='iconpayment' />
            <input type="text" placeholder='Card Code' value={cardcode} onChange={(w) => setcardcode(w.target.value)} required/>
          </div>
          <div>
            <BsCalendar2Date className='iconpayment' />
            <input type='text' placeholder='YYYY-MM-DD' value={date} onChange={(w) => setdate(w.target.value)} required/>
          </div>
          <div>
            <RiShieldKeyholeLine className='iconpayment'/>
            <input type="text" placeholder='CVC ' value={cvc} onChange={(w) => setcvc(w.target.value)} required />
          </div>
          <button className='py-3 w-full text-white bg-orange-600'>Payment - {priceDetails.totalPrice} Taka</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Payment