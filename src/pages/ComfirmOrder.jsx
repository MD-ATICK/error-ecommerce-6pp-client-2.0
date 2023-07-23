import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import CheckOutStep from './CheckOutStep'
import Cookies from 'universal-cookie'

function ComfirmOrder() {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const x = localStorage.getItem('cardItems')
    const y = localStorage.getItem('ShippingDetails')
    let total = 0
    const AllCard = JSON.parse(x)
    const ShipppingDetails = JSON.parse(y)
    const {products , loading} = useSelector((state) => state.AboutMe)
    const [subtotal, setsubtotal] = useState(0);
    const paymentdata = {
        itemsPrice : subtotal ,
        taxPrice : subtotal * 0.04 ,
        shippingPrice : subtotal * 0.08 ,
        totalPrice : subtotal + subtotal * 0.04 ,
    }
    sessionStorage.setItem('paymentdata' , JSON.stringify(paymentdata))

/* SOME EXPRRIMENT OF COOKIES */
//     document.cookie = `username =${JSON.stringify(paymentdata)}`
//     let xy = cookies.get('username')
//     let username = document.cookie.split('=')[1];
//    subtotal > 1 && console.log(JSON.parse(username))


    useEffect(() => {
        setsubtotal(total)
    }, [total]);
    return (
        <div>
            {loading && <Loader/>}
            <CheckOutStep activeSteps={1} />
            <div className="comfirmOrderPage">
                <div className='left'>
                    <div className="confirmShippingArea">
                        <h1 className='font-medium tracking-wide border-l-4 pl-2 rounded-md my-2 border-solid border-orange-600 text-2xl'>Shipping Info</h1>

                        <div className="confirmShippingbox text">
                            <div>
                                <p >Name : </p>
                                <span className='textz text-green-700'>{products && products.Profile.name}</span>
                            </div>
                            <div>
                                <p>Phone No : </p>
                                <span className='textz text-green-700'>{ShipppingDetails.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address : </p>
                                <span className='textz text-green-700'>{` ${ShipppingDetails.address} , ${ShipppingDetails.city} , ${ShipppingDetails.state} , ${ShipppingDetails.pincode} , ${ShipppingDetails.country}`}</span>
                            </div>
                        </div>
                        <div className="confirmCardItmes">
                        <h1 className='font-medium tracking-wide pl-2 rounded-md mt-3 text-xl'>Your <span className='text-orange-600'>Cart</span> Items -</h1>
                            <div className="comfirmcardcontainer">
                                {AllCard && AllCard.map((item) => {
                                    total += item.price * item.quantity
                                    // setsubtotal(total)
                                   return <div key={item._id} className='my-1 flex justify-between items-center gap-4'>
                                       <div className='flex items-center gap-x-5'>
                                        <img className='w-14' src={item.images} alt="" />
                                        <Link to={`/products/${item._id}`}>{item.productname}</Link>
                                        </div> 
                                        <span className='word'>
                                            {item.quantity} X ${item.price} = ${item.quantity * item.price}
                                        </span>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="right">
                <h1 className='font-medium tracking-wide text-center border-b-2 pb-3 mb-4 pl-2 rounded-md my-2 border-orange-500 text-2xl'>Order Sammary</h1>
                        <div>
                            <div className='flex text justify-between items-center py-6'>
                                <p>Subtotal :</p>
                                <span>${subtotal}</span>
                            </div>
                            <div className='flex text justify-between items-center py-6 pb-10'>
                                <p>Tax Price :</p>
                                <span>${subtotal * 0.04}</span>
                            </div>
                            <div className='flex text justify-between items-center py-6 pb-10 border-b-2 border-gray-500'>
                                <p>Shipping Tax :</p>
                                <span>${subtotal * 0.08}</span>
                            </div>
                            <div className='flex text justify-between items-center py-4'>
                                <p className='font-medium text-lg'>Total :</p>
                                <span>${subtotal + subtotal * 0.08 + subtotal * 0.04}</span>
                            </div>
                        </div>
                        <button className='py-3 w-full bg-orange-600 text-white text mt-9' onClick={() => navigate('/payment')} >Process To Payment</button>
                </div>

            </div>
            {/* <button onClick={() => navigate('/payment')} className='border-2 border-solid border-orange-600 bg-orange-600 rounded-md mx-3 tracking-wider text-white py-3 px-7' type='submit'>Continue</button> */}
        </div>
    )
}

export default ComfirmOrder