import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminReviewsFetch = createAsyncThunk('AdminReviews/AdminReviews' , async (id) => {
    console.log(id)
    const res = await axios.get(`http://localhost:4000/api/v1/allreview?id=${id}`)
    
    return res.data ;
})


export const AdminReviewsSlice = createSlice({
    name : 'AdminReviews' ,
    initialState : {
        loading : false ,
        
        Reviews : '' ,
        success : false ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminReviewsFetch.pending , (state) => {
            state.loading = true 
            state.Reviews = []
            state.success = false
        })
        builder.addCase(AdminReviewsFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.Reviews = action.payload
            state.success = true
        })
        builder.addCase(AdminReviewsFetch.rejected , (state , action) => {
            state.loading = false 
            state.Reviews = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminReviewsSlice.reducer ;