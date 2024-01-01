import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>
    </Routes>
  );
}

export default App;
