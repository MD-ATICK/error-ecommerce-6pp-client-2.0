import { createSlice } from "@reduxjs/toolkit";



export const x = createSlice({
    name : 'x' ,
    initialState: {
        totalamount : 0 ,
    } , 
    reducers : {
        totalamount :(state , action) => {
            state.totalamount = action.payload
        } ,
        incrementprice : (state , action) => {
            state.totalamount +=  action.payload
        }
    }
})

export const {incrementprice , totalamount } = x.actions

export default x.reducer