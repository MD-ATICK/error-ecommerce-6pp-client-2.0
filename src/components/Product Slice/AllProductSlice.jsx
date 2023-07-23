import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AllProduct = createAsyncThunk('/allProduct' , async (limit) => {
    //   console.log(limit);
    const res = await axios.get(`http://localhost:4000/api/v1/allproduct?limit=${limit}`)
    
    return res.data;

})


export const AllProductSlice = createSlice({
    name : 'allproduct' ,
    initialState : {
        loading : true ,
        data : []
    },
    
    extraReducers : (builder) => {
        builder.addCase(AllProduct.pending , (state) => {
            state.loading = true 
            state.data =[]
        })
        builder.addCase(AllProduct.fulfilled , (state , action) => {
            state.loading = false 
            state.data = action.payload.msg
        })
    }
    
})

export default AllProductSlice.reducer ;