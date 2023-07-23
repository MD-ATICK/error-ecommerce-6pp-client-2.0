import { Dialog } from '@mui/material';
import React, { useEffect } from 'react'
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FetchSingleProduct } from '../Product Slice/SingleProductSlice';

function ReviewCard({ review }) {

  const dispatch = useDispatch();
  const { singleProductid } = useParams();
  const { success } = useSelector((state) => state.CreateReviewStore);

  const Option = {
    edit: false,
    color: 'rfba(20 , 20 , 20 , 0.1',
    activeColor: 'tomato',
    isHalf: true,
    value: review.rating,
    size: window.innerHeight < 600 ? 20 : 25
  }


  return (
    <div className='reviewCard bg-white text-center mx-auto flex flex-col justify-center items-center rounded-md p-3'>
      <img className='mt-3 h-16 w-16 object-cover rounded-full' src={review.image} alt="user" />
      <p className='ptags scale-110'>Yes , I am {review.name}</p>
      <ReactStars {...Option} />
      <span className='ptags text-left px-1'>{review.comment}</span>
    </div>

  )
}

export default ReviewCard
