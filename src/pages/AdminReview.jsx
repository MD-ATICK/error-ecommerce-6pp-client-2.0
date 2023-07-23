import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader';
import { AdminReviewsFetch } from '../components/Product Slice/ReviewsGetSlice';
import DashBoardSlider from './DashBoardSlider'

function AdminReview() {


    const [productid, setproductid] = useState('');
    const [x, setx] = useState(0);
    const dispatch = useDispatch()
    const { loading, Reviews , success } = useSelector((state) => state.ReviewsGet)

    
    const HandleClick = () => {
        if (productid === '' || productid.length < 12) {
            return toast.error(<p className='text'>Something Error Check again</p>)
        }
        
        dispatch(AdminReviewsFetch(productid))
        setproductid('')
        // toast.success(<p className='text' >  Reviews Find</p>)
       
        
    }


    const columns = [
        { field: 'id', headerName: 'User ID', width: 150, flex: 0.9 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            flex: 0.7,
        },
        {
            field: 'comment',
            headerName: 'comment',
            type: 'text',
            width: 150,
            flex: 1.5,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, 'role') === 'user' ? 'RedColor' : 'GreenColor'
            // }
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            width: 150,
            flex: 0.4,
        },
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     type: 'number',
        //     width: 150,
        //     flex: 0.5,
        //     cellClassName: 'iconsize',
        //     sortable: false,
        //     renderCell: (params) => {

        //         return (
        //             <>
        //                 <Link to={`/admin-Users-edit/${params.getValue(params.id, 'id')}`} className='hover:text-orange-600 text-right'><AiFillEdit /></Link>
        //                 <button className=' hover:text-orange-600' onClick={() => HandleDeleteUsers({ token, id: params.getValue(params.id, 'id') })} ><MdDelete /></button>
        //             </>
        //         )
        //     }
        // },
    ];

    const rows = []

    // console.log(Reviews.reviews)
    Reviews != ''&& Reviews.success == true  && Reviews.reviews.map((review) => {
            return rows.push({
                id : review.user ,
                name : review.name ,
                comment : review.comment ,
                rating : review.rating
            })
        })

        useEffect(() => {
            if(Reviews && Reviews.success == false){
                 toast.error(<p className='text'>{Reviews.error}</p>)
            } 
            if (Reviews && Reviews.success == true && Reviews.reviews.length == 0) {
                toast.success(<p className='text'>No Reviews Found</p>)
            }
            console.log('atick')
        }, []);

    return (
        <div className='dashboard'>
            <DashBoardSlider />
            {loading && <Loader />}

            <div className="ReviewBox w-full">
                <div className="searchBox bg-neutral-300 shadow-lg">
                    <input type="text" placeholder='Enter Product Id' value={productid} onChange={(w) => setproductid(w.target.value)} required />
                    <button onClick={HandleClick} >Search</button>
                </div>
                <div className='w-full'>
                    <Box>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='MyOrders2'
                            autoHeight
                        />
                    </Box>

                </div>
            </div>
        </div>
    )
}

export default AdminReview