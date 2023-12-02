import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Results } from "./pages/results/results";
import { RecipeInfo } from "./pages/recipeInfo/recipeInfo";
import { History } from "./pages/history/history";
import { NavigationBar } from "./components/navigationBar";
import { Login } from "./pages/login/login";
import { Account } from "./pages/account/account";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { actions } from "./features/user";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //keeps check on the state of the user and sends it to redux
    const unsubscribe = auth.onAuthStateChanged(() => {
      if (auth.currentUser !== null) {
        dispatch(actions.isUserLoggedIn(true));
      } else {
        dispatch(actions.isUserLoggedIn(false));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/results" element={<Results />} />
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:title" element={<RecipeInfo />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
