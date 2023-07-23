import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminDeleteProductFetch = createAsyncThunk('AdminDeleteProduct/AdminDeleteProduct' , async (props) => {
    console.log(props)
    const res = await axios.post(`http://localhost:4000/api/v1/product/${props.id}` , props , { headers : {'Content-Type' : 'application/json'}} )
    
    return res.data ;
})


export const AdminDeleteProductSlice = createSlice({
    name : 'AdminDeleteProduct' ,
    initialState : {
        loading : true ,
        Products : '' ,
        success : false ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminDeleteProductFetch.pending , (state) => {
            state.loading = true 
            state.data = []
            state.success = false
        })
        builder.addCase(AdminDeleteProductFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.Products = action.payload
            state.success = true
        })
        builder.addCase(AdminDeleteProductFetch.rejected , (state , action) => {
            state.loading = false 
            state.data = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminDeleteProductSlice.reducer ;