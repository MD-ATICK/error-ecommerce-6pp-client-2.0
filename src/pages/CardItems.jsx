import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardItem from '../components/Card Item/CardItem'
import { totalamount } from './TotalReducer'

function CardItems() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const carditems = localStorage.getItem('cardItems')
  console.log(carditems)
  const x = useSelector((state) => state.extra)
  
  let total = 0
  
  
  const HandleCheckOut = () => {
      navigate('/shipping')
   }
   
   useEffect(() => {
     dispatch(totalamount(total))
   }, [total]);
   
   
   return (
    <>
      <div className="cartpage">
        <div className="cartheader">
          <p>Product</p>
          <p className='text-center'>Quantity</p>
          <p>SubTotal</p>
        </div>


        <div className="cartContainer">
          {
            JSON.parse(carditems).map((card) => {
              total += card.price
              return <CardItem card={card}  key={card._id} />
            })
          }
          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitbox">
              <p>Gross Total</p>
              <p className='font-semibold text-xl tracking-wider'>{`$${x.totalamount > 1 && x.totalamount}`}</p>
            </div>
          </div>
            <div className="checkoutBtn" onClick={HandleCheckOut}>
                <button >Checkout</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default CardItems