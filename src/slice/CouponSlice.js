import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { COUPON_URL } from "../features/config/baseURL"
import axios from "axios"

const FETCH_URL = `${COUPON_URL}/all`
const CREATE_URL = `${COUPON_URL}/create`

export const fetchAllCoupon = createAsyncThunk('fetchAllCoupon', async() => {
    const response = await axios.get(FETCH_URL)
    return {
        data : response.data,
        status : response.status
    }
})

export const createCoupon = createAsyncThunk('createCoupon', async(data) => {
    const response = await axios.post(CREATE_URL,data.coupon,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization : localStorage.getItem('token')
        }
    })

    return {
        data : response.data,
        status : response.status
    }
    
})

export const submitCoupon = createAsyncThunk('submitCoupon', async(couponId) => {
    const response = await axios.get(`${COUPON_URL}/${couponId}/use`,{
        headers : {
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const checkCoupon = createAsyncThunk('checkCoupon', async(couponCode) => {
    const response = await axios.get(`${COUPON_URL}/find/${couponCode}`,{
        headers : {
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const deleteCoupon = createAsyncThunk('deleteCoupon', async(couponId) => {
    const response = await axios.delete(`${COUPON_URL}/${couponId}/delete`,{
        headers : {
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    coupons : [],
    coupon : {},
    status : 'idle',
    error : null,
}

const CouponSlice = createSlice({
    name : 'CouponSlice',
    initialState,
    reducers : {
        setCouponToIdle : (state) => {
            state.status = 'idle'
        },
        setCouponStatusToFetchSuccess : (state) => {
            state.status = 'fetch_success'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllCoupon.pending,(state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllCoupon.fulfilled,(state,action) => {
            if(action.payload?.status){
                const {data,status} = action.payload
                if(status !== 200) {
                    console.log('fail to fetch coupon')
                }
                state.coupons = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllCoupon.rejected,(state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(createCoupon.fulfilled,(state,action) => {
            if(action.payload?.status){
                const {data,status} = action.payload
                if(status !== 200){
                    console.log('fail to create coupon')
                }
                state.coupons = [data, ...state.coupons]
                state.status = 'create_success'
            }
        })
        .addCase(createCoupon.rejected,(state,action) => {
            state.status = 'create_failed'
            state.error = action.error
            console.log('inside error create coupon')
        })
        .addCase(checkCoupon.pending,(state) => {
            state.status = 'check_coupon_loading'
        })
        .addCase(checkCoupon.fulfilled,(state,action) => {
            if(action.payload?.status){
                const {data,status} = action.payload
                if(status !== 200) {
                    console.log('fail to check coupon')
                }
                state.coupon = data
                state.status = 'check_coupon_success'
                console.log('success to check coupon')
            }
        })
        .addCase(checkCoupon.rejected,(state,action) => {
            state.status = 'check_coupon_failed'
            state.error = action.error
        })
        .addCase(deleteCoupon.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const {data,status} = action.payload
                if(status !== 200) {
                    console.log('fail to delete coupon')
                }
                state.coupons = state.coupons.filter(coupon => coupon.id !== data)
                state.status = 'delete_success'
            }
        })
        .addCase(deleteCoupon.rejected,(state,action) => {
            state.status = 'delete_failed'
            state.error = action.error
        })
        .addCase(submitCoupon.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log('fail to use coupon')
                }
                state.coupon = data
                state.status = 'use_success'
            }
        })
        .addCase(submitCoupon.rejected,(state,action) => {
            state.status = 'use_failed'
            state.error = action.error
        })
    }
})

export default CouponSlice.reducer
export const getAllCoupon = (state) => state.coupon.coupons
export const getCheckedCoupon = (state) => state.coupon.coupon
export const getCouponStatus = (state) => state.coupon.status
export const getCouponError = (state) => state.coupon.error
export const { setCouponToIdle, setCouponStatusToFetchSuccess } = CouponSlice.actions