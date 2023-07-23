import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminAllProductFetch = createAsyncThunk('AdminAllproduct/AdminAllproduct' , async (token) => {
    const res = await axios.post(`http://localhost:4000/api/v1/admin/products` , token , {headers : {'Content-Type' : 'application/json'}} )
    
    return res.data ;
})


export const AdminAllProductSlice = createSlice({
    name : 'AdminAllproduct' ,
    initialState : {
        loading : true ,
        Products : '',
        success : true ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminAllProductFetch.pending , (state) => {
            state.loading = true 
            state.data = []
            state.success = false
        })
        builder.addCase(AdminAllProductFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.Products = action.payload.Products
            state.success = true
        })
        builder.addCase(AdminAllProductFetch.rejected , (state , action) => {
            state.loading = false 
            state.data = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminAllProductSlice.reducer ;