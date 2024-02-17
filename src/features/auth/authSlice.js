import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { USER_URL } from "../config/baseURL";
import axios from "axios";

export const login = createAsyncThunk('login',async (loginRequest) => {
    const response = await axios.post(`${USER_URL}/login`,loginRequest,{
        headers:{
            "Content-Type":'application/json',
        }
    })

    return {
        data : response.data,
        statusCode : response.status
    }
})

export const getUserWithRoles = createAsyncThunk('getUserWithRoles',async (userId) => {
    const response = await axios.get(`${USER_URL}/${userId}/role`,{
        headers : {
        Authorization : localStorage.getItem('token')
        }
    })

    return {
    data : response.data,
    statusCode : response.status
    }
})

const initialState = {
    user:{},
    roles:[],
    status:'idle'
}

const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers : {
        logout : (state) => {
            state.status = 'idle'
            state.roles = []
            state.user = {}
            localStorage.clear()
        },
        setLoginStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder){
        builder
            .addCase(login.fulfilled,(state,action)=>{
                const { data, statusCode } = action.payload

                if(statusCode === 200){
                    state.status = data.loginStatus?'success' : 'failed'
                    state.roles = data.roles
                    state.user = data.user
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('userId',data.user.id)
                }
            })
            .addCase(login.rejected,(state,action)=>{
                state.status = 'failed'
            })
            .addCase(getUserWithRoles.fulfilled,(state,action)=>{
                const { data,statusCode } = action.payload

                if(statusCode === 200){
                    state.status = 'success'
                    state.user = data.user
                    state.roles = data.roles
                }
            })
    }
})

export default authSlice.reducer
export const getRoles = state => state.auth.roles
export const getLoginStatus = state => state.auth.status
export const getUser = state => state.auth.user
export const { logout, setLoginStatusToIdle } = authSlice.actions