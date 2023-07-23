import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import DashBoardSlider from './DashBoardSlider'
import { Doughnut, Line } from 'react-chartjs-2'
import {useDispatch, useSelector} from 'react-redux'
import { CChart } from '@coreui/react-chartjs'
import { AdminAllProductFetch } from '../components/Product Slice/AdminAllProductSlice'
import Loader from '../components/Loader/Loader'
import { AdminAllOrderFetch } from '../components/OrderSlice/AdminAllOrderSlice'
import { AdminAllusersFetch } from '../components/User Slice/AllUserSlice'

function Dashboard() {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const {Products , loading } = useSelector((state) => state.AdminAllproduct)
    const { Orders } = useSelector((state) => state.AdminAllOrder)
    const { adminUsers  } = useSelector((state) => state.AdminAllusers)
    let outOFstock = 0
   
    Products && Products.map((item) => {
        if (item.stock === 0) {
          return outOFstock += 1
        } 
    })

    const lineState = {
        labels: ["Initial Amount", 'Earned Amount', "Target Amount"],
        datasets: [{
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            borderColor: "rgba(197 , 72 , 49)",
            data: [0, Orders && Orders.totalamount, 9999999]
        }],
    }


    const doughnutState = {
        labels: ['Out of Stock Product' , 'Total Stock Product'],
        datasets: [{
                backgroundColor: ['#ed6b34', '#008cc4'],
                data: [outOFstock, Products.length - outOFstock ],
            }],
        }

        
        useEffect(() => {
            dispatch(AdminAllProductFetch({token}))
            dispatch(AdminAllOrderFetch({token}))
            dispatch(AdminAllusersFetch({token}))
          }, []);
    return (
        <div className='dashboard'>

            <DashBoardSlider />
            {loading && <Loader/>}
            <div className="dashboardContainer">
                <h2>Dashboard</h2>
                <div className="dashboardSummary">
                    <div>
                        <p>Total Earned Amount <br /> {Orders && Number(Orders.totalamount).toFixed(2) } /-</p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p className='font-semibold'>{Products && Products.length}</p>
                        </Link>
                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p className='font-semibold'>{Orders != '' && Orders.orders.length}</p>
                        </Link>
                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p className='font-semibold'>{adminUsers != '' && adminUsers.length}</p>
                        </Link>
                    </div>
                </div>

                <div className='line'>
                    <CChart type="line" data={lineState} />
                </div>

                <div className='doughnut mx-auto'>
                    <CChart type="doughnut" data={doughnutState}/>
                </div>

            </div>

        </div>
    )
}

export default Dashboard