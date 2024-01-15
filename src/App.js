import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";
import SeatBookingPage from "./page/SeatBookingPage";
import CheckOutPage from "./page/CheckOutPage";
import BookingConfirmationPage from "./page/BookingConfirmationPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";


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
    </Routes>
  );
}

export default App;
