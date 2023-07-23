import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { startTransition } from "react";
// import { useDispatch } from "react-redux";

export const FetchProduct = createAsyncThunk('product/fetchProducts' , async (qurey) => {

    const KeywordSearch = qurey[0] || ''
    const CurrentPage = qurey[1] || 1
    const MinValue = qurey[2] ||0
    const MaxValue = qurey[3] || 9999999
    const ratings = qurey[4] || 0
    // console.log(MinValue);
    // console.log(MaxValue);

       const  res = await axios.get(`http://localhost:4000/api/v1/product?keyword=${KeywordSearch}&page=${CurrentPage}&price[gte]=${MinValue}&price[lte]=${MaxValue}&ratings[gte]=${ratings}`)
 
        return res.data
})



// thunk ar karone aikan return value aita action.payload hisabe kaj korbe..
// thunk -> mean jokto kora.


export const slice = createSlice({
    name : 'product' ,
    initialState : {
        products : [] ,
        loading : true ,
        error : null ,
    } ,
    extraReducers : (builder) => {
       
        builder.addCase(FetchProduct.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(FetchProduct.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload
            state.error = null
        })
       
        builder.addCase(FetchProduct.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
})

// export const { Requested , Successed , Failed } = slice.actions

export default slice.reducer ;



// single kore bojai -