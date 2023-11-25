import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../features/rootReducer";
import "./recipeInfo.css";

export const RecipeInfo: React.FC = () => {
  const [ingredientNodeList, setIngredientNodeList] = useState<
    React.ReactNode[]
  >([]);
  const [instructionsNodeList, setInstructionsNodeList] = useState<
    React.ReactNode[]
  >([]);
  const navigate = useNavigate();
  //gets the recipe title from the url
  const { title } = useParams<{ title: string }>();

  //gets all recipes from redux
  const recipes: Recipes = useSelector(
    (state: RootState) => state.generatedRecipes
  );

  //gets the correct recipe from the array that matches the url title
  const currentRecipe: Recipe | undefined = recipes.recipes.find(
    (recipe) => recipe.title === title
  );

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

  const navigateRedirect = () => {
    if (currentRecipe == undefined) {
      navigate("/");
    }
  };

  useEffect(() => {
    navigateRedirect();
    createIngredientNodes();
    createInstructionsNodes();
  }, []);

  return (
    <div className="RecipeInfo">
      {currentRecipe !== undefined ? (
        <div className="recipe">
          <h1>{currentRecipe.title}</h1>
          <h3>Ingredients</h3>
          <ul className="ingredients-list">{ingredientNodeList}</ul>
          <h3>Instructions</h3>
          <ol className="instructions-list">{instructionsNodeList}</ol>
        </div>
      ) : (
        <div className="warning">
          <h2>Sorry! No recipe with that name was found...</h2>
        </div>
      )}
    </div>
  );
};
