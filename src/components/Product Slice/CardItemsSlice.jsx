import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const navigate = useNavigate

export const CardItemsFetch = createAsyncThunk('CardItems/CardItems', async (props) => {

    console.log(props[1])
    const {data} = await axios.get(`http://localhost:4000/api/v1/product/${props[0]}`)

    const rdata = {
        productname : data.data.productname ,
        images : data.data.images[0].url ,
        stock : data.data.stock ,
        price : data.data.price ,
        quantity : props[1] ,
        _id : data.data._id
    }
    return rdata;


})

export const CardItemsSlice = createSlice({
    name: 'CardItems',
    initialState: {
        product: [],
        loading: true,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(CardItemsFetch.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(CardItemsFetch.fulfilled, (state, action) => {
            const x = localStorage.getItem('cardItems')
            if (x) {
                const imtdata = JSON.parse(x).map((cardItem) => cardItem)
                const id = action.payload._id
                const Finded = imtdata.find((item) => item._id === id)
                if(Finded){
                    console.log('Finded')
                    toast.error('Same Product Already Added')
                } else if (!Finded) {
                    console.log('Not Finded')
                    state.product = action.payload
                    const OldData = JSON.parse(x)
                    localStorage.setItem('cardItems', JSON.stringify([...OldData, state.product]))
                    toast.success('Product Card Added SuccessFully')
                }
                state.loading = false
                state.error = null
            } else {
                state.product = action.payload
                return localStorage.setItem('cardItems', JSON.stringify([state.product]))
            }
        })
        builder.addCase(CardItemsFetch.rejected, (state, action) => {
            state.product = ''
            state.loading = false
            state.error = action.error.message
        })
    }
})


export default CardItemsSlice.reducer;