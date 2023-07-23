import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordFetch } from '../components/User Slice/PasswordChangeSlice';
import Loader from '../components/Loader/Loader' 

function ChangePassword() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const {user , loading } = useSelector((state) => state.MeChangePassword)
    const [oldpassword, setoldpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [comfirmpassword, setcomfirmpassword] = useState('');

    const ChangePasswordInfo = {
        oldpassword,
        newpassword,
        comfirmpassword,
        token,
    }


    if(user && user.success === true){
        navigate('/account')
        window.location.reload()
    }
    
    const HandleSubmit = (w) => {
        w.preventDefault()
        toast.success('ChangePassword Succefully')
        console.log(ChangePasswordInfo)
        dispatch(ChangePasswordFetch(ChangePasswordInfo))
    }


    return (
        <div className='h-screen flex justify-center items-center '>
            {loading && <Loader/>}
            <form action="" onSubmit={HandleSubmit} className='rounded-md bg-green-600 p-9' >
                <h1 className='py-6 text-3xl text-white tracking-wide font-medium'>Changing Password</h1>
                <div className="flex flex-col justify-start gap-3">
                    <label htmlFor="oldpassword">Old Password</label>
                    <input type="text" className='mb-6 p-3 rounded-md' value={oldpassword} onChange={(w) => setoldpassword(w.target.value)} placeholder='Enter Old Passowrd' id='oldpassword' required />
                </div>
                <div className="flex flex-col justify-start gap-3">
                    <label htmlFor="newpassword">New Password</label>
                    <input type="text" className='mb-6 p-3 rounded-md' value={newpassword} onChange={(w) => setnewpassword(w.target.value)} placeholder='Enter new Passowrd' id='newpassword' required />
                </div>
                <div className="flex flex-col justify-start gap-3">
                    <label htmlFor="comfirmpassword">Comfrim Password</label>
                    <input type="text" className='mb-6 p-3 rounded-md' value={comfirmpassword} onChange={(w) => setcomfirmpassword(w.target.value)} placeholder='Enter comfirm Passowrd' id='comfirmpassword' required />
                </div>
                <button type='submit' className='w-full text-center border-2 border-solid border-white py-3'>Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword