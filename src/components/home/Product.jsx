import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, NavLink } from 'react-router-dom'

function Product({product}) {

        
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
            
             <Link to={`${_id}`} key={_id}>
                        <div className=' p-4 bg-white hover:scale-105 duration-200 lg:pb-6 rounded-lg' >
                            <img className='h-64 rounded-2xl object-cover mb-4' src={images[0].url} alt="product name" />
                            <h1 className='text-lg font-medium'>{productname}</h1>
                            <div className='flex items-center'>
                                <ReactStars {...Option}  /> 
                                <span className='pl-2'>{`(Review - ${numOfReviews})`}</span>
                            </div>
                            <p className='py-3'>{`Stock - ${stock}`}</p>
                            <p>{`Price - $${price}`}</p>
                    </div>
              </Link>
  )
}

export default Product