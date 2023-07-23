import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiOutlineHome } from 'react-icons/ai'
import { RiArrowUpDownFill } from 'react-icons/ri'
import { MdPlaylistAdd } from 'react-icons/md'
import { GrChapterAdd } from 'react-icons/gr'
import { FiChevronDown } from 'react-icons/fi'
import { ImUsers } from 'react-icons/im'
import { CgTemplate } from 'react-icons/cg'
import { MdReviews } from 'react-icons/md'
import { BsShop } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

function DashBoardSlider() {

    const [open, setopen] = useState(false);

    return (
        <div className='nav pt-20 pl-9 whitespace-nowrap shadow-xl flex flex-col justify-start gap-y-14 '>
            <NavLink to='/' className='flex justify-start items-center -m-2 gap-x-3 fontjamela text-4xl tracking-wide' > <img src="/blockchain.png" className='w-20' alt="blockchain" /> Shop</NavLink>
            <NavLink to='/admin/dashboard' className='flex justify-start hovereffect items-center gap-x-3' ><MdSpaceDashboard /> Dashboard</NavLink>
            <div className=' flex justify-start whitespace-nowrap gap-x-3 cursor-pointer'>
                {!open ? <RiArrowUpDownFill className='mt-1 font-bold' onClick={() => setopen(!open)}/> : <FiChevronDown className='mt-1 font-bold text-lg' onClick={() => setopen(!open)} />}
                <NavLink className=''  to='/admin/products' > Products
                    <div className={open ? 'flex flex-col h-full heavaiparina whitespace-nowrap overflow-hidden' : 'flex flex-col h-0 heavaiparina whitespace-nowrap overflow-hidden' }>
                        <NavLink to='/admin/products' className='flex justify-start hovereffect items-center py-1 px-3 gap-x-2'> <GrChapterAdd /> All</NavLink>
                        <NavLink to='/admin/create-new-product' className='flex justify-start hovereffect items-center py-1 px-3 gap-x-2' ><MdPlaylistAdd /> Create</NavLink>
                    </div>
                </NavLink>

            </div>
            <NavLink to='/admin/orders' className='flex justify-start hovereffect items-center gap-x-3' ><CgTemplate /> Orders</NavLink>
            <NavLink to='/admin/users' className='flex justify-start hovereffect items-center gap-x-3' ><ImUsers /> Users</NavLink>
            <NavLink to='/admin/Reviews' className='flex justify-start hovereffect items-center gap-x-3' ><MdReviews /> Reviews</NavLink>
        </div>
    )
}

export default DashBoardSlider