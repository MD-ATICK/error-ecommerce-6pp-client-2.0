import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const GetSingleOrderFetch = createAsyncThunk('GetSingleOrder/GetSingleOrder' , async (props) => {
    const id = props[0]
    const token = props[1]
     const res = await axios.post(`http://localhost:4000/api/v1/order/${id}` , {token} , {headers : {"Content-Type" : "application/json"}})
     console.log(res.data)
     return res.data
})


export const GetSingleOrderSlice = createSlice({
    name : 'GetSingleOrder' ,
    initialState : {
        products : '' ,
        loading : false ,
        error : null ,
    } ,
    extraReducers : (builder) => {
        builder.addCase(GetSingleOrderFetch.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(GetSingleOrderFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload.order
            state.error = null
        })
       
        builder.addCase(GetSingleOrderFetch.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
})

 
export default GetSingleOrderSlice.reducer ;