import { configureStore } from "@reduxjs/toolkit"
import CrewSlice from "../slice/CrewSlice"
import MovieSlice from "../slice/MovieSlice"

export const store = configureStore({
    reducer : {
        movie : MovieSlice,
        crew : CrewSlice,
    }
})