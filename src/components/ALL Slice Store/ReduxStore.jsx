import { configureStore } from "@reduxjs/toolkit";
import products from '../Product Slice/ProductSlice'
import singleProduct from '../Product Slice/SingleProductSlice'
import AllProduct from '../Product Slice/AllProductSlice'
import RegisterData from '../User Slice/RegisterSlice'
import LoginData from '../User Slice/LoginSlice'
import AboutMe from '../User Slice/MeSlice'
import MeInfoChange from '../User Slice/InfoChangeSlice'
import MeChangePassword from '../User Slice/PasswordChangeSlice'
import CardItems from '../Product Slice/CardItemsSlice'
import extra from '../../pages/TotalReducer'
import PostOrderData from '../OrderSlice/PostOrderSlice'
import GetOrderData from '../OrderSlice/GetOrderSlice'
import GetSingleOrderData from '../OrderSlice/GetSingleOrderSlice'
import CreateReviewStore from '../Product Slice/CreateReviewSlice'
import AdminAllproduct from '../Product Slice/AdminAllProductSlice'
import AdminDelelteProduct from '../Product Slice/AdminDeleteProductSlice'
import AdminAllOrder from '../OrderSlice/AdminAllOrderSlice'
import AdminAllusers from '../User Slice/AllUserSlice'
import AdminCreateProduct from '../Product Slice/AdminProductCreateSlice'
import AdminUpdateProduct from  '../Product Slice/AdminProductUpdateSlice'
import UserUpdate from '../User Slice/UserUpdateSlice'
import ReviewsGet from '../Product Slice/ReviewsGetSlice'


const Store = configureStore({
    reducer: {
        productStore: products,
        singleProduct: singleProduct ,
        AllProduct : AllProduct ,
        RegisterData : RegisterData ,
        LoginData : LoginData ,
        AboutMe : AboutMe,
        MeInfoChange : MeInfoChange,
        MeChangePassword : MeChangePassword ,
        CardItems : CardItems ,
        extra : extra ,
        PostOrderData : PostOrderData,
        GetOrderData : GetOrderData,
        GetSingleOrderData : GetSingleOrderData,
        CreateReviewStore : CreateReviewStore ,
        AdminAllproduct : AdminAllproduct ,
        AdminDelelteProduct : AdminDelelteProduct ,
        AdminAllOrder : AdminAllOrder ,
        AdminAllusers : AdminAllusers ,
        AdminCreateProduct : AdminCreateProduct ,
        AdminUpdateProduct : AdminUpdateProduct ,
        UserUpdate : UserUpdate ,
        ReviewsGet : ReviewsGet ,
    }
})

export default Store;