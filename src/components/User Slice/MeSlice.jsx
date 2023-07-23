import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AboutFetch =  createAsyncThunk('aboutme/aboutme' , async (x) => {
     const res = await axios.post(`http://localhost:4000/api/v1/amerinfo` , x , {headers: { 'Content-Type': 'application/json' }})
     return res.data
})


export const AboutSlice = createSlice({
    name : 'aboutme' ,
    initialState : {
        products : '' ,
        loading : false ,
        error : null ,
        success : false
    } ,
    extraReducers : (builder) => {
        builder.addCase(AboutFetch.pending , (state) => {
            state.loading = true
            state.success = false 
        })
       
        builder.addCase(AboutFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload
            state.error = null
            state.success = true
        })
       
        builder.addCase(AboutFetch.rejected , (state , action) => {
            state.loading = false 
            state.success = false
            state.products = []
            state.error = action.error.message
        })
    }
})


export default AboutSlice.reducer ;