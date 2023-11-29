import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../features/rootReducer";
import "./recipeInfo.css";
import { NutritionInfo } from "./nutritionInfo";

export const RecipeInfo: React.FC = () => {
  const [ingredientNodeList, setIngredientNodeList] = useState<
    React.ReactNode[]
  >([]);
  const [instructionsNodeList, setInstructionsNodeList] = useState<
    React.ReactNode[]
  >([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>(
    undefined
  );
  //gets the recipe title from the url
  const { title } = useParams<{ title: string }>();

  //gets all recipes from redux
  const reduxRecipes: Recipes = useSelector(
    (state: RootState) => state.generatedRecipes
  );

  const getCurrentRecipe = () => {
    //check if redux has the correct recipe
    setCurrentRecipe(
      reduxRecipes.recipes.find((recipe) => recipe.title === title)
    );
    //if no recipe was found in redux, looks for it in history
    if (currentRecipe === undefined) {
      //gets all recipes from history if any
      const historyRecipesJSON: string | null =
        localStorage.getItem("recipeHistory");

      let historyRecipes: Recipes;

      if (historyRecipesJSON !== null) {
        historyRecipes = JSON.parse(historyRecipesJSON);
        setCurrentRecipe(
          historyRecipes.recipes.find((recipe) => recipe.title == title)
        );
      }
    }
    //if no recipe is found in either, currentrecipes is undefined and error message is displayed
    if (currentRecipe == undefined) {
      return;
    }
  };

  //create ingredient node list
  const createIngredientNodes = () => {
    if (currentRecipe == undefined) {
      return;
    }
    setIngredientNodeList([]);
    let key = 0;
    for (let ingredient of currentRecipe.ingredients) {
      let newNode: React.ReactNode = (
        <li key={key} className="ingredient-list-item">
          <p>{ingredient}</p>
        </li>
      );
      setIngredientNodeList((prevState) => {
        return [prevState, newNode];
      });
      key++;
    }
  };

  //create instructions node list
  const createInstructionsNodes = () => {
    if (currentRecipe == undefined) {
      return;
    }
    setInstructionsNodeList([]);
    let key = 0;
    for (let instruction of currentRecipe.instructions) {
      let newNode: React.ReactNode = (
        <li key={key} className="instruction-list-item">
          <p>{instruction}</p>
        </li>
      );
      setInstructionsNodeList((prevState) => {
        return [prevState, newNode];
      });
      key++;
    }
  };

  const handleBrokenImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    //if image is broken it gets replaced by placeholder and gets an extra class added for better placeholder styling
    const imgElement = event.currentTarget;
    imgElement.src = "/src/assets/Card-placeholder.svg";
    imgElement.classList.add("placeholder-image");
  };

  useEffect(() => {
    createIngredientNodes();
    createInstructionsNodes();
  }, [currentRecipe]);

  useEffect(() => {
    getCurrentRecipe();
  }, []);

  return (
    <div className="RecipeInfo">
      {currentRecipe !== undefined ? (
        <div className="recipe">
          <div className="image-container">
            <img
              src={currentRecipe.imgURL}
              alt={currentRecipe.title}
              onError={handleBrokenImage}
            />
          </div>
          <h1>{currentRecipe.title}</h1>
          <div className="ingredients-container">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">{ingredientNodeList}</ul>
          </div>

          <h3>Instructions</h3>
          <ol className="instructions-list">{instructionsNodeList}</ol>
          {currentRecipe.nutrition ? (
            <NutritionInfo nutrition={currentRecipe.nutrition} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="warning">
          <h2>Sorry! No recipe with that name was found...</h2>
        </div>
      )}
    </div>
  );
};
