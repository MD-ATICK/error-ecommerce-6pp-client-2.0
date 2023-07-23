import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const GetOrderFetch = createAsyncThunk('GetOrder/GetOrder' , async (token) => {
     const res = await axios.post(`http://localhost:4000/api/v1/order/me` , token , {headers : {"Content-Type" : "application/json"}})
     console.log(res.data)
     return res.data
})


export const GetOrderSlice = createSlice({
    name : 'GetOrder' ,
    initialState : {
        products : [] ,
        loading : false ,
        error : null ,
    } ,
    extraReducers : (builder) => {
        builder.addCase(GetOrderFetch.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(GetOrderFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload.orders
            state.error = null
        })
       
        builder.addCase(GetOrderFetch.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
})


export default GetOrderSlice.reducer ;