import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AdminAllusersFetch = createAsyncThunk('AdminAllusers/AdminAllusers' , async (token) => {
    const res = await axios.post(`http://localhost:4000/api/v1/admin/users` , token , {headers : {'Content-Type' : 'application/json'}} )
    
    return res.data ;
})


export const AdminAllusersSlice = createSlice({
    name : 'AdminAllusers' ,
    initialState : {
        loading : true ,
        adminUsers : '',
        success : true ,
        error : null
    },
    
    extraReducers : (builder) => {
        builder.addCase(AdminAllusersFetch.pending , (state) => {
            state.loading = true 
            state.adminUsers = []
            state.success = false
        })
        builder.addCase(AdminAllusersFetch.fulfilled , (state , action) => {
            state.loading = false 
            state.error = null
            state.adminUsers = action.payload.users
            state.success = true
        })
        builder.addCase(AdminAllusersFetch.rejected , (state , action) => {
            state.loading = false 
            state.adminUsers = []
            state.error = action.payload.error
            state.success = false
        })
    }
    
})

export default AdminAllusersSlice.reducer ;