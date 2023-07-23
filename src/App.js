import './App.css';
import Home from './pages/Home';
import React, { useState, useEffect } from 'react'
import { BiUpArrow } from 'react-icons/bi'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Product from './pages/Products';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer'
import SingleProduct from './components/home/SingleProduct';
import Products from './pages/Products';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import FourZeroFour from './pages/Error.jsx';
import UserOption from './pages/UserOption';
import UpdateData from './pages/UpdateData';
import ChangePassword from './pages/ChangePassword';
import CardItems from './pages/CardItems';
import Shipping from './pages/Shipping';
import ComfirmOrder from './pages/ComfirmOrder';
import Payment from './pages/Payment';
import Success from './pages/Success';
import OrderMe from './pages/OrderMe';
import SingleOrder from './pages/SingleOrder';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import AdminProductList from './pages/AdminProductList';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import AdminProductCreate from './pages/AdminProductCreate';
import AdminProductsEdit from './pages/AdminProductsEdit';
import AdminOrdersUpdate from './pages/AdminOrdersUpdate';
import UpdateUser from './pages/UpdateUser';
import AdminReview from './pages/AdminReview';

function App() {

  const [show, setshow] = useState(false);
  

  useEffect(() => {
    window.addEventListener('scroll', () => {
      // console.log(show);
      // console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 300) {
        setshow(true)
      } else {
        setshow(false)
      }
    })
  }, [show]);

  const handleclick = () => {
    document.documentElement.scrollTop = 0
  }

  const { products } = useSelector((state) => state.AboutMe)

  const token = localStorage.getItem('token')
  return (

    <BrowserRouter>
      <UserOption />
      <Navbar />
    
      <Routes>
      <Route path='*' element={<FourZeroFour />} />
        <Route path='/' element={<Home />} />
       {token && <Route path='/account' element={<Account />}/> } 
       {token && <Route path='/change-password' element={<ChangePassword/>}/> } 
        <Route path='/register' element={<Register />} />
       { !token && <Route path='/login' element={<Login />} />}
        <Route path='/:singleProductid' element={<SingleProduct />} />
        <Route path='/products/:singleProductid' element={<SingleProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/search' element={<Search />} />
        {token && <Route path='/me/update' element={<UpdateData/>} />}
        {token && <Route path='/card-items' element={<CardItems/>} />}
        {token && <Route path='/shipping' element={<Shipping/>} />}
        {token && <Route path='/comfirm-order' element={<ComfirmOrder/>} />}
        {token && <Route path='/payment' element={<Payment/>} />}
        {token && <Route path='/success' element={<Success/>} />}
        {token && <Route path='/order/me' element={<OrderMe/>} />}
        {token && <Route path='/order/:id' element={<SingleOrder/>} />}
        {token && products != '' && products.Profile.role === 'admin' && <Route path='/admin/dashboard' element={<Dashboard/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin/products' element={<AdminProductList/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin/orders' element={<AdminOrders/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin/users' element={<AdminUsers/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin/create-new-product' element={<AdminProductCreate/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin-products-edit/:id' element={<AdminProductsEdit/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin-orders-edit/:id' element={<AdminOrdersUpdate/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin-Users-edit/:id' element={<UpdateUser/>} />}
        {token && products && products.Profile.role === 'admin' && <Route path='/admin/Reviews' element={<AdminReview/>} />}
        
      </Routes>

      <div className={show ? 'block' : 'hidden'}>
        <button onClick={handleclick} className='scroll px-2 py-2 grid place-items-center rounded-md fixed bottom-6 right-6  bg-zinc-800  text-white' >
          <BiUpArrow className=' text-3xl' />
        </button>
      </div>
    </BrowserRouter>

  );
}

export default App;
