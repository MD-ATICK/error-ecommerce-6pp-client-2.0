import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import ReviewCard from '../home/ReviewCard'
import { FetchSingleProduct } from '../Product Slice/SingleProductSlice'
import { CardItemsFetch } from '../Product Slice/CardItemsSlice'
import { toast } from 'react-hot-toast'
import { GrClose } from 'react-icons/gr'
import { CreateReview } from '../Product Slice/CreateReviewSlice'
import { Button, DialogActions, Dialog, DialogContent, DialogTitle, Rating } from '@mui/material'
function SingleProduct() {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [quantity, setquantity] = useState(1);
  const { singleProductid } = useParams()
  const token = localStorage.getItem('token')
  const { Sproduct, loading } = useSelector((state) => state.singleProduct)
  const { product } = useSelector((state) => state.CardItems)
  const { success } = useSelector((state) => state.CreateReviewStore)
  const { data } = Sproduct
  const [open, setopen] = useState(false);
  const [rating, setrating] = useState('');
  const [comment, setcomment] = useState('');
  const Option = { edit: false, color: 'rgba(20 ,20 ,20 , 0.05' , activeColor: 'tomato', size: window.innerWidth < 600 ? 20 : 25, isHalf: true, }
 



  const CreateReviewDetails = {
    token,
    id: singleProductid,
    rating,
    comment: comment.trim(),
  }

  const HandleReviewSubmit = (w) => {
    w.preventDefault();
    console.log(CreateReviewDetails)
    dispatch(CreateReview(CreateReviewDetails));
    setopen(!open);
  }

  const HandleCardItems = () => {
    if (!token) {
      return navigate('/login')
    }
    dispatch(CardItemsFetch([singleProductid, quantity]))
  }

  const submitReviewToggle = () => {
      setopen(false)
  }


  useEffect(() => {
    dispatch(FetchSingleProduct(singleProductid))
  }, [success]);
  return (
    <div>
      {loading && <Loader /> }
      { Sproduct != "" &&  <>
       <div>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:h-screen place-items-center lg:place-items-start overflow-hidden'>
          <div className=" scale-75 cart-img">
            <img className='h-full w-full rounded-2xl border-2 object-cover' src={Sproduct.data.images[0].url} alt="" />
          </div>
          <div className="my-auto pb-24">
            <h2 className='py-4'>{data.productname}</h2>
            <p className='text'><span className='text textz font-semibold'>CateGory : </span>{Sproduct.data.category}</p>
            <p className='py-3 text'><span className='text-lg font-semibold text textz'>Desc :</span>  {Sproduct.data.description}</p>
            <p className={data.stock > 1 ? 'font-medium text text-xl text-green-700' : 'font-medium text textz text-lg text-red-600'} ><span className='text-black font-semibold text textz'>Stock : </span> {data.stock > 1 ? 'In Stock' : 'Stock Out'}</p>
            <button onClick={HandleCardItems} className='bg-green-700 rounded-full py-3 px-12 text text-white hover:scale-105 duration-50 my-9'>Add To Cart</button>
            <div className="flex justify-left items-center">
              <ReactStars {...Option} value={Sproduct.data.ratings} />
              <p>({Sproduct.data.numOfReviews} reviews)</p>
            </div>
            <p className='ptagprice pt-6'> ${Sproduct.data.price * quantity}</p>
            <button onClick={() => setopen(!open)} className='submitreviewfrist border-2 mt-12 border-solid py-2 px-7 rounded-full border-green-700 hover:bg-green-700 tracking-wider hover:text-white'>Submit Review</button>
          </div>
        </div>
        <div className='py-9 bg-neutral-300'>
          <h1 className='border-l-4 border-solid border-cyan-700 text-3xl pl-2 tracking-wide w-96 py-2 font-bold text-center my-9 mx-auto '>Review Of Our Product</h1>
          {data && data.reviews[0] ? <div className='ds1300 grid grid-cols-2 lg:grid-cols-4 gap-7 text-center'>
            {
              data.reviews.map((review) => <ReviewCard key={review._id} review={review} />)
            }
          </div> : <p className='text-center py-6'>NO REVIEWS FOUND !!</p>
          }
        </div>
      </div>

    <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      onClose={submitReviewToggle}
    >
      <h1 className='tracking-wider pl-3 py-2 border-l-4  ml-6 mt-6 text textz border-orange-700' >Submit Review</h1>
      <DialogContent className='dialogContent'>
        <Rating
          onChange={(w) => setrating(w.target.value)}
          value={rating}
          size='large'
        />
        <textarea name="" className='submitDialogTextArea text' id="" cols="30" value={comment} onChange={(w) => setcomment(w.target.value)} rows="5" ></textarea>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)} color='secondary' className='py-3' >Cancel</Button>
        <Button onClick={HandleReviewSubmit} >Submit</Button>
      </DialogActions>
    </Dialog>
    </>
    }
      <p>atick2</p>
    </div>
  )
}

export default SingleProduct
