import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BOOK_SEAT_URL } from "../features/config/baseURL";

export const createCheckOut = createAsyncThunk('createCheckOut', async(data) => {
    
    const response = await axios.post(`${BOOK_SEAT_URL}/booked/${data.showtimeId}/${data.couponId}`, data.boughtSeatList, {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status,
    }
})

const initialState = {
    ticket : {},
    status : 'idle',
    error : null,
}

const CheckOutSlice = createSlice({
    name : 'CheckOutSlice',
    initialState,
    reducers : {
        setCheckoutStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(createCheckOut.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createCheckOut.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to create checkout")
                    state.status = 'create_failed'
                    return
                }
                state.ticket = data
                state.status = 'create_success'
            }
        })
        .addCase(createCheckOut.rejected, (state,action) => {
            state.status = 'create_failed'
            state.error = action.error
        })
    }
})

export default CheckOutSlice.reducer
export const getCheckoutStatus = state => state.checkout.status
export const getAllCheckoutTicket = state => state.checkout.tickets
export const getCheckoutTicket = state => state.checkout.ticket
export const { setCheckoutStatusToIdle } = CheckOutSlice.actions
