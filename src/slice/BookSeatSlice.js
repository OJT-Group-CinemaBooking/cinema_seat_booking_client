import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BOOK_SEAT_URL } from "../features/config/baseURL";

const FETCH_URL = `${BOOK_SEAT_URL}/all`

export const fetchAllBookSeatByShowTimeId = createAsyncThunk('fetchAllBookSeatByShowTimeId',
 async(showTimeId) => {
    const response = await axios.get(`${FETCH_URL}/${showTimeId}/showTime`) 

    return {
        data : response.data,
        status : response.status
    }
})

const initialState = {
    bookSeatList : [],
    selectedSeats : [],
    status : 'idle',
    error : null,
}

const BookSeatSlice = createSlice({
    name : 'BookSeatSlice',
    initialState,
    reducers : {
        setBookSeatStatusToIdle : (state) => {
            state.status = 'idle'
        },
        emptySelectedSeats : (state) => {
            state.selectedSeats = []
        },
        addSelectedSeat : (state,action) => {
            state.selectedSeats = [...state.selectedSeats,action.payload]
        },
        removeSelectedSeat : (state,action) => {
            state.selectedSeats = state.selectedSeats.filter(seat => seat.id !== action.payload)
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllBookSeatByShowTimeId.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllBookSeatByShowTimeId.fulfilled, (state,action) => {
            if(action.payload?.status) {
                const { data, status } = action.payload
                if(status !== 200) {
                    console.log("failed to fetch bookSeat By showTimeId")
                    state.status = 'fetch_failed'
                    return
                }
                state.bookSeatList = data
                state.status = 'fetch_success'
            }
        })
        .addCase(fetchAllBookSeatByShowTimeId.rejected, (state,action) => {
            state.status = 'fetch_failed'
            state.error = action.error
        })
    }
})

export default BookSeatSlice.reducer
export const getBookSeatStatus = state => state.bookseat.status
export const getAllBookSeatList = state => state.bookseat.bookSeatList
export const getAllSelectedSeatList = state => state.bookseat.selectedSeats
export const { addSelectedSeat, removeSelectedSeat, setBookSeatStatusToIdle, emptySelectedSeats } = BookSeatSlice.actions