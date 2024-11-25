import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ceo from "./pages/Ceo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ceo" element={<Ceo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
