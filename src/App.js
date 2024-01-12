import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";
import AdminLayout from "./components/ui/AdminLayout";
import AdminMovieTablePage from "./page/AdminMovieTablePage";
import NewMovieForm from "./features/admin/NewMovieForm";
import MovieCrew from "./features/admin/MovieCrew";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="movie" element={<MoviePage/>}/>
        <Route path="movie/detail" element={<MovieDetailPage/>}/>
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
