import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const RegisterFetch = createAsyncThunk('register/register' , async (registerdata) => {
        console.log(registerdata)
     const res = await axios.post(`http://localhost:4000/api/v1/register` , registerdata , {headers: { 'Content-Type': 'application/json' }})
     return res.data
})


export const RegisterSlice = createSlice({
    name : 'register' ,
    initialState : {
        products : [] ,
        loading : false ,
        error : null ,
    } ,
    extraReducers : (builder) => {
        builder.addCase(RegisterFetch.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(RegisterFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload
            state.error = null
        })
       
        builder.addCase(RegisterFetch.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
})


export default RegisterSlice.reducer ;