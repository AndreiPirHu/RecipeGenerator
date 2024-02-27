import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import React, { useEffect } from "react";
import { actions } from "../../features/generatedRecipes";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

type GetRecipesProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCancelled: React.Dispatch<React.SetStateAction<boolean>>;
  isCancelled: boolean;
};

export const GetRecipes: React.FC<GetRecipesProps> = ({
  setLoading,
  setIsCancelled,
  isCancelled,
}) => {
  let userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userPreferenceMessage: string = "";

  const abortController = new AbortController();

  const handleCancel = () => {
    abortController.abort(); // Abort the fetch request
  };

  const createMessage = () => {
    //resets text before remaking it
    userPreferenceMessage = "";

    let cuisineSnippet: string = "";
    let typesSnippet: string = "";
    let tastesSnippet: string = "";
    let temperaturesSnippet: string = "";
    let ingredientsSnippet: string = "";
    let cookingFatsSnippet: string = "";
    let mealSizeSnippet: string = "";
    let partySizeSnippet: string = "";
    let timeToCookSnippet: string = "";
    let specialFocusSnippet: string = "";

    //makes the cuisine snippet
    if (userPreferences.cuisines.length === 0) {
      cuisineSnippet = "randomly";
    } else {
      cuisineSnippet = userPreferences.cuisines.join("/").toLowerCase();
    }

    //makes temperatures snippet
    if (userPreferences.temperatures.length === 0) {
    } else {
      temperaturesSnippet = userPreferences.temperatures
        .join(" or ")
        .toLowerCase();
    }

    //makes types snippet
    if (userPreferences.types.length === 0) {
      typesSnippet = "meals";
    } else {
      typesSnippet = userPreferences.types.join("/").toLowerCase();
    }

    //makes tastes snippet
    if (userPreferences.tastes.length === 0) {
      tastesSnippet = "";
    } else {
      tastesSnippet = userPreferences.tastes.join("/").toLowerCase();
      tastesSnippet = " are " + tastesSnippet + " and";
    }

    //makes ingredients snippet
    ingredientsSnippet = userPreferences.ingredients.join(", ").toLowerCase();

    //makes cooking fats snippet
    if (userPreferences.cookingFats.length === 0) {
      cookingFatsSnippet = "";
    } else {
      cookingFatsSnippet = userPreferences.cookingFats.join(", ").toLowerCase();
      cookingFatsSnippet = ", " + cookingFatsSnippet;
    }

    //makes meal size snippet
    if (userPreferences.mealSize === "") {
      mealSizeSnippet = "";
    } else {
      mealSizeSnippet = " " + userPreferences.mealSize.toLowerCase() + " sized";
    }

    //makes party size snippet
    if (
      userPreferences.partySize === "" ||
      userPreferences.partySize === "1" ||
      userPreferences.partySize.includes("e")
    ) {
      partySizeSnippet = "1 person";
    } else {
      partySizeSnippet = userPreferences.partySize + " people";
    }

    //makes time snippet
    if (userPreferences.timeToCook === "") {
      timeToCookSnippet = "";
    } else {
      timeToCookSnippet =
        " that takes at the longest " + userPreferences.timeToCook + " to make";
    }

    //makes special focus snippet
    if (userPreferences.specialFocus.length === 0) {
      specialFocusSnippet = "";
    } else {
      specialFocusSnippet = userPreferences.specialFocus
        .join(", ")
        .toLowerCase();

      specialFocusSnippet =
        " The meals should have a special focus on being " +
        specialFocusSnippet +
        ".";
    }

    userPreferenceMessage = `Give me 3 different ${cuisineSnippet} inspired recipes of ${temperaturesSnippet} ${typesSnippet} that${tastesSnippet} only use these ingredients: ${ingredientsSnippet}${cookingFatsSnippet}. It does not need to use them all, but cannot use any ingredients that are not here. The recipes need to be for a${mealSizeSnippet} meal for ${partySizeSnippet}${timeToCookSnippet}.${specialFocusSnippet}`;
  };

  const getRecipes = async () => {
    if (userPreferences.ingredients.length < 3) {
      console.log("cancelled call to gpt due to no ingredients");
      alert("Atleast 3 ingredients are needed to generate recipes.");
      return;
    }

    try {
      /// sets the loading overlay
      setLoading(true);

      ////////////// Get GPT Recipes//////////////////////
      console.log("Asking server to ask gpt");

      const url =
        "https://recipe-generator-backend.onrender.com/generateRecipes/";

      const GPTBody = { message: userPreferenceMessage };

      const GPTResponse = await axios.post(url, GPTBody, {
        signal: abortController.signal,
      });

      let recipes = JSON.parse(GPTResponse.data.recipes);
      console.log(recipes);

      //give each object a imgurl and nutrition key
      recipes = recipes.recipes.map((obj: object) => ({
        ...obj,
        imgURL: "",
        nutrition: {},
      }));
      console.log(recipes);

      //////// Get images ///////////////////
      console.log("Asking server to get google images");

      const imgUrl =
        "https://recipe-generator-backend.onrender.com/generateImages";
      const imgBody = { recipes: recipes };

      const imgResponse = await axios.post(imgUrl, imgBody, {
        signal: abortController.signal,
      });
      //images get added to correct recipe in server
      //makes it into the correct object type
      let finishedRecipes: Recipes = { recipes: imgResponse.data.recipes };
      console.log(finishedRecipes);

      //array of title and ingredients for edamam api
      let recipeIngredients = [];
      for (let recipe of finishedRecipes.recipes) {
        let newRecipeIngredients = {
          title: recipe.title,
          ingr: recipe.ingredients,
        };
        recipeIngredients.push(newRecipeIngredients);
      }
      console.log(recipeIngredients);
      //////// Get nutritional values ///////////////////
      console.log("Asking server to get edamam nutritional values");

      const edamamUrl =
        "https://recipe-generator-backend.onrender.com/generateNutrition";
      const edamamBody = { recipes: recipeIngredients };

      const edamamResponse = await axios.post(edamamUrl, edamamBody, {
        signal: abortController.signal,
      });

      console.log(edamamResponse);

      //////////create final updated recipes//////////////////
      //giving each recipe their img url
      finishedRecipes.recipes.forEach((recipe, index) => {
        recipe.nutrition = edamamResponse.data.nutrition[index];
      });
      console.log(finishedRecipes);
      //sends the AI response to redux for results page
      dispatch(actions.addRecipes(finishedRecipes));
      //check if online or not to send to right database storage

      if (isLoggedIn) {
        //sends to firestore if online
        const userID = auth.currentUser!.uid;
        for (let recipe of finishedRecipes.recipes) {
          try {
            const collectionRef = collection(
              db,
              "users",
              userID,
              "recipeHistory"
            );

            await addDoc(collectionRef, recipe);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        //add the new recipes to localstorage if offline
        addToLocalStorage(finishedRecipes);
      }

      //navigate to results
      navigate("/results");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      ///removes loading overlay
      setLoading(false);
    }
  };

  const addToLocalStorage = (newRecipes: Recipes) => {
    //gets previous history
    let storedRecipesHistory = localStorage.getItem("recipeHistory");

    // if it is null, sets it to an object with empty recipes array
    let previousRecipesHistory: Recipes = storedRecipesHistory
      ? JSON.parse(storedRecipesHistory)
      : { recipes: [] };

    console.log(previousRecipesHistory);

    //merges the old array of recipes with the new ones generated
    const updatedRecipesHistory = {
      recipes: previousRecipesHistory.recipes.concat(newRecipes.recipes),
    };

    localStorage.setItem(
      "recipeHistory",
      JSON.stringify(updatedRecipesHistory)
    );
  };

  useEffect(() => {
    createMessage();
  }, [userPreferences]);

  useEffect(() => {
    if (isCancelled) {
      handleCancel();
      abortController.abort();
      console.log("being cancelled..");
    }
  }, [isCancelled]);

  return (
    <div className="button-container">
      <button className="generate-btn" onClick={getRecipes}>
        Generate Recipes
      </button>
    </div>
  );
};
