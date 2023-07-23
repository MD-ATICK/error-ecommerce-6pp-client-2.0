import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const MeChangeFetch = createAsyncThunk('MeChange/MeChange' , async (changedData) => {
        
        const res = await axios.put('http://localhost:4000/api/v1/me/change' , changedData , {headers : {"Content-Type" : "application/json"}})
        return res.data;
})


export const MeChangeSlice = createSlice({
    name : 'MeChange' , 
    initialState : {
        user : '' ,
        loading : false ,
        error : null ,
        success : false
    } ,
    extraReducers : (builder) => {
        builder.addCase(MeChangeFetch.pending , (state) => {
            state.loading = true
            state.success = false 
        })
       
        builder.addCase(MeChangeFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.user = action.payload
            state.error = null
            state.success = true
        })
       
        builder.addCase(MeChangeFetch.rejected , (state , action) => {
            state.loading = false 
            state.success = false
            state.user = []
            state.error = action.error.message
        })
    }
})

export default MeChangeSlice.reducer;