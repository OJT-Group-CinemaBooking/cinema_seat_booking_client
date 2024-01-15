import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";
import AdminLayout from "./components/ui/AdminLayout";
import AdminMovieTablePage from "./page/AdminMovieTablePage";
import NewMovieForm from "./features/admin/NewMovieForm";
import MovieCrew from "./features/admin/MovieCrew";
import SeatBookingPage from "./page/SeatBookingPage";
import CheckOutPage from "./page/CheckOutPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import BookingConfirmationPage from "./page/BookingConfirmationPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="movie" element={<MoviePage/>}/>
        <Route path="movie/detail" element={<MovieDetailPage/>}/>
        <Route path="book-seat" element={<SeatBookingPage/>} />
        <Route path="checkout" element={<CheckOutPage/>} />
        <Route path="confirmation" element={<BookingConfirmationPage/>}/>
        <Route path="login" element={<LoginPage/>} />
        <Route path="sign-up" element={<SignUpPage/>} />
      </Route>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="movie" element={<AdminMovieTablePage/>}/>
        <Route path="new-movie" element={<NewMovieForm/>}/>
        <Route path="crew" element={<MovieCrew/>}/>
      </Route>
    </Routes>
  );
}

export default App;
