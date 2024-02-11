import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SEAT_URL } from "../features/config/baseURL";

const FETCH_URL = `${SEAT_URL}/all`
const CREATE_URL = `${SEAT_URL}/create`
const UPDATE_URL = `${SEAT_URL}/update`
const DELETE_URL = `${SEAT_URL}/delete`

export const deleteSeatTypePattern = createAsyncThunk('deleteSeatTypePattern', async(seatTypePatternId) => {
    const response = await axios.delete(`${DELETE_URL}/${seatTypePatternId}`,{
        headers : {
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const updateSeatTypePattern = createAsyncThunk('updateSeatTypePattern', async(data) => {
    console.log(data.seatTypePattern)
    const response = await axios.put(`${UPDATE_URL}/${data.theaterId}`,data.seatTypePattern,{
        headers : {
            'Content-Type' : 'application/json',
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const createSeatTypePattern = createAsyncThunk('createSeatTypePattern', async(data) => {
    const response = await axios.post(`${CREATE_URL}/${data.theaterId}`,data.seatTypePattern,{
        headers : {
            'Content-Type' : 'application/json',
            Authorization : localStorage.getItem('token')
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const fetchAllSeatTypePatternByTheater = createAsyncThunk('fetchAllSeatTypePatternByTheater', async(theaterId) => {
    const response = await axios.get(`${FETCH_URL}/${theaterId}`)
    return {
        data : response.data,
        status : response.status
    }
})

export const fetchAllSeatPattern = createAsyncThunk('fetchAllSeatPattern', async() => {
    const response = await axios.get(FETCH_URL)
    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    seatTypePatterns : [],
    status : 'idle',
    error : null,
}

const SeatSlice = createSlice({
    name : 'SeatSlice',
    initialState,
    reducers : {
        setSeatSliceStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllSeatPattern.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllSeatPattern.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to fetch all seatPattern")
                    state.status = 'fetch_failed'
                    return;
                }
                state.seatTypePatterns = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllSeatPattern.rejected, (state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(fetchAllSeatTypePatternByTheater.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllSeatTypePatternByTheater.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to fetch all seatPattern")
                    state.status = 'fetch_failed'
                    return;
                }
                state.seatTypePatterns = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllSeatTypePatternByTheater.rejected, (state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(createSeatTypePattern.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createSeatTypePattern.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to create seatPattern")
                    state.status = 'create_failed'
                    return;
                }
                state.seatTypePatterns = [data, ...state.seatTypePatterns]
                state.status = 'create_success'
            }
        })
        .addCase(createSeatTypePattern.rejected, (state,action) => {
            state.status = 'create_failed'
            state.error = action.error
        })
        .addCase(updateSeatTypePattern.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateSeatTypePattern.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to update seatPattern")
                    state.status = 'update_failed'
                    return;
                }
                const seatTypePatterns = state.seatTypePatterns.filter(sp => sp.id !== data.id)
                state.seatTypePatterns = [data, ...seatTypePatterns]
                state.status = 'update_success'
            }
        })
        .addCase(updateSeatTypePattern.rejected, (state,action) => {
            state.status = 'update_failed'
            state.error = action.error
        })
        .addCase(deleteSeatTypePattern.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to delete seatPattern")
                    state.status = 'delete_failed'
                    return;
                }
                state.seatTypePatterns = state.seatTypePatterns.filter( sp => sp.id !== data)
            }
        })
        .addCase(deleteSeatTypePattern.rejected, (state,action) => {
            state.status = 'delete_failed'
            state.error = action.error
        })
    }
})

export default SeatSlice.reducer;
export const getSeatTypePatternStatus = state => state.seat.status
export const getSeatTypePatternError = state => state.seat.error
export const getAllSeatTypePattern = state => state.seat.seatTypePatterns
export const getSeatTypePatternById = (state,seatTypePatternId) => state.seat.seatTypePatterns.find( sp => sp.id === Number(seatTypePatternId))
export const { setSeatSliceStatusToIdle } = SeatSlice.actions