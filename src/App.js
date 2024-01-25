import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";
import AdminLayout from "./components/ui/AdminLayout";
import AdminMovieTablePage from "./page/AdminMovieTablePage";
import SeatBookingPage from "./page/SeatBookingPage";
import CheckOutPage from "./page/CheckOutPage";
import AdminMovieCrewPage from "./page/AdminMovieCrewPage";
import AdminMovieCrewDetailPage from "./page/AdminMovieCrewDetailPage";
import AdminNewMovieFromPage from "./page/AdminNewMovieFromPage";
import AdminUpdateMovieFormPage from "./page/AdminUpdateMovieFormPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import BookingConfirmationPage from "./page/BookingConfirmationPage";
import HomePage from "./page/HomePage";
import SeatTypePatternOfTheater from "./features/admin/seatPattern/SeatTypePatternOfTheater";
import SeatPatternAddForm from "./features/admin/seatPattern/SeatPatternAddForm";
import SeatPatternUpdateForm from "./features/admin/seatPattern/SeatPatternUpdateForm";
import AdminCinemaPage from "./page/AdminCinemaPage";
import AdminCinemaDetailPage from "./page/AdminCinemaDetailPage";
import AdminTheaterPage from "./page/AdminTheaterPage";
import AdminTheaterDetailPage from "./page/AdminTheaterDetailPage";
import ContactUsPage from "./page/ContactUsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="movie" element={<MoviePage/>}/>
        <Route path="movie/detail" element={<MovieDetailPage/>}/>
        <Route path="book-seat" element={<SeatBookingPage/>} />
        <Route path="checkout" element={<CheckOutPage/>} />
        <Route path="confirmation" element={<BookingConfirmationPage/>}/>
        <Route path="login" element={<LoginPage/>} />
        <Route path="sign-up" element={<SignUpPage/>} />
        <Route path="checkout" element={<CheckOutPage/>} />
      </Route>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="movie" element={<AdminMovieTablePage/>}/>
        <Route path="new-movie" element={<AdminNewMovieFromPage/>}/>
        <Route path="update-movie/:movieId" element={<AdminUpdateMovieFormPage/>}/>
        <Route path="crew" element={<AdminMovieCrewPage/>}/>
        <Route path="crew-detail/:crewId" element={<AdminMovieCrewDetailPage/>}/>
        <Route path="seatTypePattern/:theaterId" element={<SeatTypePatternOfTheater/>} />
        <Route path="seatForm/:theaterId" element={<SeatPatternAddForm/>} />
        <Route path="seatupdate/:theaterId/:seatTypePatternId" element={<SeatPatternUpdateForm/>} />
        <Route path="cinema" element={<AdminCinemaPage/>} />
        <Route path="cinema-detail/:cinemaId" element={<AdminCinemaDetailPage/>} />
        <Route path="theater/:cinemaId" element={<AdminTheaterPage/>}/>
        <Route path="theater-detail/:theaterId/:cinemaId" element={<AdminTheaterDetailPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
