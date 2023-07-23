import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const UserUpdateFetch = createAsyncThunk('UserUpdate/UserUpdate' , async (props) => {
        console.log(props)
     const res = await axios.put(`http://localhost:4000/api/v1/admin/${props.id}` , props , {headers: { 'Content-Type': 'application/json' }})
     return res.data
})


export const UserUpdateSlice = createSlice({
    name : 'UserUpdate' ,
    initialState : {
        products : '' ,
        loading : false ,
        error : null ,
    } ,
    extraReducers : (builder) => {
        builder.addCase(UserUpdateFetch.pending , (state) => {
            state.loading = true
        })
       
        builder.addCase(UserUpdateFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.products = action.payload
            state.error = null
        })
       
        builder.addCase(UserUpdateFetch.rejected , (state , action) => {
            state.loading = false 
            state.products = []
            state.error = action.error.message
        })
    }
})


export default UserUpdateSlice.reducer ;