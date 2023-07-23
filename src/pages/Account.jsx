import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { AboutFetch } from '../components/User Slice/MeSlice'
import Loader from '../components/Loader/Loader'
import { toast } from 'react-hot-toast'

function Account() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
      const x = { token }

      const {products , loading}  = useSelector((state) => state.AboutMe)

      // const { name , email , role , avatar } = products.Profile

  const handleClick = () => {
    toast.success('succes is always success')
  }
  useEffect(() => {
    dispatch(AboutFetch(x))
  }, [token ]);
  return (
    <div>
    { loading && <Loader/>}
        { products && 
    <div className="account flex justify-evenl h-screen items-center">
            <div className="left text-center mb-9">
              <h1 className='h1z ml-28 text-left tracking-tighter'>My Profile</h1>
                <Link to='/me/update' ><img src={products.Profile.avatar.url} className='mt-3 mb-16 w-96 h-96 object-cover rounded-full mx-auto' alt="" /></Link>
                {/* <p><Link to='/me/update' className='btn' >Edit Profile</Link></p> */}
                {/* <button className='m-6 p-3 border-4 border-solid border-black' onClick={handleClick}>click</button> */}
            </div>
            <div className="right block px-28">
              <div className="item">
                  <h1>Full Name</h1>
                  <p>{products.Profile.name}</p>
              </div>
              <div className="item">
                  <h1>Email</h1>
                  <p>{products.Profile.email}</p>
              </div>
              {/* <div className="items flex justify-start items-center gap-4"> */}
              <div className="item">
                  <h1>Joined On</h1>
                  <p>2022-02-15</p>
              </div>
              <div className="item">
                  <h1>Role</h1>
                  <p>{products.Profile.role}</p>
              </div>

              {/* </div> */}
            <p><Link className='rounded-lg border-2 py-2 text-center antbtn border-solid border-green-600 mt-9' to='/order/me'>My Orders</Link></p>
            <p><Link className='rounded-lg border-2 py-2 text-center antbtn bg-green-600 text-white border-solid border-green-600 mt-6 ' to='/change-password'  onclick={() => toast.error('Welcome , Change Password')} >Change Password</Link></p>          
           </div>
    </div>}
      </div>
  )
}

export default Account