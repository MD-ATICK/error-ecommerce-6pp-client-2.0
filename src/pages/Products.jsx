import React, { useEffect, useState } from 'react'
import { BiMouse } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import Product from '../components/home/Product'
import { FetchProduct } from '../components/Product Slice/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import toast from 'react-hot-toast'
import Footer from '../footer/Footer'



function Products() {

  const dispatch = useDispatch()
  const [currentPage, setcurrentPage] = useState(1)
  const [defaultParmas, setParams] = useSearchParams()
  const [price, setprice] = useState([50000, 350000]);
  const [ratings, setratings] = useState(0);
  const [open, close] = useState(false);
  
  
  const [minvalue, setminvalue] = useState(0);
  const [maxvalue, setmaxvalue] = useState(999999);
  
  const qurey = defaultParmas.get('keyword')
  const [option, setoption] = useState(qurey || 'ALL');
  const products = useSelector((state) => state.productStore.products.data)
  const InitialState = useSelector((state) => state.productStore)
  const AllProductsCount = useSelector((state) => state.productStore.products.LengthAll)
  const setupProductCount = useSelector((state) => state.productStore.products.productno)
  const navigate = useNavigate()
  const ResultperPage = 8;
  
  // document.documentElement.scroll ? close(false) : close(true)
  // console.log(option);

  window.addEventListener('scroll', () => {
    if (document.documentElement.scroll) {
      close(false)
    }
  })

  const handleCurrentPage = (w) => {
    setcurrentPage(w);
    document.documentElement.scrollTop = 0
  }
  
  
  const handleSubmit = (w) => {
    w.preventDefault()
    if (minvalue === '' || maxvalue === '') {
      toast.error('Please , must be valid !!')
    }
    if (option !== 'ALL') {
      navigate(`/products?keyword=${option}`)
    } else{
      navigate('/products')
    }
    if (ratings < 0 || ratings > 5) {
      toast.error('Please , must be (0-5) in number !!')
    }
    dispatch(FetchProduct([qurey ? qurey : null, currentPage, minvalue, maxvalue , ratings]))
    close(false)
    document.documentElement.scrollTop = 50
  }
  
  useEffect(() => {
    dispatch(FetchProduct([qurey ? qurey : null, currentPage]))
  }, [dispatch, qurey , currentPage, AllProductsCount]);
  
  
  return (
    <div>
      {InitialState.loading && <Loader />}
      <div className="feature-product bg-zinc-200 pt-6" id='container'>
        <h1 className='h1'>All Products</h1>

        <div className='grid gap-6 pb-36 lg:gap-9 place-items-center lg:grid-cols-4 max-w-7xl mx-auto py-9 px-3 grid-cols-2'>
          {
            setupProductCount === 0 ? <h1 className='h1 mx-auto absolute'>PRODUCT NOT FOUND</h1> : 
            products && products.map(product =>
              <div className='' key={product._id}>
                <Product product={product} />
              </div>)
          }
        </div>




          {/* <Pagination
            activePage={currentPage}
            itemsCountPerPage={ResultperPage}
            totalItemsCount={setupProductCount && AllProductsCount && !qurey ? AllProductsCount : setupProductCount}
            onChange={handleCurrentPage}
            nextPageText="next"
            prevPageText='prev'
            firstPageText='1st'
            lastPageText='Last'
            itemClass='pageItem'
            linkClass='pageLink'
            activeClass='pageItemActive'
            activeLinkClass='pageLinkActive'
          /> */}


        <form className={open ? 'paltuyes fixed top-16 left-12' : 'paltuyes2 fixed top-14 left-12'} action="" onSubmit={handleSubmit}>
          <div className='bottom'>
            <h1>Filter Your Choose</h1>
            <div className="price-input">
              <div className="feild">
                <span>Min - </span>
                <input type="number" className='input-min' onChange={(w) => setminvalue(w.target.value)} value={minvalue} />
              </div>
              <div className="feild">
                <span>Max - </span>
                <input type="number" className='input-max' onChange={(w) => setmaxvalue(w.target.value)} value={maxvalue} />
              </div>
            </div>
            <div>
              <p className='p py-3'>Select Your CateGory</p>
              <select name="" id=""  onChange={(e) => setoption(e.target.value)}>
                <option value="ALL">ALL</option>
                <option selected={qurey === 'Apple' ? true : false} value="Apple">Apple</option>
                <option selected={qurey === 'Nokia' ? true : false} value="Nokia">Nokia</option>
                <option selected={qurey === 'Mobile' ? true : false} value="Mobile">Mobile</option>
                <option selected={qurey === 'R15' ? true : false} value="R15">R15</option>
                <option selected={qurey === 'Kawasaki' ? true : false} value="Kawasaki">Kawasaki</option>
                <option selected={qurey === 'Yamaha' ? true : false} value="Yamaha">Yamaha</option>
                <option selected={qurey === 'Oppo' ? true : false} value="Oppo">Oppo</option>
                <option selected={qurey === 'Huewei' ? true : false} value="Huewei">Huewei</option>
              </select>
            </div>
            <div>
            <p className='p pt-6'>Most Populer</p>
            <div className="feild">
                <span>Rate - </span>
                <input type="number" className='input-max' onChange={(w) => setratings(w.target.value)} max={5} value={ratings} />
            </div>

            </div>
            <button className="btnz" type='submit'>Filterx</button>
          </div>
        </form>
      </div>
      <img className='imgbottom' onClick={() => close(!open)} src="./filter.png" alt="" />
      <Footer/>
    </div>
  )
}

export default Products