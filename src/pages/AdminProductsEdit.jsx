import React, { useEffect, useState } from 'react'
import DashBoardSlider from './DashBoardSlider'
import { TiSortAlphabetically } from 'react-icons/ti'
import { GiMoneyStack } from 'react-icons/gi'
import { HiDocumentText } from 'react-icons/hi'
import { BiCategoryAlt } from 'react-icons/bi'
import { TbListDetails } from 'react-icons/tb'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { AdminCreateProductFetch } from '../components/Product Slice/AdminProductCreateSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminProductUpdateFetch } from '../components/Product Slice/AdminProductUpdateSlice'
import { FetchSingleProduct } from '../components/Product Slice/SingleProductSlice'
import Loader from '../components/Loader/Loader'

function AdminProductsEdit() {

    const {Sproduct , loading , success } = useSelector((state) => state.singleProduct)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [stock, setstock] = useState(Sproduct  !== '' && Sproduct.data.stock);
    const [price, setprice] = useState(Sproduct !== '' ? Sproduct.data.price : '');
    const token = localStorage.getItem('token')
    const [category, setcategory] = useState(success ? Sproduct.data.category : '');
    const [avatar, setavatar] = useState(Sproduct != '' ? Sproduct.data.images.url : '/food.png');
    const [productname, setproductname] = useState(Sproduct != '' ? Sproduct.data.productname : '');
    const [description, setdescription] = useState(Sproduct != '' ? Sproduct.data.description : '');

    const FileHandle = (w) => {
        if (w.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatar(reader.result)
                }
            }
            reader.readAsDataURL(w.target.files[0])
        }
    }

    const ProductDetails = {
        productname,
        price,
        description,
        stock,
        category,
        avatar,
        token,
        id,
    }

    const HandleSubmit = (w) => {
        w.preventDefault()
        if (category === '') {
            return toast.error(<p className='text'>Empty Selected Value</p>)
        }
        console.log(ProductDetails)
        console.log(id)
        dispatch(AdminProductUpdateFetch(ProductDetails))
        navigate('/admin/products')
        toast.success(<p className='text'>Create Product Successfully</p>)
    }

    useEffect(() => {
        dispatch(FetchSingleProduct(id))
    }, []);

    return (
        <div className='dashboard'>
            <DashBoardSlider />
            {loading && <Loader/>}
            <div className='h-screen bg-cyan-600 flex justify-center items-center'>
                <form action="" onSubmit={HandleSubmit} className='createproductfrom shadow-2xl shadow-zinc-700'>
                    <h1 className='text-2xl py-1 tracking-wider font-medium my-2 border-l-4 border-orange-600 pl-3'>Create Product</h1>
                    <div>
                        <TiSortAlphabetically className='linkform' />
                        <input type="text" placeholder='Proudct Name' value={productname} onChange={(w) => setproductname(w.target.value)} className='' required />
                    </div>
                    <div>
                        <GiMoneyStack className='linkform' />
                        <input type="number" placeholder='Price' value={price} onChange={(w) => setprice(w.target.value)} className='' required />
                    </div>
                    <div>
                        <HiDocumentText className='linkform' />
                        <input type="text" placeholder='Product Desc' value={description} onChange={(w) => setdescription(w.target.value)} className='' required />
                    </div>
                    <div>
                        <BiCategoryAlt className='linkform' />
                        <select name="" id="" value={category} onChange={(w) => setcategory(w.target.value)} required>
                            <option value="">CateGory</option>
                            <option value="Ipnone">Ipnone</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Noddles">Noddles</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Biriani">Biriani</option>
                            <option value="Borhani">Borhani</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Roast">Roast</option>
                            <option value="Kabab">Kabab</option>
                            <option value="Beaf">Beaf</option>
                            <option value="Fry Chiken">Fry Chiken</option>
                            <option value="Giril">Giril</option>
                        </select>
                    </div>
                    <div>
                        <TbListDetails className='linkform' />
                        <input type="text" placeholder='Stock' value={stock} onChange={(w) => setstock(w.target.value)} className='' required />
                    </div>
                    <div className='flex justify-center   items-center border-none text-center my-4 gap-3'>
                        <img src={avatar} className='w-14 h-14 object-cover rounded-full text-xs' alt="avatar" />
                        <input type="file" name='avatar' accept='image/*' className='border-none filebtn text-center pl-12' onChange={FileHandle} required />
                    </div>
                    <button type='submit' className='text py-2 mb-2 rounded-md w-80 hover:scale-105 duration-75 mx-auto bg-orange-700 text-white cursor-pointer '>Update Product</button>
                </form>

            </div>
        </div>
    )
}

export default AdminProductsEdit