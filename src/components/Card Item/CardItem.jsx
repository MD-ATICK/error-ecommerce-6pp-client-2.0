import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { incrementprice } from '../../pages/TotalReducer';
import Loader from '../Loader/Loader';

function CardItem(props) {

  const { card } = props
  // console.log(card)
  const dispatch = useDispatch()
  const [quantity, setquantity] = useState(1);
  const [value, setvalue] = useState(0);

  const x = localStorage.getItem('cardItems')

  const HandleRemoveItem = (id) => {
    toast.success('Remove SuccessFully')
    const sendCard = JSON.parse(x).filter((item) => item._id !== id)
    localStorage.setItem('cardItems', JSON.stringify(sendCard))
    window.location.reload()
  }

  const HandleDrecrement = (id) => {
    if (quantity > 1) {
      setquantity(prev => prev - 1)
    } else {
      setquantity(1)
    }
  }
  const HandleIncrement = (id) => {
    if (quantity < card.stock) {
      setquantity(prev => prev + 1)
      dispatch(incrementprice(card.price))
    } else {
      setquantity(card.stock)
    }
  }

  return (
    <>
    {card && 
      <div className='cardcontainer'>
        <div className="CartItemCard">
          <img src={card.images} alt="card image" />
          <div className="item">
            <Link className='pb-1 jusfont' to={`/products/${card._id}`}>{card.productname}</Link>
            <span value={card.price}>{`Price : $${card.price}`} </span>
            <p onClick={() => HandleRemoveItem(card._id)}>Remove</p>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <button onClick={() => HandleDrecrement(card._id)} className='px-3 py-1 bg-orange-600 text-white'>-</button>
          <input className='text-center w-20' type="text" value={quantity} readOnly />
          <button onClick={() => HandleIncrement(card._id)} className='px-3 py-1 bg-orange-600 text-white'>+</button>
        </div>
        <p className='text-end my-auto px-3 edit'>{`$${card.price * quantity}`}</p>
      </div>
      }
    </>
  )
}

export default CardItem