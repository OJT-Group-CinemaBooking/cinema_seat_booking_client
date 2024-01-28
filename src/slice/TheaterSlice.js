import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { THEATER_URL } from "../features/config/baseURL"
import axios from "axios"

const FETCH_URL = `${THEATER_URL}/all`

export const fetchAllTheater = createAsyncThunk('fetchAllTheater', async() => {
    const response = await axios.get(FETCH_URL)
    return {
        data : response.data,
        status : response.status
    }
})

export const fetchTheaterByCinemaId = createAsyncThunk('fetchTheaterByCinemaId', async(cinemaId) => {
    const response = await axios.get(`${THEATER_URL}/${cinemaId}/find`)
    return {
        data : response.data,
        status : response.status
    }
})

export const createTheater = createAsyncThunk('createTheater', async(data) => {
    const response = await axios.post(`${THEATER_URL}/${data.cinemaId}/create`,data.theater,{
        headers : {
            "Content-Type" : "application/json"
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const updateTheater = createAsyncThunk('updateTheater', async(data) => {
    const response = await axios.put(`${THEATER_URL}/${data.cinemaId}/update`,data.theater,{
        headers : {
            "Content-Type" : "application/json"
        }
    })
    return {
        data : response.data,
        status : response.status
    }
})

export const deleteTheater = createAsyncThunk('deleteTheater', async(theaterId) => { 
    const response = await axios.delete(`${THEATER_URL}/${theaterId}/delete`)
    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    theaters : [],
    status : 'idle',
    error : null
}

const TheaterSlice = createSlice({
    name : 'theaterSlice',
    initialState,
    reducers : {

    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllTheater.pending,(state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllTheater.fulfilled,(state,action) => {
            if(action.payload?.status) {
                const {data,status} = action.payload
                if(status !== 200){
                    console.log("fail to fetch theater")
                }
                state.theaters = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllTheater.rejected,(state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(fetchTheaterByCinemaId.pending,(state) => {
            state.status = 'loading'
        })
        .addCase(fetchTheaterByCinemaId.fulfilled,(state,action) => {
            if(action.payload?.status) {
                const {data,status} = action.payload
                if(status !== 200){
                    console.log("fail to fetch theater")
                }
                state.theaters = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchTheaterByCinemaId.rejected,(state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(createTheater.fulfilled,(state,action) => {
            if(action.payload?.status){
                const {data,status} = action.payload
                if(status !== 200){
                    console.log('fail to create theater')
                }
                state.theaters = [data, ...state.theaters]
                state.status = 'create_success'
            }
        })
        .addCase(createTheater.rejected,(state,action) => {
            state.status = 'create_failed'
            state.error = action.error
        })
        .addCase(updateTheater.fulfilled,(state,action) => {
            if(action.payload?.status){
                const { status,data } = action.payload;
                if(status !== 200){
                    console.log("failed to update theater")
                }
                const theater = state.theaters.filter(t => t.id !== data.id)
                state.theaters = [data, ...theater]
                state.status = 'update_success'
            }
        })
        .addCase(updateTheater.rejected,(state,action) => {
            state.status = 'update_fail'
            state.error = action.error
        })
        .addCase(deleteTheater.fulfilled,(state,action) => {
            if(action.payload?.status) {
                const {data,status} = action.payload
                if(status !== 200) {
                    console.log('fail to delete theater')
                }
                state.theaters = state.theaters.filter(theater => theater.id !== data)
                state.status = 'delete_success'
            }
        })
        .addCase(deleteTheater.rejected,(state,action) => {
            state.status = 'delete_failed'
            state.error = action.error
        })
        
    }
})

export default TheaterSlice.reducer
export const getAllTheater = (state) => state.theater.theaters
export const getTheaterStatus = (state) => state.theater.status
export const getTheaterError = (state) => state.theater.error
export const getTheaterById = (state,theaterId) => 
    state.theater.theaters.find((t) => t.id === Number(theaterId))