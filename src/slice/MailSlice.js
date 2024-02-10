import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MAIL_URL } from "../features/config/baseURL";

export const sendMail = createAsyncThunk("sendMail", async(mailRequest) => {
    const response = await axios.post(`${MAIL_URL}/send`,mailRequest,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    return {
        status : response.status
    }
})

const initialState = {
    status : 'idle',
    error : null
}

const MailSlice = createSlice({
    name : 'MailSlice',
    initialState,
    reducers : {
        setMailStatusToIdle : (state) => {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(sendMail.fulfilled, (state,action) => {
            if(action.payload?.status) {
                state.status = 'success'
            }
        })
        .addCase(sendMail.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default MailSlice.reducer
export const getMailStatus = state => state.mail.status
export const { setMailStatusToIdle } = MailSlice.actions