import React, { useState , useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RiMailSendLine } from 'react-icons/ri'
import { VscGistSecret } from 'react-icons/vsc'
import { BiSend } from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader/Loader'
import { LoginFetch } from '../components/User Slice/LoginSlice'
import { AboutFetch } from '../components/User Slice/MeSlice'


function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { products , loading } = useSelector((state) => state.LoginData)
    const [email, setloginEmail] = useState('');
    const [password, setloginPassword] = useState('');
    const LoginUser = {
        email ,
        password ,
    }
    const token = localStorage.getItem('token')
    const x = {token}
    if(token){
        navigate('/account')
        window.location.reload()
    }
    
    if(products.success === true){
        localStorage.setItem('token' , products.token);
    }

    const LoginSubmit = (w) => {
        w.preventDefault();
        toast.success('click succesfully')
        dispatch(LoginFetch(LoginUser))
        console.log(products)
    }
    
    useEffect(() => {
        dispatch(AboutFetch(x))
    }, [token]);

    return (
        <div className='Dblank '>
            {loading && <Loader/>}
            <div className='bg-white rounded-lg py-9 px-12 text-right'>
                <h1 className='h1z text-left my-9'> Login</h1>
                <form action="" onSubmit={LoginSubmit}>
                    <div className="loginEmail tracking-wider mb-9 flex justify-center items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                        <RiMailSendLine className='text-xl' />
                        <input type="email" required placeholder='abc@gmail.com' value={email} onChange={(w) => setloginEmail(w.target.value)} />
                    </div>
                    <div className="loginPassword mb-3 flex justify-center items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                        <VscGistSecret />
                        <input type="text" required placeholder='abc123@#%ABC' value={password} onChange={(w) => setloginPassword(w.target.value)} />
                    </div>
                    <button type='submit' className='btnz   flex justify-center items-center border-2 ml-auto border-solid border-blue-600 py-2 px-6 w-full mt-11 rounded-lg gap-4 text-lg'>
                        LogIn <BiSend className='text-xl onegaitaicon  text-sky-700' />
                    </button>
                    <Link to='/password/forget' className='hover:underline text-sm pb-9 block' >forget password?</Link>
                </form>
                <Link className='hover:underline text-center block tracking-wider' to='/register'>I havn't an any account?</Link>
            </div>

        </div>
    )
}

export default Login