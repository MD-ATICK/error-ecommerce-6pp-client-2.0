import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const LoginFetch = createAsyncThunk('login/login' , async (loginData) => {
    const res = await axios.post( 'http://localhost:4000/api/v1/login' , loginData , {headers : {"Content-Type" : "application/json"}})
    return res.data ;
})


export const Loginslice = createSlice({
    name : 'login' ,
    initialState : {
        products : [] ,
        loading : false ,
        error : null ,
    } ,
    extraReducers : (builder) => {
        builder.addCase(LoginFetch.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(LoginFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload
            state.error = null
        })
       
        builder.addCase(LoginFetch.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
}) 


export default Loginslice.reducer;