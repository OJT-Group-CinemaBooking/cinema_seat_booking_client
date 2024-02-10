import { configureStore } from "@reduxjs/toolkit"
import CrewSlice from "../slice/CrewSlice"
import MovieSlice from "../slice/MovieSlice"
import SeatSlice from "../slice/SeatSlice"
import CinemaSlice from "../slice/CinemaSlice"
import TheaterSlice from "../slice/TheaterSlice"
import TicketSlice from "../slice/TicketSlice"
import CouponSlice from "../slice/CouponSlice"
import ShowTimeSlice from "../slice/ShowTimeSlice"
import BookSeatSlice from "../slice/BookSeatSlice"
import PaymentSlice from "../slice/PaymentSlice"
import CheckOutSlice from "../slice/CheckOutSlice"
import authSlice from "../features/auth/authSlice"
import OtpSlice from "../slice/OtpSlice"
import userSlice from "../slice/userSlice"
import MailSlice from "../slice/MailSlice"

export const store = configureStore({
    reducer : {
        movie : MovieSlice,
        crew : CrewSlice,
        seat : SeatSlice,
        cinema : CinemaSlice,
        theater : TheaterSlice,
        showtime : ShowTimeSlice,
        bookseat : BookSeatSlice,
        ticket : TicketSlice,
        coupon : CouponSlice,
        payment : PaymentSlice,
        checkout : CheckOutSlice,
        user : userSlice,
        auth : authSlice,
        otp : OtpSlice,
        mail : MailSlice
    }
})