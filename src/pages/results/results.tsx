import { useSelector } from "react-redux";
import { CardsList } from "./cardsList";
import "./results.css";
import { RootState } from "../../features/rootReducer";
import axios from "axios";
import { useEffect, useState } from "react";

export const Results = () => {
  const [loadingDone, setLoadingDone] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string[]>([]);
  let data: Recipes = useSelector((state: RootState) => state.generatedRecipes);

  /*
  let mockData: Recipes = {
    recipes: [
      {
        title: "Creamy Korean Potato and Quorn Stir-Fry",
        cuisine: "Korean",
        ingredients: [
          "2 large, diced potatoes",
          "1/2 cup cream",
          "1 red, sliced bell pepper",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 medium, thinly sliced cucumber",
          "1 cup, diced quorn",
          "2 cups, cooked rice",
          "1 medium, diced sweet potato",
        ],
        instructions: [
          "In a large skillet, heat the oil and butter over medium heat.",
          "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
          "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
          "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
          "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber.",
        ],
      },
      {
        title: "Creamy Quorn Stir-Fry",
        cuisine: "Korean",
        ingredients: [
          "2 large, diced potatoes",
          "1/2 cup cream",
          "1 red, sliced bell pepper",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 medium, thinly sliced cucumber",
          "1 cup, diced quorn",
          "2 cups, cooked rice",
          "1 medium, diced sweet potato",
        ],
        instructions: [
          "In a large skillet, heat the oil and butter over medium heat.",
          "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
          "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
          "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
          "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber.",
        ],
      },
      {
        title: "Creamy Korean Potato",
        cuisine: "Korean",
        ingredients: [
          "2 large, diced potatoes",
          "1/2 cup cream",
          "1 red, sliced bell pepper",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 medium, thinly sliced cucumber",
          "1 cup, diced quorn",
          "2 cups, cooked rice",
          "1 medium, diced sweet potato",
        ],
        instructions: [
          "In a large skillet, heat the oil and butter over medium heat.",
          "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
          "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
          "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
          "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber.",
        ],
      },
    ],
  };
*/
  let title = "Generated Recipes";

  const getImageData = async () => {
    //reset image data
    setImageData([]);

    //To not get Promise<string> or too many items in array do to async
    // create an array of promises with map
    const imagePromises = data.recipes.map(async (recipe) => {
      const newImage = await getImage(recipe.title);
      return newImage;
    });

    // wait for all promises to resolve
    const images = await Promise.all(imagePromises);

    // Update image data with all the images
    setImageData(images);

    //checks if there are recipes before showing them
    if (data.recipes.find((recipe) => recipe.title == "")) {
      return;
    } else {
      setLoadingDone(true);
    }
  };

  //get images from api or else set placeholder
  const getImage = async (searchQuery: string) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const cseID = import.meta.env.VITE_CSE_ID;
      const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseID}&q=${searchQuery}&searchType=image`;

      const response = await axios.get(url);

      const image: string = await response.data.items[0].link;
      return image;
    } catch (error) {
      console.log("Error: " + error);
      return "/src/assets/Card-placeholder.svg";
    }
  };

  useEffect(() => {
    getImageData();
  }, [data]);

  return (
    <div className="Results">
      {loadingDone ? (
        <CardsList data={data} imageData={imageData} title={title} />
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};
