import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const ChangePasswordFetch = createAsyncThunk('changePasswordMe/changePasswordMe' , async (changedData) => {
        console.log(changedData)
        const res = await axios.put('http://localhost:4000/api/v1/password/change' , changedData , {headers : {"Content-Type" : "application/json"}})
        return res.data;
})


export const MeChangePasswordSlice = createSlice({
    name : 'changePasswordMe' , 
    initialState : {
        user : '' ,
        loading : false ,
        error : null ,
        success : false
    } ,
    extraReducers : (builder) => {
        builder.addCase(ChangePasswordFetch.pending , (state) => {
            state.loading = true
            state.success = false 
        })
       
        builder.addCase(ChangePasswordFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.user = action.payload
            state.error = null
            state.success = true
        })
       
        builder.addCase(ChangePasswordFetch.rejected , (state , action) => {
            state.loading = false 
            state.success = false
            state.user = []
            state.error = action.error.message
        })
    }
})

export default MeChangePasswordSlice.reducer;