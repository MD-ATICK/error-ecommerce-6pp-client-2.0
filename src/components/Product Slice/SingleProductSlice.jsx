import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



export const FetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProducts', async (id) => {

    const res = await axios.get(`http://localhost:4000/api/v1/product/${id}`)

    return res.data
})

export const sproduct = createSlice({
    name: 'singleProduct',

    initialState: { 
        Sproduct: ''  ,
        loading : true ,
    },

    extraReducers: (builder) => {
        builder.addCase(FetchSingleProduct.pending , (state) => {
            state.loading = true
        })
        builder.addCase(FetchSingleProduct.fulfilled, (state, action) => {
            state.Sproduct = action.payload
            state.loading = false
        })
    }
})


export default sproduct.reducer