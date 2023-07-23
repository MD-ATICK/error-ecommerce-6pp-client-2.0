import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { BiLogOut } from 'react-icons/bi'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { IoMdCall } from 'react-icons/io'
import { BiSearchAlt } from 'react-icons/bi'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { AiOutlineHome } from 'react-icons/ai'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { MdShoppingCart } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { BsInfoLg } from 'react-icons/bs'
import { BsShop } from 'react-icons/bs'




import './Navbar.css'
import { toast } from 'react-hot-toast'

const Navbar = () => {

  const [menu, setmenu] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scroll) {
        setmenu(false)
      }
    })
  }, [menu]);


  const handleclick = () => {
    setmenu(false)
    toast.success('Logout Your Id SuccessFully')
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="container-nav">
      <div className='navbar'>
        {menu ? <GrClose className='icon z-50  bg-white px-1 rounded-sm' onClick={() => setmenu(!menu)} /> : <HiOutlineMenuAlt1 className='icon z-50 bg-white px-1 rounded-sm' onClick={() => setmenu(!menu)} />}

        <nav className={menu ? 'nav-active z-50 ' : 'nav-inactive z-50'}>
          {/* <p className='navp'><NavLink className='link' to={ token ? '/account' : '/login'} onClick={() => { setmenu(!menu) } }><RiAccountPinCircleLine /></NavLink></p> */}
          <p className='navp 'title='Home'><NavLink className='link ' to='/' onClick={() => setmenu(!menu)} ><AiOutlineHome /></NavLink></p>
          <p className='navp' title='Products'><NavLink className='link iconp' to='/products' onClick={() => setmenu(!menu)}><BsShop /></NavLink></p>
          <p className='navp' title='Card Items'><NavLink className='link' to='/card-items' onClick={() => setmenu(!menu)} ><MdShoppingCart /></NavLink></p>
          <p className='navp' title='Contact'><NavLink className='link' to='/contact' onClick={() => setmenu(!menu)} ><IoMdCall /></NavLink></p>
          <p className='navp' title='About Us'><NavLink className='link iconp' to='/about-us' onClick={() => setmenu(!menu)} ><BsInfoLg /></NavLink></p>
          <p className='navp' title='Search'><NavLink className='link iconp' to='/search' onClick={() => setmenu(!menu)} ><BiSearchAlt /></NavLink></p>
          {/* { token && <p className='navp' onClick={handleclick} > <BiLogOut className='link iconp'/> </p> }  */}
           {/* aiter kaj start kalke  */}
        </nav>

      </div>
    </div>
  )
}

export default Navbar