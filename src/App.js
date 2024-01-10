import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="movie" element={<MoviePage/>}/>
        <Route path="movie/detail" element={<MovieDetailPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
