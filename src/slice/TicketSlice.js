import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TICKET_URL } from "../features/config/baseURL";

const FETCH_URL = `${TICKET_URL}/all`;
const CREATE_URL = `${TICKET_URL}/create`;

export const fetchAllTickets = createAsyncThunk("fetchAllTickets", async (showTime) => {
  const response = await axios.get(FETCH_URL, showTime, {
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return {
    data: response.data,
    status: response.status,
  };
});

export const createTicket = createAsyncThunk("createTicket", async (ticketRequest) => {
    const response = await axios.post(CREATE_URL, ticketRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
);

const initialState = {
    tickets: [],
    status: "idle",
    error: null
}

const TicketSlice = createSlice({
    name: 'TicketSlice',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchAllTickets.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllTickets.fulfilled, (state, action) => {
            if(action.payload?.status){
                const {data, status} = action.payload;
                if(status !== 200){
                    console.log("Fail to fetch Tickets")
                    return;
                }
                state.tickets = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllTickets.rejected, (state, action) => {
            state.status = 'fetch_fail'
            state.error = action.error
        })
        .addCase(createTicket.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createTicket.fulfilled, (state, action) => {
            if(action.payload?.status){
                const {data, status} = action.payload;
                if(status !== 200){
                    console.log("Fail to create ticket")
                    return;
                }
                state.tickets = [data, ...state.tickets]
                state.status = 'create_success'
            }
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.error = action.error
            state.status = "create_failed"
        })
    }
})

export default TicketSlice.reducer
