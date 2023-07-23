import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminCreateProductFetch = createAsyncThunk('AdminCreateProduct/AdminCreateProduct' , async (props) => {
    console.log(props)
    const res = await axios.post(`http://localhost:4000/api/v1/janaina/product/new/yes` , props , { headers : {'Content-Type' : 'application/json'}} )
    
    return res.data ;
})


export const AdminCreateProductSlice = createSlice({
    name : 'AdminCreateProduct' ,
    initialState : {
        loading : true ,
        Products : '' ,
        success : false ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminCreateProductFetch.pending , (state) => {
            state.loading = true 
            state.Products = []
            state.success = false
        })
        builder.addCase(AdminCreateProductFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.Products = action.payload
            state.success = true
        })
        builder.addCase(AdminCreateProductFetch.rejected , (state , action) => {
            state.loading = false 
            state.Products = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminCreateProductSlice.reducer ;