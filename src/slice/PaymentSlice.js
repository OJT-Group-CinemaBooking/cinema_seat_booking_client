import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PAYMENT_URL } from "../features/config/baseURL";
import axios from "axios";

const CREATE_URL = `${PAYMENT_URL}/create`

export const createPayment = createAsyncThunk('createPayment', async(payment) => {
    const response = await axios.post(CREATE_URL,payment,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })

    return {
        data : response.data,
        status : response.status
    }
    
})

const initialState = {
    payment : {},
    status : 'idle',
    error : null
}

const PaymentSlice = createSlice({
    name : 'PaymentSlice',
    initialState,
    reducers : {
        emptyPayment : (state) => {
            state.status = 'idle'
            state.payment = {}
        },
    },
    extraReducers(builder) {
        builder
        .addCase(createPayment.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log('failed to create payment')
                    state.status = 'create_failed'
                    return
                }
                state.payment = data
                state.status = 'create_success'
            }
        })
        .addCase(createPayment.rejected, (state,action) => {
            state.status = 'create_failed'
            state.error = action.error
        })
    }
})

export default PaymentSlice.reducer
export const getPaymentStatus = (state) => state.payment.status
export const getPayment = (state) => state.payment.payment
export const { emptyPayment } = PaymentSlice.actions