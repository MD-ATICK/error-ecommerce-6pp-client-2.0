import React, { useState , useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RiMailSendLine } from 'react-icons/ri'
import { VscGistSecret } from 'react-icons/vsc'
import { BiSend } from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader/Loader'
import { LoginFetch } from '../components/User Slice/LoginSlice'
import { AboutFetch } from '../components/User Slice/MeSlice'
import axios from 'axios'
import { UserUpdateFetch } from '../components/User Slice/UserUpdateSlice'


function UpdateUser() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const { products , loading } = useSelector((state) => state.LoginData)
    const [users, setusers] = useState('');
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [role, setrole] = useState('');
    const token = localStorage.getItem('token')


    const FetchSingleUser = async () => {
        const {data} = await axios.post(`http://localhost:4000/api/v1/admin/${id}` , {token} , {headers : {"Content-Type" : "application/json"}})
        return setusers(data)

    }

    const UpdateValue = {
        id ,
        name ,
        email ,
        role ,
        token ,
    }


    const HandleUpdateUser = (w) => {
        w.preventDefault();
        // toast.success('click succesfully')
        if(role === ''){
            return toast.error(<p>Role value not found</p>)
        }
        dispatch(UserUpdateFetch(UpdateValue))
        console.log(UpdateValue)
        navigate('/admin/users')
    }
    
    useEffect(() => {
        users && setname(users.user.name)
        users && setemail(users.user.email)
       FetchSingleUser()
    }, [users]);

    return (
        <div className='Dblank '>
            {loading && <Loader/>}
            <div className='bg-white rounded-lg py-9 px-12 text-right'>
                <h1 className=' text-xl tracking-wide border-b-2 font-medium text-orange-500 shadow-lg py-2 bg-zinc-100 px-4 text-center my-9'>Update User </h1>
                <form action="" onSubmit={HandleUpdateUser}>
                    <div className="loginEmail tracking-wider mb-9 flex justify-center items-center gap-6 border-2 border-solid border-stone-500 rounded-sm py-3 px-6">
                        <RiMailSendLine className='text-xl' />
                        <input type="text" required placeholder='Enter your name' value={name} onChange={(w) => setname(w.target.value)} />
                    </div>
                    <div className="loginPassword mb-3 flex justify-center items-center gap-6 border-2 border-solid border-stone-500 rounded-sm py-3 px-6">
                        <VscGistSecret />
                        <input type="email" required placeholder='abc123@#%ABC@gmail.com' value={email} onChange={(w) => setemail(w.target.value)} />
                    </div>
                    <select name="" id="" className='border-2 border-stone-500 mt-2' onChange={(w) => setrole(w.target.value)}>
                        <option value="">Role</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    <button type='submit' className=' bg-orange-500 text flex justify-center items-center border-2 ml-auto border-solid py-2 text-white tracking-wide px-6 w-full mt-11 rounded-lg gap-4 text-lg'>
                        Update User <BiSend className='text-xl onegaitaicon ' />
                    </button>
                </form>
            </div>

        </div>
    )
}

export default UpdateUser