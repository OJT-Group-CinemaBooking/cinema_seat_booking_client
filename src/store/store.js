import { configureStore } from "@reduxjs/toolkit"
import CrewSlice from "../slice/CrewSlice"
import MovieSlice from "../slice/MovieSlice"
import SeatSlice from "../slice/SeatSlice"
import CinemaSlice from "../slice/CinemaSlice"
import TheaterSlice from "../slice/TheaterSlice"
import TicketSlice from "../slice/TicketSlice"
import ShowTimeSlice from "../slice/ShowTimeSlice"

export const store = configureStore({
    reducer : {
        movie : MovieSlice,
        crew : CrewSlice,
        seat : SeatSlice,
        cinema : CinemaSlice,
        theater : TheaterSlice,
        showtime : ShowTimeSlice,
        ticket : TicketSlice,
    }
})