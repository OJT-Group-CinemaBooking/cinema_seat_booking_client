import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { CINEMA_URL, IMAGE_URL } from "../features/config/baseURL"

const FETCH_URL = `${CINEMA_URL}/all`
const CREATE_URL = `${CINEMA_URL}/create`
const UPDATE_URL = `${CINEMA_URL}/update`

export const fetchAllCinema = createAsyncThunk('fetchAllCinema', async() => {
    const response = await axios.get(FETCH_URL)
    return {
        data : response.data,
        status : response.status
    }
})

export const createCinema = createAsyncThunk('createCinema', async(data) => {
    const response = await axios.post(CREATE_URL,data.cinema,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    if(response.status === 200){
        const uploadCinemaImage = await axios.post(`${IMAGE_URL}/upload/cinema/${response.data.id}`,data.formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
        if(uploadCinemaImage.status !== 200){
            console.log('fail to upload cinema image')
        }
    }else{
        console.log('fail to create cinema')
    }

    return {
        data : response.data,
        status : response.status
    }
})

export const updateCinema = createAsyncThunk('updateCinema', async(data) => {
    const response = await axios.put(UPDATE_URL,data.cinema,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    if(response.status === 200){
        console.log(data.formData)
        if(data.formData !== null && data.formData !== undefined){
            const uploadCinemaImage = await axios.post(`${IMAGE_URL}/upload/cinema/${response.data.id}`,data.formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(uploadCinemaImage.status !== 200){
                console.log('fail to upload cinema image')
            }
        }
        
        
    }else{
        console.log('fail to create cinema')
    }

    return {
        data : response.data,
        status : response.status
    }
})

export const deleteCinema = createAsyncThunk('deleteCinema', async(cinemaId) => {
    const response = await axios.delete(`${CINEMA_URL}/${cinemaId}/delete`)
    return {
        data : response.data,
        status : response.status
    }
})



const initialState = {
    cinemas : [],
    createCinema : {},
    updateCinema : {},
    status : 'idle',
    error : null
}

const CinemaSlice = createSlice({
    name : 'cinemaSlice',
    initialState,
    reducers : {
        setCinemaStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder){
        builder
        .addCase(createCinema.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createCinema.fulfilled , (state,action) => {
            if(action.payload?.status){
                const {data,status} = action.payload
                if(status !== 200){
                    console.log('fail to create cinema')
                }
                state.cinemas = [data, ...state.cinemas]
                state.createCinema = data
                state.status = 'create_success'
            }
        })
        .addCase(createCinema.rejected , (state,action) => {
            state.status = 'create_failed';
            state.error = action.error;
        })
        .addCase(fetchAllCinema.pending , (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllCinema.fulfilled , (state,action) => {
            if(action.payload?.status) {
                const {data,status} = action.payload
                if(status !== 200){
                    console.log("fail to fetch cinema")
                }
                state.cinemas = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllCinema.rejected , (state,action) => {
            state.status = 'fetch_fail'
            state.error = action.error
        })
        .addCase(updateCinema.fulfilled, (state,action) => {
            if(action.payload?.status){
                const { data, status } = action.payload;
                if(status !== 200){
                    console.log("failed to update cinema")
                }
                const cinema = state.cinemas.filter(c => c.id !== data.id)
                state.cinemas = [data, ...cinema]
                state.updateCinema = data
                state.status = 'update_success';
            }
        })
        .addCase(updateCinema.rejected, (state,action) => {
            state.status = 'update_failed'
            state.error = action.error
        })
        .addCase(deleteCinema.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const {data,status} = action.payload
                if(status !== 200) {
                    console.log('fail to delete cinema')
                }
                state.cinemas = state.cinemas.filter(cinema => cinema.id !== data)
                state.status = 'delete_success'
            }
        })
        .addCase(deleteCinema.rejected,(state,action) => {
            state.status = 'delete_failed'
            state.error = action.error
        })
    }
})

export default CinemaSlice.reducer
export const getAllCinema = (state) => state.cinema.cinemas
export const getCinemaStatus = (state) => state.cinema.status
export const getCreatedCinema = (state) => state.cinema.createCinema
export const getUpdatedCinema = (state) => state.cinema.updateCinema
export const getError = (state) => state.cinema.error
export const getCinemaById = (state,cinemaId) => state.cinema.cinemas.find((c) => c.id === Number(cinemaId))
export const { setCinemaStatusToIdle } = CinemaSlice.actions