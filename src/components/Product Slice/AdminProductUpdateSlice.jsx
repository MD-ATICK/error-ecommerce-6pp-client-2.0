import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminProductUpdateFetch = createAsyncThunk('AdminUpdateProduct/AdminUpdateProduct' , async (props) => {
    console.log(props)
    const res = await axios.put(`http://localhost:4000/api/v1/product/${props.id}` , props , { headers : {'Content-Type' : 'application/json'}} )
    
    return res.data ;
})


export const AdminUpdateProductSlice = createSlice({
    name : 'AdminUpdateProduct' ,
    initialState : {
        loading : true ,
        Products : '' ,
        success : false ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminProductUpdateFetch.pending , (state) => {
            state.loading = true 
            state.Products = []
            state.success = false
        })
        builder.addCase(AdminProductUpdateFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.Products = action.payload
            state.success = true
        })
        builder.addCase(AdminProductUpdateFetch.rejected , (state , action) => { 
            state.loading = false 
            state.Products = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminUpdateProductSlice.reducer ;