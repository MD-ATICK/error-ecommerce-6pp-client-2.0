import React , {useEffect , useState} from 'react'
import { Link, NavLink, redirect, useNavigate } from 'react-router-dom'
import {BsKey} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AboutFetch } from '../components/User Slice/MeSlice'
import { toast } from 'react-hot-toast'
import { BiLogOut } from 'react-icons/bi'
import { CgTemplate } from 'react-icons/cg'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { MdSpaceDashboard } from 'react-icons/md'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import Loader from '../components/Loader/Loader'

function UserOption() {

   const dispatch = useDispatch()
   const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const x = {token}
    const [open, setopen] = useState(false);
    const [img, setimg] = useState('./user.png');
    const [user, setuser] = useState([]);

    const {products , loading }  = useSelector((state) => state.AboutMe)

    // products && console.log(products)
    const actions = [
      {icon : <CgTemplate onClick={orders} /> , name: 'Orders'} ,
      {icon : <RiAccountPinCircleLine onClick={account} /> , name: 'Profile' },
      {icon : <BiLogOut onClick={logout} /> , name: 'Logout' } 
    ];
    
    if( token && products != ""  && products.Profile.role === 'admin'){
      actions.unshift({icon : <MdSpaceDashboard onClick={dashboard} /> , name: 'Dashborad' }) // push and unshipt same but different push add kore last a and unshipt add kore frist a 
    }

    
    
        function orders(){
            navigate('/order/me')
        }
        function account(){
            navigate('/account')
        }
        function logout(){
          toast.success('Logout Your Id SuccessFully')
          localStorage.removeItem('token')
          navigate('/')
          window.location.reload()
          }
          function dashboard(){
            navigate('/admin/dashboard')
          }
          
        useEffect(() => {
          if(token){
            dispatch(AboutFetch(x))
          }
        }, [token]);
  return (
    <div>
      {loading && <Loader/>}
        { token ? 
        <div className='rounded-full z-plm fixed top-6 right-12 cursor-pointer '>
           
           { !loading && <SpeedDial
                ariaLabel="SpeedDial basic example"
                onClose={() => setopen(false)}
                onOpen={() => setopen(true)}
                open={open}
                // sx={{ position: 'absolute', bottom: -330, right: 16 }}
                icon={products != "" && <img src={products.Profile.avatar.url} className='border-4 h-14 object-cover w-14 border-solid rounded-full' alt="user pic" />}
                direction='down'
                >
                {actions.map((action) => (
                  <SpeedDialAction
                  className='patlu'
                  key={action.name}
                  value={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  />
              ))}
            </SpeedDial>}
        </div>
        :
        <nav> <p className='flex z-plm shadow-lg shadow-stone-500 justify-center items-center gap-3 text-md px-6 py-3 rounded-xl bg-white text-black tracking-wider font-semibold fixed top-6 right-6'><Link className='flex justify-center items-center' to='/login'><BsKey/>Login</Link></p> </nav> 
        }
    </div>
  )
}

export default UserOption;



