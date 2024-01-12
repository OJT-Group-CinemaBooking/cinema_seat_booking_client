import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seat : [],
    state : 'idle',
    error : null
}

const SeatSlice = createSlice({
    name: "seatSlice",
    initialState,
    reducers: {}
})

export default SeatSlice.reducer