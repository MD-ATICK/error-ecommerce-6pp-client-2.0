import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect , useState } from 'react'
import { MdDelete, MdOutlineLaunch } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { AdminAllProductFetch } from '../components/Product Slice/AdminAllProductSlice';
import DashBoardSlider from './DashBoardSlider'
import { AdminDeleteProductFetch } from '../components/Product Slice/AdminDeleteProductSlice';
import { AdminAllusersFetch } from '../components/User Slice/AllUserSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function AdminUsers() {

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { adminUsers , loading } = useSelector((state) => state.AdminAllusers)
  const [success, setdeleteUser] = useState(false);


  const HandleDeleteUsers = async (props) => {
     const { data } = await axios.post(`http://localhost:4000/api/v1/admin/delete/${props.id}` , props , {headers : {"Content-Type" : "application/json"}})
     setdeleteUser(!success);
    } 

  const row = []

  const columns = [
    { field: 'id', headerName: 'User ID', width: 150, flex: 0.9 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      flex: 0.7,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      type : 'text' ,
      width: 150,
      flex: 0.5,
      cellClassName : (params) => {
        return params.getValue(params.id , 'role') === 'user' ? 'RedColor' : 'GreenColor'
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      type: 'number',
      width: 150,
      flex: 0.5,
      cellClassName: 'iconsize',
      sortable: false,
      renderCell: (params) => {
        
        return (
          <>
          <Link to={`/admin-Users-edit/${params.getValue(params.id , 'id')}`} className='hover:text-orange-600 text-right'><AiFillEdit /></Link>
          <button className=' hover:text-orange-600' onClick={() => HandleDeleteUsers({ token , id : params.getValue(params.id , 'id')})} ><MdDelete/></button>
          </> 
        )
      }
    },
  ];


  adminUsers != '' && adminUsers.map((item) => {
    return row.push({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
    })
  })

  useEffect(() => {
    dispatch(AdminAllusersFetch({ token }))
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

export default AdminUsers