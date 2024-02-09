import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CREW_URL, IMAGE_URL } from "../features/config/baseURL";

const FETCH_URL = `${CREW_URL}/all`
const CREATE_URL = `${CREW_URL}/create`
const UPDATE_URL = `${CREW_URL}/update`
const UPLOAD_URL = `${IMAGE_URL}/upload/crew`

const token = localStorage.getItem('token')

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
            "Content-Type" : "application/json",
            Authorization : token
        }
    })
    if(response.status === 200) {
        const uploadResponse = await axios.post(`${UPLOAD_URL}/${response.data.id}`,data.formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(uploadResponse.status !== 200){
            console.log("failed to upload crew image")
        }
    }

    return {
        data : response.data,
        status : response.status
    }
})


export const updateCrew = createAsyncThunk('updateCrew', async(data) => {
    const response = await axios.put(UPDATE_URL, data.crew, {
        headers : {
            "Content-Type" : "application/json",
            Authorization : token
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
    }
    return {
        data : response.data,
        status : response.status
    }
})

export const deleteCrew = createAsyncThunk('deleteCrew', async(crewId) => {
    const response = await axios.delete(`${CREW_URL}/${crewId}/delete`,{
        headers : {
            Authorization : token
        }
    })

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
    createStatus : 'idle',
    updateStatus : 'idle',
    deleteStatus : 'idle',
    error : null,
    createdCrew : {},
    updatedCrew : {},
}

const CrewSlice = createSlice({
    name : 'CrewSlice',
    initialState ,
    reducers : {
        setCrewStatusToIdle : (state) => {
            state.status = 'idle'
        },
        setCrewStatusToSuccess : (state) => {
            state.status = 'success'
        },
        setCrewCreateStatusToIdle : (state) => {
            state.createStatus = 'idle'
        },
        setCrewUpdateStatusToIdle : (state) => {
            state.updateStatus = 'idle'
        },
        setCrewDeleteStatusToIdle : (state) => {
            state.deleteStatus = 'idle'
        },
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
                state.status = 'success';
            }
        })
        .addCase(fetchAllCrew.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error;
        })
        .addCase(createNewCrew.pending, (state) => {
            state.createStatus = 'loading';
        })
        .addCase(createNewCrew.fulfilled, (state, action) => {
            if(action.payload?.status){
                const { data, status } = action.payload;
                if(status !== 200){
                    console.log("failed to create crew")
                }
                state.crews = [data, ...state.crews];
                state.createdCrew = data;
                state.createStatus = 'success';
            }
        })
        .addCase(createNewCrew.rejected, (state,action) => {
            state.createStatus = 'failed';
            state.error = action.error;
        })
        .addCase(updateCrew.pending, (state) => {
            state.updateStatus = 'loading';
        })
        .addCase(updateCrew.fulfilled, (state, action) => {
            if(action.payload?.status){
                const { data, status } = action.payload;
                
                if(status !== 200){
                    console.log("failed to create crew")
                }
                state.updatedCrew = data;
                const crews = state.crews.filter(c => c.id !== data.id)
                state.crews = [ data, ...crews ]
                state.updateStatus = 'success';
            }
        })
        .addCase(updateCrew.rejected, (state,action) => {
            state.updateStatus = 'failed';
            state.error = action.error;
        })
        .addCase(deleteCrew.pending, (state) => {
            state.deleteStatus = 'loading';
        })
        .addCase(deleteCrew.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload;
                if(status !== 200) {
                    console.log("failed to delete crew")
                }
                state.crews = state.crews.filter(crew => crew.id !== data)
                state.deleteStatus = 'success'
            }
        })
        .addCase(deleteCrew.rejected, (state,action) => {
            state.deleteStatus = 'failed';
            state.error = action.error;
        })
    }
})

export default CrewSlice.reducer
export const getAllCrews = (state) => state.crew.crews
export const getCrewStatus = (state) => state.crew.status
export const getCrewCreateStatus = (state) => state.crew.createStatus
export const getCrewUpdateStatus = (state) => state.crew.updateStatus
export const getCrewDeleteStatus = (state) => state.crew.deleteStatus
export const getError = (state) => state.crew.error
export const getAllStarrings = (state) => state.crew.starrings
export const getAllDirectors = (state) => state.crew.directors
export const getCreatedCrew = (state) => state.crew.createdCrew
export const getUpdatedCrew = (state) => state.crew.updatedCrew
export const getCrewById = (state, crewId) => state.crew.crews.find((c) => c.id === Number(crewId))
export const { 
    setCrewStatusToIdle, 
    setCrewStatusToSuccess,
    setCrewCreateStatusToIdle,
    setCrewUpdateStatusToIdle,
    setCrewDeleteStatusToIdle,
} = CrewSlice.actions
