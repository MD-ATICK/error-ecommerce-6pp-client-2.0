import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsHouse } from 'react-icons/bs'
import { Country, State } from 'country-state-city'
import { toast } from 'react-hot-toast'
import { IoMdCall } from 'react-icons/io'
import { GiModernCity } from 'react-icons/gi'
import { GiWorld } from 'react-icons/gi'
import { BsBroadcastPin } from 'react-icons/bs'
import { FaSlackHash } from 'react-icons/fa'
import CheckOutStep from './CheckOutStep'

function Shipping() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const x = localStorage.getItem('ShippingDetails')
    let ShippingDetails = JSON.parse(x)

    const [address, setaddress] = useState(ShippingDetails ? ShippingDetails.address : '');
    const [city, setcity] = useState(ShippingDetails ? ShippingDetails.city : '')
    const [state, setstate] = useState(ShippingDetails ? ShippingDetails.state : '');
    const [country, setcountry] = useState(ShippingDetails ? ShippingDetails.country : '');
    const [pincode, setpincode] = useState(ShippingDetails ? ShippingDetails.pincode : '');
    const [phoneNo, setphoneNo] = useState(ShippingDetails ? ShippingDetails.phoneNo : '');

    const ShippingAddress = {
        address,
        city,
        state,
        country,
        pincode,
        phoneNo
    }

    const HandleSubmit = (w) => {
        w.preventDefault()
        if(phoneNo.length < 10){
            return toast.error('Phone No minium 10 digit')
        }
        console.log(ShippingAddress)
        localStorage.setItem('ShippingDetails' , JSON.stringify(ShippingAddress))
        navigate('/comfirm-order')
    }

    return (
        <>
            <CheckOutStep activeSteps={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h1 className='shippingHeading'>Shipping Details</h1>
                    <form action="" className='shippingFrom' onSubmit={HandleSubmit} encType='multipart/form-data'>
                        <div className="">
                            <BsHouse className='iconShipping' />
                            <input type="text" placeholder='Address' required value={address} onChange={(w) => setaddress(w.target.value)} />
                        </div>
                        <div className="">
                            <GiModernCity className='iconShipping' />
                            <input type="text" placeholder='City' required value={city} onChange={(w) => setcity(w.target.value)} />
                        </div>
                        <div className="">
                            <BsBroadcastPin className='iconShipping' />
                            <input type="number" placeholder='Pin Code' required value={pincode} min={4} onChange={(w) => setpincode(w.target.value)} />
                        </div>
                        <div className="">
                            <IoMdCall className='iconShipping' />
                            <input type="number" placeholder='Phone Number' required value={phoneNo}  onChange={(w) => setphoneNo(w.target.value)} />
                        </div>
                        <div className="">
                            <FaSlackHash className='iconShipping' />
                            <select name="" className='w-56' id="" required value={country} onChange={(w) => setcountry(w.target.value)}>
                                <option value="">Country</option>
                                {Country && Country.getAllCountries().map((country) => {
                                    return <option key={country.isoCode} value={country.isoCode} >{country.name}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            {
                                country && (
                                    <div className='flex my-3 justify-left items-center'>
                                        <GiWorld className='iconShipping' />
                                        <select name="" id="" className='yesiam' required value={state} onChange={(w) => setstate(w.target.value)}>
                                            <option value="">State</option>
                                            {
                                                State && State.getStatesOfCountry(country).map((state) => {
                                                    return <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                            }
                        </div>
                        <button className='border-2 border-solid border-orange-600 bg-orange-600 rounded-md mx-3 tracking-wider text-white py-3 px-7' type='submit' disabled={State ? false : true}>Continue</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping