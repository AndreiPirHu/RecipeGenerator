import { useSelector } from "react-redux";
import { CardsList } from "./cardsList";
import "./results.css";
import { RootState } from "../../features/rootReducer";
import axios from "axios";

export const Results = () => {
  let data: Recipes = useSelector((state: RootState) => state.generatedRecipes);

  //get images
  const getImages = async () => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const cseID = import.meta.env.VITE_CSE_ID;
      const query = "creamy mortadella pasta";
      const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseID}&q=${query}&searchType=image`;

      const response = await axios.get(url);

      console.log(response);
      console.log(response.data.items);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="Results">
      <button onClick={getImages}>Get images</button>
      <CardsList data={data} title="Generated Recipes" />
    </div>
  );
};
