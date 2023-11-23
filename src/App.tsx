import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Results } from "./pages/results/results";
import { RecipeInfo } from "./pages/recipeInfo/recipeInfo";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/results" element={<Results />} />
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:title" element={<RecipeInfo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
