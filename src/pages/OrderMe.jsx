import React , {useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux'
import { GetOrderFetch } from '../components/OrderSlice/GetOrderSlice';
import Loader from '../components/Loader/Loader';
import {AiOutlineFieldTime} from 'react-icons/ai'
import {MdOutlineLaunch} from 'react-icons/md'
import { Link } from 'react-router-dom';


function OrderMe() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const time = localStorage.getItem('time')
  const { products , loading } = useSelector((state) => state.GetOrderData)
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      flex: 0.7,
      cellClassName : (params) => {
        return params.getValue(params.id , 'status') === 'Delivered' ? 'GreenColor' : 'RedColor' ;
      }
    },
    {
      field: 'ItemQuantity',
      headerName: 'Item Quantity',
      width: 150,
      flex: 0.5,
      type: 'number'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 150,
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'number',
      width: 150,
      flex: 0.5,
      cellClassName : 'iconsize' ,
      sortable : false ,
      renderCell : (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id , "id")}`}><MdOutlineLaunch/></Link>
        )
      }
    },
  ];
  const rows = [];

  products && products.map((order) => {
        const {orderItems , _id , orderStatus , totalPrice} = order
        return rows.push({
          ItemQuantity : orderItems.length ,
          id : _id ,
          status : orderStatus ,
          amount : totalPrice ,
        })
  } )

  useEffect(() => {
   dispatch(GetOrderFetch({token}))
  }, []);

  return (
    <div className='datagrid'>
      {loading && <Loader/>}
      {/* <p className='px-24 pb-3 pt-14 pr-32 text-right tracking-wider flex justify-center items-center gap-2'> <AiOutlineFieldTime className='text-right ml-auto text-2xl text-orange-700'/> Last Updated In : {time}</p> */}
      <Box >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          className='MyOrders mx-14'
          disableSelectionOnClick
          autoHeight
        />
      </Box>
    </div>
  );
}

export default OrderMe ;