import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { RiMailSendLine } from 'react-icons/ri'
import { VscGistSecret } from 'react-icons/vsc'
import { BiError } from 'react-icons/bi'
import { BiSend } from 'react-icons/bi'
import { TiTag } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterFetch } from '../components/User Slice/RegisterSlice'
import Loader from '../components/Loader/Loader'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [avatar, setavatar] = useState('/user.png');


    const { products, loading } = useSelector((state) => state.RegisterData)

    if (products.success === true) {
        return navigate('/login');
    }



    const avatarChange = (w) => {
        if (w.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatar(reader.result)
                }
            }
            reader.readAsDataURL(w.target.files[0])
        }
    };

    const RegisterUser = {
        name,
        email,
        password,
        avatar,
    }

    const RegisterSubmit = (w) => {
        w.preventDefault();
        toast.success('Register submited')
        console.log(RegisterUser)
        dispatch(RegisterFetch(RegisterUser))
    };

    return (
        <div className='Dblank '>
            {loading && <Loader />}
            <div className='bg-white rounded-lg block drs py-9 pb-16 px-12 text-right'>
                <h1 className='h1z text-left my-9'>Wow , Register</h1>

                <form action="" onSubmit={RegisterSubmit} encType='multipart/form-data'>
                    <div className=" tracking-wider mb-9 flex items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                        <TiTag className='text-xl' />
                        <input type="text" required placeholder='abc_A-Z' value={name} onChange={(w) => setname(w.target.value)} />
                    </div>
                    <div className="loginEmail tracking-wider mb-9 flex items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                        <RiMailSendLine className='text-xl' />
                        <input type="email" required placeholder='abc@gmail.com' value={email} onChange={(w) => setemail(w.target.value)} />
                    </div>
                    <div className="loginPassword mb-3 flex  items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                        <VscGistSecret />
                        <input type="text" required placeholder='abc123@#%ABC' value={password.trim()} onChange={(w) => setpassword(w.target.value)} />
                    </div>
                    <div className=" flex justify-center items-center text-center my-9 gap-3">
                        <img src={avatar} className='w-14 h-14 object-cover rounded-full text-xs' alt="avatar" />
                        <input type="file" name='avatar' accept='image/*' onChange={avatarChange} className='filebtn text-center pl-3' required />
                    </div>
                    <button type='submit' className='btnz x flex justify-center items-center border-2 ml-auto border-solid border-green-600 py-2 px-6 w-full mt-11 rounded-lg gap-4 text-lg'>
                        Register <BiSend />
                    </button>
                    {/* <p className=''>{user.errMsg ? <p className='text-left flex justify-center items-center text-red-700 pt-6 text-xl tracking-wider'><BiError className='text-2xl mr-2'/> {user.errMsg} </p> : ''} </p> */}
                </form>
            </div>

        </div>
    )
}

export default Register