import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { IMAGE_URL, MOVIE_URL } from "../features/config/baseURL"

const FETCH_URL = `${MOVIE_URL}/all`
const CREATE_URL = `${MOVIE_URL}/create`
const UPDATE_URL = `${MOVIE_URL}/update`

export const fetchAllMovie = createAsyncThunk('fetchAllMovie', async() => {
    const response = await axios.get(FETCH_URL)

    return {
        data : response.data,
        status : response.status
    }
})

export const createNewMovie = createAsyncThunk('createNewMovie', async(data) => {
    const response = await axios.post(CREATE_URL,data.movie,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    if(response.status === 200){
        const addGenereResponse = await axios.post(`${MOVIE_URL}/${response.data.id}/addgenere`,data.genereList,{
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(addGenereResponse.status !== 200) {console.log("failed to add genere")}
        const addCrewResponse = await axios.post(`${MOVIE_URL}/${response.data.id}/addcrew`,data.crewList,{
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(addCrewResponse.status !== 200) {console.log("failed to add crew")}
        const uploadPoster = await axios.post(`${IMAGE_URL}/upload/movie/${response.data.id}`,data.posterFormData,{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(uploadPoster.status !== 200) {console.log("failed to upload poster")}
        const uploadBanner = await axios.post(`${IMAGE_URL}/upload/movie/${response.data.id}B`,data.bannerFormData,{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(uploadBanner.status !== 200) {console.log("failed to upload banner")}
    }else {
        console.log("failed to create movie")
    }
    return {
        data : response.data,
        status : response.status
    }
})

export const updateMovie = createAsyncThunk('updateMovie', async(data) => {
    const response = await axios.put(UPDATE_URL,data.movie,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    if(response.status === 200){
        const addGenereResponse = await axios.post(`${MOVIE_URL}/${response.data.id}/addgenere`,data.genereList,{
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(addGenereResponse.status !== 200) {console.log("failed to add genere")}
        const addCrewResponse = await axios.post(`${MOVIE_URL}/${response.data.id}/addcrew`,data.crewList,{
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(addCrewResponse.status !== 200) {console.log("failed to add crew")}
        if(data.posterFormData.has('file')) {
            const uploadPoster = await axios.post(`${IMAGE_URL}/upload/movie/${response.data.id}`,data.posterFormData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(uploadPoster.status !== 200) {console.log("failed to upload poster")}
        }
        if(data.bannerFormData.has('file')) {
            const uploadBanner = await axios.post(`${IMAGE_URL}/upload/movie/${response.data.id}B`,data.bannerFormData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(uploadBanner.status !== 200) {console.log("failed to upload banner")}
        }
    }else {
        console.log("failed to create movie")
    }
    return {
        data : response.data,
        status : response.status
    }
})

export const deleteMovie = createAsyncThunk('deleteMovie', async(movieId) => {
    const response = await axios.delete(`${MOVIE_URL}/${movieId}/delete`, {
        headers : {}
    })
    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    movies : [],
    status : 'idle',
    error : null
}

const MovieSlice = createSlice({
    name : 'MovieSlice',
    initialState,
    reducers : {
        setMovieStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllMovie.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllMovie.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("fetch all movie failed")
                    state.status = 'fetch_failed'
                    return;
                }
                state.movies = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllMovie.rejected, (state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
        .addCase(createNewMovie.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createNewMovie.fulfilled, (state,action) => {
            if(action.payload?.data) {
                const { status, data } = action.payload;
                if(status !== 200) {
                    console.log('failed to create new movie')
                    return;
                }
                state.movies = [data,...state.movies]
                state.status = 'create_success'
            }
        })
        .addCase(createNewMovie.rejected, (state,action) => {
            state.status = 'create_failed'
            state.error = action.error
        })
        .addCase(updateMovie.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateMovie.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to update movie")
                    state.status = 'update_failed'
                    return;
                }
                const movies = state.movies.filter(m => m.id !== data.id)
                state.movies = [ data, ...movies]
                state.status = 'update_success'
            }
        })
        .addCase(updateMovie.rejected, (state,action) => {
            state.status = 'update_failed'
            state.error = action.error
        })
        .addCase(deleteMovie.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteMovie.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const {status,data} = action.payload
                if(status !== 200) {
                    console.log("failed to delete movie")
                }
                state.status = 'delete_success'
                state.movies = state.movies.filter(movie => movie.id !== data)
                if(state.movies.length === 0) {
                    state.status = 'idle'
                }
            }
        })
        .addCase(deleteMovie.rejected, (state,action) => {
            state.status = 'delete_failed'
            state.error = action.error
        })
    }
})

export default MovieSlice.reducer;
export const getAllMovies = state => state.movie.movies
export const getMovieStatus = state => state.movie.status
export const getMovieById = (state,movieId) => state.movie.movies.find(m => m.id === Number(movieId))
export const { setMovieStatusToIdle } = MovieSlice.actions