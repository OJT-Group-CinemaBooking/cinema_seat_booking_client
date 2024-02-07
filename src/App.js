import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";
import AdminLayout from "./components/ui/AdminLayout";
import AdminMovieTablePage from "./page/AdminMovieTablePage";
import SeatBookingPage from "./page/SeatBookingPage";
import AdminMovieCrewPage from "./page/AdminMovieCrewPage";
import AdminMovieCrewDetailPage from "./page/AdminMovieCrewDetailPage";
import AdminNewMovieFromPage from "./page/AdminNewMovieFromPage";
import AdminUpdateMovieFormPage from "./page/AdminUpdateMovieFormPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
import SeatTypePatternOfTheater from "./features/admin/seatPattern/SeatTypePatternOfTheater";
import SeatPatternAddForm from "./features/admin/seatPattern/SeatPatternAddForm";
import SeatPatternUpdateForm from "./features/admin/seatPattern/SeatPatternUpdateForm";
import AdminCinemaPage from "./page/AdminCinemaPage";
import AdminCinemaDetailPage from "./page/AdminCinemaDetailPage";
import AdminTheaterPage from "./page/AdminTheaterPage";
import AdminTheaterDetailPage from "./page/AdminTheaterDetailPage";
import ContactUsPage from "./page/ContactUsPage";
import AdminCouponPage from "./page/AdminCouponPage";
import MovieSchedule from "./features/admin/movie/MovieSchedule";
import ConfirmationPage from "./page/ConfirmationPage";
import CinemasPage from "./page/CinemasPage";
import ShowTimeMovie from "./features/cinemas/ShowTimeMovie";
import ProfilePage from "./page/ProfilePage";
import OTPForm from "./features/user/OTPForm";

function App() {
  return (
    <Routes>
      {/* client view */}
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />} />
        <Route path="user/otp" element={<OTPForm/>} />

        {/* for profile */}
        <Route path="profile">
          <Route index  element={<ProfilePage />} />
        </Route>

        {/* for movie */}
        <Route path="movie" >
          <Route index element={<MoviePage/>} />
          <Route path=":movieId/detail" element={<MovieDetailPage/>}/>
          <Route path=":movieId/theater/:theaterId/show-time/:showTimeId/seat" element={<SeatBookingPage/>} />
        </Route>

        <Route path="ticket/:ticketId" element={<ConfirmationPage/>}/>
        <Route path="login" element={<LoginPage/>} />
        <Route path="sign-up" element={<SignUpPage/>} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="cinema" element={<CinemasPage />} />
        <Route path="show-movie/:theaterId" element={<ShowTimeMovie />} />
      </Route>

      {/* admin pannel */}
      <Route path="/admin" element={<AdminLayout/>}>

        {/* for movie */}
        <Route path="movie">
          <Route index element={<AdminMovieTablePage/>}/>
          <Route path="new" element={<AdminNewMovieFromPage/>}/>
          <Route path=":movieId/update" element={<AdminUpdateMovieFormPage/>}/>
          <Route path=":movieId/schedule" element={<MovieSchedule />} />
        </Route>

        {/* for movie crew */}
        <Route path="crew">
          <Route index element={<AdminMovieCrewPage/>}/>
          <Route path=":crewId/update" element={<AdminMovieCrewDetailPage/>}/>
        </Route>

        {/* for cinema to seat-pattern */}
        <Route path="cinema">
          <Route index element={<AdminCinemaPage/>} />
          <Route path=":cinemaId/update" element={<AdminCinemaDetailPage/>}/>
          <Route path=":cinemaId/theater">
            <Route index element={<AdminTheaterPage/>}/>
            <Route path=":theaterId/update" element={<AdminTheaterDetailPage/>} />
            <Route path=":theaterId/seat-pattern" element={<SeatTypePatternOfTheater/>} />
            <Route path=":theaterId/seat-form" element={<SeatPatternAddForm/>} />
            <Route path=":theaterId/seat-pattern/:seatTypePatternId/update" 
              element={<SeatPatternUpdateForm/>}
            />
          </Route>
        </Route>
        <Route path="coupon" element={<AdminCouponPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
