import React, { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader';
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { AdminAllOrderFetch } from '../components/OrderSlice/AdminAllOrderSlice';
import DashBoardSlider from './DashBoardSlider';
import axios from 'axios';


function AdminOrders() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const time = localStorage.getItem('time')
    const { Orders, loading } = useSelector((state) => state.AdminAllOrder)
    const [successd, setsuccessd] = useState(false);
    
    const deleteFuntion = async (props) => {
        console.log(props)
        const res = await axios.post(`http://localhost:4000/api/v1//admin/order/delete/${props.id}` , props , { headers : {'Content-Type' : 'application/json'}} )
        setsuccessd(res.data.success)
    }
    console.log(successd)

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 150, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, 'status') === 'Delivered' ? 'GreenColor' : 'RedColor';
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
            cellClassName: 'iconsize',
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex justify-end items-center'>
                        <Link to={`/admin-orders-edit/${params.getValue(params.id , 'id')}`} className='hover:text-orange-700' ><AiFillEdit/></Link>
                        <button className='hover:text-orange-700' onClick={() => deleteFuntion({token , id : params.getValue(params.id , 'id')})} ><MdDelete /></button>
                    </div>
                )
            }
        },
    ];
    const rows = [];

    Orders != '' && Orders.orders.map((order) => {
        const { orderItems, _id, orderStatus, totalPrice } = order
        return rows.push({
            ItemQuantity: orderItems.length,
            id: _id,
            status: orderStatus,
            amount: totalPrice,
        })
    })

    useEffect(() => {
        dispatch(AdminAllOrderFetch({ token }))
    }, [successd]);

    return (
        <div className='dashboard'>
            <DashBoardSlider />

            <div className='datagrid'>
                {loading && <Loader />}
                {/* <p className='px-24 pb-3 pt-14 pr-32 text-right tracking-wider flex justify-center items-center gap-2'> <AiOutlineFieldTime className='text-right ml-auto text-2xl text-orange-700'/> Last Updated In : {time}</p> */}
                <Box >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={12}
                        className='MyOrders mx-14'
                        disableSelectionOnClick
                        autoHeight
                    />
                </Box>
            </div>

        </div>
    );
}

export default AdminOrders;