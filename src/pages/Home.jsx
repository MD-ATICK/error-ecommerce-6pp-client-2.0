import React, { useEffect, useState } from 'react'
import { BiMouse } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { AllProduct } from '../components/Product Slice/AllProductSlice'
import ReactStars from 'react-rating-stars-component'
import Footer from '../footer/Footer'

function Home() {

  const dispatch = useDispatch()

  let x = 1;
  const [limit, setlimit] = useState(1);

  const { loading , data } = useSelector((state) => state.AllProduct)

  const handleIncremntLimit = () => {
    limit === 3 ? setlimit(1) : setlimit((prev) => prev+1)
    document.documentElement.scrollTop = 730;
  }


  useEffect(() => {
    dispatch(AllProduct(limit))
  }, [limit]);
 return (
    <div>
      {loading && <Loader />}
      <div className='home-content h-screen bg-blue-500 flex justify-center items-center flex-col'>
        <p className='text-3xl text-white font-medium tracking-wider'>Welcome to E-Commerce</p>

        <h1 className='py-9 font-medium tracking-wide'>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container" className='scroll flex items-center justify-self-center border-white text-lg duration-100 ease-out bg-white px-6 py-2 hover:bg-transparent hover:text-white hover:font-light  border-solid border-2	'><button className='pr-4 tracking-wide'>Scroll </button> <BiMouse /></a>
        <div className="home-icons text-2xl py-3 text-white">
          <IoIosArrowDown className='icon-one' />
          <IoIosArrowDown className='icon-two' />
          <IoIosArrowDown className='icon-three' />
        </div>
      </div>
      <div className="feature-product bg-zinc-200 pt-6 flex justify-center flex-col py-16 items-center" id='container'>
        <h1 className='p-3 my-9 border-solid border-b-2 border-neutral-700 text-2xl font-medium tracking-wide text-center w-96 mx-auto'>Feature Product</h1>
       
       <div className={limit > 1 ? 'gradientUse' : 'gradientactive' }>
        <div className='gradientUse grid gap-6  lg:gap-9 lg:grid-cols-4 max-w-7xl mx-auto grid-cols-2'>
          {
            data.map((product) => {
              const { _id  , price ,productname , ratings , numOfReviews  , stock , user , images } = product
              const Option = {
                edit : false ,
                color : 'rgba(20 ,20 ,20 , 0.1' ,
                activeColor : 'tomato' ,
                size : window.innerWidth < 600 ? 20 : 25 ,
                value : ratings ,
                isHalf : true , 
            }
                return (
                <Link to={`products/${_id}`} key={_id}>
                    <div className=' p-3 bg-white hover:scale-105 duration-200 lg:pb-6 rounded-lg' >
                          <img className='rounded-lg' src={images[0].url} alt="product name" />
                          <h1 className='text-lg font-medium'>{productname}</h1>
                          <div className='flex items-center'>
                              <ReactStars {...Option}  /> 
                              <span className='pl-2'>{`(Review - ${numOfReviews})`}</span>
                          </div>
                          <p className='py-3'>{`Stock - ${stock}`}</p>
                          <p>{`Price - $${price}`}</p>
                  </div>
                </Link> )
              })
          }  
        </div>
        </div>
        <button className='btn' onClick={handleIncremntLimit}>{limit === 3 ? 'Go Back' : 'See more'}</button>

      </div>
      <Footer/>
    </div>
  )
}

export default Home
