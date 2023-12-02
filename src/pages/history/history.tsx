import React, { useEffect, useState } from "react";
import "./history.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
export const History = () => {
  const recipeHistoryJSON = localStorage.getItem("recipeHistory");
  const [filterInput, setFilterInput] = useState<string>("");
  const [recipeNodeList, setRecipeNodeList] = useState<React.ReactNode[]>([]);
  const recipeHistory =
    recipeHistoryJSON == null ? null : JSON.parse(recipeHistoryJSON);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const createNodeList = () => {
    let recipes: Recipes | null = null;

    setRecipeNodeList([]);
    if (isLoggedIn) {
      //checks if user is logged in to get recipes from firebase instead
    } else {
      recipes = recipeHistory;
    }

    if (recipes === null) {
      //checks for empty array of recipes and ends if true
      return;
    }

    let newNodeList: React.ReactNode[] = [];
    for (let recipe of recipes.recipes) {
      const filterValues = `${recipe.title.toLowerCase()} ${recipe.ingredients
        .toString()
        .toLowerCase()} ${recipe.cuisine.toLowerCase()}`;

      if (
        filterInput == null ||
        (filterInput !== null && filterValues.includes(filterInput))
      ) {
        const newListNode = (
          <li
            key={recipe.title}
            className="history-list-item"
            onClick={() => navigateToRecipeInfo(recipe.title)}
          >
            <div className="image-container">
              <img
                className="list-item-image"
                src={recipe.imgURL}
                alt={recipe.title}
                onError={handleBrokenImage}
              />
            </div>
            <h4>{recipe.title}</h4>
          </li>
        );
        newNodeList.push(newListNode);
      }
    }
    setRecipeNodeList(newNodeList);
  };

  const handleBrokenImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    //if image is broken it gets replaced by placeholder and gets an extra class added for better placeholder styling
    const imgElement = event.currentTarget;
    imgElement.src = "/src/assets/Card-placeholder.svg";
    imgElement.classList.add("placeholder-image");
  };

  //navigates to recipe and sends the correct recipe title in the url
  const navigateToRecipeInfo = (title: string) => {
    const destination: string = `/recipe/${title}`;
    navigate(destination);
  };

  useEffect(() => {
    createNodeList();
  }, [filterInput, isLoggedIn]);

  useEffect(() => {
    createNodeList();
  }, []);

  return (
    <div className="History">
      <main>
        <h1>Generated Recipes History</h1>
        <input
          onChange={(e) => setFilterInput(e.target.value)}
          id="recipe-search"
          type="text"
        />
        <ul>{recipeNodeList}</ul>
      </main>
    </div>
  );
};
