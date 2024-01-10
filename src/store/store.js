import { configureStore } from "@reduxjs/toolkit"
import SeatSlice from "../components/feature/seat/SeatSlice"

export const store = configureStore({
    reducer : {
        seat:SeatSlice
    }
})