import React , {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import {MdDone} from 'react-icons/md'
import { GetSingleOrderFetch } from '../components/OrderSlice/GetSingleOrderSlice'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function AdminOrdersUpdate() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const y = localStorage.getItem('ShippingDetails')
    const [orderStatus, setorderStatus] = useState('');
    const [success, setsuccess] = useState(false);
    let total = 0
    const ShipppingDetails = JSON.parse(y)
    // const {products , loading} = useSelector((state) => state.AboutMe)
    const {products , loading} = useSelector((state) => state.GetSingleOrderData)
    const token = localStorage.getItem('token')

/* SOME EXPRRIMENT OF COOKIES */
//     document.cookie = `username =${JSON.stringify(paymentdata)}`
//     let xy = cookies.get('username')
//     let username = document.cookie.split('=')[1];
//    subtotal > 1 && console.log(JSON.parse(username))

    const HandleUpdateStatus = async () => {

        if (orderStatus === '') {
            return toast.error(<p className='text'>Order Condition Not Selected</p>)
        }

        const {data} = await axios.put(`http://localhost:4000/api/v1/admin/order/update/${id}` , {token , orderStatus} , {headers: {'Content-Type' : 'application/json'}})
        setsuccess(data.success)
        navigate('/admin/orders')
        return data;
    }


    useEffect(() => {
        dispatch(GetSingleOrderFetch([id , token]))
    }, [success]);
    return (
        <div>
            {loading && <Loader/>}
            <div className="comfirmOrderPage">
                <div className='left'>
                    <div className="confirmShippingArea">
                        <h1 className='font-medium tracking-wide border-l-4 pl-2 rounded-md my-2 border-solid border-orange-600 text-2xl'>Shipping Info</h1>

                        <div className="confirmShippingbox text">
                            <div>
                                <p >Name : </p>
                                <span className='textz text-green-700'>{products && products.users.name}</span>
                            </div>
                            <div>
                                <p >Email : </p>
                                <span className='textz text-green-700'>{products && products.users.email}</span>
                            </div>
                            <div>
                                <p>Phone No : </p>
                                <span className='textz text-green-700'>{ShipppingDetails.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address : </p>
                                <span className='textz text-green-700'>{` ${ShipppingDetails.address} , ${ShipppingDetails.city} , ${ShipppingDetails.state} , ${ShipppingDetails.pincode} , ${ShipppingDetails.country}`}</span>
                            </div>
                            <div>
                                <p>Tax , Shipping , Order = Total Amount : </p>
                                <span className='textz text-green-700 font-medium'>{products && products.totalPrice} Taka</span>
                            </div>
                            <div className='flex justify-start items-center'>
                                <p className=''>Order Current Condition : </p>
                                <span className={products && products.orderStatus === 'processing' || products.orderStatus === 'Shipped' ? ' shadow-xl mb-9 mt-5 rounded-md font-medium bg-zinc-100 text-red-600 py-3 px-4' : ' shadow-xl mb-9 mt-5 font-medium rounded-md bg-zinc-100 text-green-600 py-3 px-4'}>{products && products.orderStatus}</span>
                            </div>
                        </div>

                      
                        <div className="confirmCardItmes">
                        <h1 className='font-medium tracking-wide pl-2 rounded-md mt-3 text-xl'>Your <span className='text-orange-600'>Cart</span> Items -</h1>
                            <div className="comfirmcardcontainer">
                                {products && products.orderItems.map((item) => {
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
                <h1 className='font-medium tracking-wide text-center border-b-2 pb-3 mb-12 pl-2 rounded-sm my-2 border-orange-500 text-2xl'>Order Enalog</h1>
                      { products && products.orderStatus === 'Delivered' ? <div className='text-green-700 text-xl flex items-center gap-3 tracking-wider shadow-lg py-4 rounded-md px-6'>Order Compeleted <MdDone className='p-1 rounded-full bg-green-600 text-3xl text-white' /></div> : <> <select name="" id="" onChange={(w) => setorderStatus(w.target.value)}>
                              <option value="">Choose</option>
                              { products && products.orderStatus === 'processing' && <option value="Shipped">Shipped</option> }
                              { products && products.orderStatus === 'Shipped' && <option value="Delivered">Delivered</option> }
                              
                          </select>
                          <button className='py-3 w-full bg-orange-600 text-white text mt-6' onClick={HandleUpdateStatus} >Create</button>
                          </>
                    }  
                </div>

            </div>
            {/* <button onClick={() => navigate('/payment')} className='border-2 border-solid border-orange-600 bg-orange-600 rounded-md mx-3 tracking-wider text-white py-3 px-7' type='submit'>Continue</button> */}
        </div>
    )
}

export default AdminOrdersUpdate