import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Results } from "./pages/results/results";
import { RecipeInfo } from "./pages/recipeInfo/recipeInfo";
import { History } from "./pages/history/history";
import { NavigationBar } from "./components/NavigationBar";
function App() {
  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/results" element={<Results />} />
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:title" element={<RecipeInfo />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
