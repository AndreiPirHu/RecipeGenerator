import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Results } from "./pages/results/results";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/results" element={<Results />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
