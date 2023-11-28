import { useSelector } from "react-redux";
import { CardsList } from "./cardsList";
import "./results.css";
import { RootState } from "../../features/rootReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Results = () => {
  let data: Recipes = useSelector((state: RootState) => state.generatedRecipes);
  const navigate = useNavigate();

  let title = "Generated Recipes";

  const navigateRedirect = () => {
    if (data.recipes[0].title == "") {
      navigate("/");
    }
  };

  useEffect(() => {
    navigateRedirect();
  }, []);

  return (
    <div className="Results">
      <CardsList data={data} title={title} />
    </div>
  );
};
