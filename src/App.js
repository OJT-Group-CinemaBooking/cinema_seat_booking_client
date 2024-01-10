import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import SeatBookingPage from "./components/page/SeatBookingPage";
import CheckOutPage from "./components/page/CheckOutPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<SeatBookingPage/>} />
        <Route path="payment" element={<CheckOutPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
