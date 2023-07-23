import React , {useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { RiMailSendLine } from 'react-icons/ri'
import { BiSend } from 'react-icons/bi'
import { TiTag } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { MeChangeFetch } from '../components/User Slice/InfoChangeSlice'
import Loader from '../components/Loader/Loader'




function UpdateData() {
    
    const { user , loading , success} = useSelector((state) => state.MeInfoChange)
    const { products } = useSelector((state) => state.AboutMe)
    const dispatch = useDispatch()
    
    const [name, setname] = useState(products ? products.Profile.name : '');
    const [email, setemail] = useState(products && products.Profile.email || '');
    const navigate = useNavigate()
    const [avatar, setavatar] = useState(products && products.Profile.avatar.url || '/user.png');
    
    const token = localStorage.getItem('token')
    
    
    const avatarChange= (w) => {
        const reader = new FileReader() 
        if(w.target.name === 'avatar')
        reader.onload = () => {
            if(reader.readyState === 2){
                setavatar(reader.result)
            }
        }
        reader.readAsDataURL(w.target.files[0])
    }    
    
    const changeInfo = {
        name ,
        email ,
        avatar,
        token,
    }

    if (user && user.success === true ){
        toast.success('Profile Update Successfully')
        return navigate('/account')
    }
    
    
    
    const HandleUpdate = (w) => {
        w.preventDefault()
        toast.success('submitted')
        console.log(changeInfo)
        dispatch(MeChangeFetch(changeInfo));
        navigate('/account')
    }

  return (
    <>
        {loading && <Loader/>}
     <div className='bg-white rounded-lg block drs py-9 pb-16 px-12 text-right'>
                 <h1 className='h1z text-left my-9 x'>Update</h1>
         
                <form action="" onSubmit={HandleUpdate} encType='multipart/form-data'>
                        <div className=" tracking-wider mb-9 flex items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                            <TiTag className='text-xl'/>
                            <input type="text" required placeholder='abc_A-Z' value={name} onChange={(w) => setname(w.target.value)}  />
                        </div>
                        <div className="loginEmail tracking-wider mb-9 flex items-center gap-6 border-2 border-solid border-black rounded-md py-3 px-6">
                            <RiMailSendLine className='text-xl'/>
                            <input type="email" required placeholder='abc@gmail.com' value={email} onChange={(w) => setemail(w.target.value)}  />
                        </div>
                        <div className=" flex justify-center items-center text-center my-9 gap-3">
                            <img src={avatar} className='w-14 h-14 object-cover rounded-full text-xs' alt="avatar" />
                             <input type="file" name='avatar' accept='image/*' onChange={avatarChange} className='filebtn text-center pl-3'/>
                        </div>
                        <button type='submit' className='btnz x flex justify-center items-center border-2 ml-auto border-solid border-blue-600 py-2 px-6 w-full mt-11 rounded-lg gap-4 text-lg'>
                            Update <BiSend className='text-xl onegaitaicon  text-sky-700'/>
                        </button>
                        {/* <p className=''>{user.errMsg ? <p className='text-left flex justify-center items-center text-red-700 pt-6 text-xl tracking-wider'><BiError className='text-2xl mr-2'/> {user.errMsg} </p> : ''} </p> */}
                </form> 
            </div>
    </>
  )
}

export default UpdateData