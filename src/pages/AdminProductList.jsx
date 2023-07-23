import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { MdDelete, MdOutlineLaunch } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { AdminAllProductFetch } from '../components/Product Slice/AdminAllProductSlice';
import DashBoardSlider from './DashBoardSlider'
import { AdminDeleteProductFetch } from '../components/Product Slice/AdminDeleteProductSlice';

function AdminProductList() {

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { loading, Products } = useSelector((state) => state.AdminAllproduct)
  const { success } = useSelector((state) => state.AdminDelelteProduct)

 


  Products && Products.map((item) => {
    // console.log(item);
    return row.push({
      id: item._id,
      name: item.productname,
      stock: item.stock,
      price: item.price,
    })
  })

  useEffect(() => {
    dispatch(AdminAllProductFetch({ token }))
  }, [success]);
  return (
    <div className='dashboard h-full'>
      <DashBoardSlider />

      {loading && <Loader />}
      <div>
        <Box>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={12}
            className='MyOrders'
            autoHeight
            disableSelectionOnClick
          />
        </Box>
      </div>
    </div>
  )
}

export default AdminProductList