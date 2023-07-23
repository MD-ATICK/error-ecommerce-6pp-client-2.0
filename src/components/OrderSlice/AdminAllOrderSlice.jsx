import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminAllOrderFetch = createAsyncThunk('AdminAllorder/AdminAllorder' , async (token) => {
    const res = await axios.post(`http://localhost:4000/api/v1//admin/order/all` , token , {headers : {'Content-Type' : 'application/json'}} )
    
    return res.data ;
})


export const AdminAllOrderSlice = createSlice({
    name : 'AdminAllorder' ,
    initialState : {
        loading : true ,
        Orders : '' ,
        success : true ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminAllOrderFetch.pending , (state) => {
            state.loading = true 
            state.Orders = []
            state.success = false
        })
        builder.addCase(AdminAllOrderFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.Orders = action.payload
            state.success = true
        })
        builder.addCase(AdminAllOrderFetch.rejected , (state , action) => {
            state.loading = false 
            state.Orders = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminAllOrderSlice.reducer ;