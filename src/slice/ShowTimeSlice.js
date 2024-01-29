import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SHOW_TIME_URL } from "../features/config/baseURL";

export const fetchAllShowTimeByMovieId = createAsyncThunk('fetchAllShowTimeByMovieId', async(movieId) => {
    const response = await axios.get(`${SHOW_TIME_URL}/movie/${movieId}`, {
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    return {
        data : response.data,
        status : response.status
    }
})

export const createNewShowTime = createAsyncThunk('createNewShowTime', async(data) => {
    const response = await axios.post(`${SHOW_TIME_URL}/${data.theaterId}/${data.movieId}/create`,
    data.showTime, 
    {
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    return {
        data : response.data,
        status : response.status
    }
})

export const deleteShowtTime = createAsyncThunk('deleteShowtTime', async(showTimeId) => {
    const response = await axios.delete(`${SHOW_TIME_URL}/${showTimeId}/delete`)

    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    showTimes : [],
    status : 'idle',
    error : null,
}

const ShowTimeSlice = createSlice({
    name : 'ShowTimeSlice',
    initialState,
    reducers : {
        setShowTimeStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllShowTimeByMovieId.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllShowTimeByMovieId.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log('failed to fetch showTimes by movieId')
                    state.status = 'fetch_failed'
                    return;
                }
                state.showTimes = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllShowTimeByMovieId.rejected, (state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(createNewShowTime.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createNewShowTime.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log('failed to create new ShowTime')
                    state.status = 'create_failed'
                    return;
                }
                state.showTimes = [...state.showTimes,data]
                state.status = 'create_success'
            }
        })
        .addCase(createNewShowTime.rejected, (state) => {
            state.status = 'create_failed'
        })
        .addCase(deleteShowtTime.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { status, data } = action.payload
                if(status !== 200) {
                    console.log('failed to delete showtime')
                    state.status = 'delete_failed'
                    return;
                }
                state.showTimes = state.showTimes.filter(st => st.id !== data)
                state.status = 'delete_success'
            }
        })
        .addCase(deleteShowtTime.rejected, (state) => {
            state.status = 'delete_failed'
        })
    }
})

export default ShowTimeSlice.reducer
export const { setShowTimeStatusToIdle } = ShowTimeSlice.actions
export const getShowTimeStatus = (state) => state.showtime.status
export const getAllShowTime = (state) => state.showtime.showTimes
export const getShowTimeById = (state,showTimeId) => 
    state.showtime.showTimes.find(st => st.id === showTimeId)