import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const PostOrderFetch = createAsyncThunk('PostOrder/PostOrder' , async (orderData) => {
        console.log(orderData)
     const res = await axios.post(`http://localhost:4000/api/v1//order/new` , orderData , {headers: { 'Content-Type': 'application/json' }})
     return res.data
})


export const PostOrderSlice = createSlice({
    name : 'PostOrder' ,
    initialState : {
        products : [] ,
        loading : false ,
        error : null ,
    } ,
    extraReducers : (builder) => {
        builder.addCase(PostOrderFetch.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(PostOrderFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload
            state.error = null
        })
       
        builder.addCase(PostOrderFetch.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
})


export default PostOrderSlice.reducer ;