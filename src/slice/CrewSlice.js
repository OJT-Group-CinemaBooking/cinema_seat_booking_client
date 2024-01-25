import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CREW_URL, IMAGE_URL } from "../features/config/baseURL";

const FETCH_URL = `${CREW_URL}/all`
const CREATE_URL = `${CREW_URL}/create`
const UPDATE_URL = `${CREW_URL}/update`
const UPLOAD_URL = `${IMAGE_URL}/upload/crew`

export const fetchAllCrew = createAsyncThunk('fetchAllCrew', async() => {
    const response = await axios.get(FETCH_URL)

    return {
        data : response.data,
        status : response.status
    }
})

export const createNewCrew = createAsyncThunk('createNewCrew', async(data) => {
    const response = await axios.post(CREATE_URL, data.crew, {
        headers : {
            "Content-Type" : "application/json"
        }
    })
    if(response.status === 200) {
        const uploadResponse = await axios.post(`${UPLOAD_URL}/${response.data.id}`,data.formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(uploadResponse.status !== 200) {console.log("failed to upload crew image")}
    }else {
        console.log("failed to create new crew")
    }

    return {
        data : response.data,
        status : response.status
    }
})


export const updateCrew = createAsyncThunk('updateCrew', async(data) => {
    const response = await axios.put(UPDATE_URL, data.crew, {
        headers : {
            "Content-Type" : "application/json"
        }
    })
    if(response.status === 200) {
        if(data.formData.has('file')) {
            const uploadResponse = await axios.post(`${UPLOAD_URL}/${response.data.id}`,data.formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(uploadResponse.status !== 200) {console.log("failed to upload crew image")}
        }
    }else {
        console.log("failed to update crew")
    }

    return {
        data : response.data,
        status : response.status
    }
})

export const deleteCrew = createAsyncThunk('deleteCrew', async(crewId) => {
    const response = await axios.delete(`${CREW_URL}/${crewId}/delete`)

    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    crews : [],
    starrings : [],
    directors : [],
    status : 'idle',
    error : null,
}

const CrewSlice = createSlice({
    name : 'CrewSlice',
    initialState ,
    reducers : {
        setCrewStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllCrew.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchAllCrew.fulfilled, (state, action) => {
            if(action.payload?.status){
                const { data, status } = action.payload;
                if(status !== 200){
                    console.log("failed to fetchCrew")
                }
                state.crews = data;
                state.starrings = state.crews.filter(c => c.role === 'Starring')
                state.directors = state.crews.filter(c => c.role === 'Director')
                state.status = 'fetch_success';
            }
        })
        .addCase(fetchAllCrew.rejected, (state, action) => {
            state.status = 'fetch_failed';
            state.error = action.error;
        })
        .addCase(createNewCrew.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createNewCrew.fulfilled, (state, action) => {
            if(action.payload?.status){
                const { data, status } = action.payload;
                if(status !== 200){
                    console.log("failed to create crew")
                }
                state.crews = [data, ...state.crews];
                state.status = 'create_success';
            }
        })
        .addCase(createNewCrew.rejected, (state,action) => {
            state.status = 'create_failed';
            state.error = action.error;
        })
        .addCase(updateCrew.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateCrew.fulfilled, (state, action) => {
            if(action.payload?.status){
                const { data, status } = action.payload;
                if(status !== 200){
                    console.log("failed to create crew")
                }
                const crews = state.crews.filter(c => c.id !== data.id)
                state.crews = [ data, ...crews ]
                state.status = 'update_success';
            }
        })
        .addCase(updateCrew.rejected, (state,action) => {
            state.status = 'create_failed';
            state.error = action.error;
        })
        .addCase(deleteCrew.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteCrew.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload;
                if(status !== 200) {
                    console.log("failed to delete crew")
                }
                state.crews = state.crews.filter(crew => crew.id !== data)
                state.status = 'delete_success'
            }
        })
        .addCase(deleteCrew.rejected, (state,action) => {
            state.status = 'delete_failed';
            state.error = action.error;
        })
    }
})

export default CrewSlice.reducer
export const getAllCrews = (state) => state.crew.crews
export const getCrewStatus = (state) => state.crew.status
export const getError = (state) => state.crew.error
export const getAllStarrings = (state) => state.crew.starrings
export const getAllDirectors = (state) => state.crew.directors
export const getCrewById = (state, crewId) => state.crew.crews.find((c) => c.id === Number(crewId))
export const { setCrewStatusToIdle } = CrewSlice.actions
