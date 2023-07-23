import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const CreateReview = createAsyncThunk('createReview/createReview' , async (props) => {

    const res = await axios.put(`http://localhost:4000/api/v1/review/new` , props , {headers : {'Content-Type' : 'application/json'}} )
    
    return res.data;

})


export const CreaeREviwSlice = createSlice({
    name : 'createReview' ,
    initialState : {
        loading : true ,
        data : [] ,
        success : true ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(CreateReview.pending , (state) => {
            state.loading = true 
            state.data = []
            state.success = false
        })
        builder.addCase(CreateReview.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.data = action.payload
            state.success = true
        })
        builder.addCase(CreateReview.rejected , (state , action) => {
            state.loading = false 
            state.data = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default CreaeREviwSlice.reducer ;