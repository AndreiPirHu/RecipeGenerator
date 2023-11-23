import OpenAI from "openai";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../features/rootReducer";
import React, { useEffect } from "react";
import { actions } from "../../features/generatedRecipes";
import { useNavigate } from "react-router-dom";

type GetRecipesProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GetRecipes: React.FC<GetRecipesProps> = ({ setLoading }) => {
  let userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );
  const navigate = useNavigate();

  //template for the AI to know the format i want to receive
  let jsonTemplate = {
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
  };

  const dispatch = useDispatch();

  //string that is sent to AI
  let userPreferenceMessage: string = "";

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

    console.log(userPreferenceMessage);
  };

  const askGPT = async () => {
    if (userPreferences.ingredients.length === 0) {
      //GIVE A WARNING THAT NO INGREDIENTS HAVE BEEN ADDED
      console.log("cancelled call to gpt due to no ingredients");

      return;
    }
    /// sets the loading overlay
    setLoading(true);
    try {
      console.log("Asking gpt");

      let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are recipe generator that generates a JSON with 3 recipes based on the ingredients that the user gives you. The recipes can only include these ingredients and nothing else and you must follow preferences like the preferred cuisine.",
          },
          {
            role: "user",
            content: userPreferenceMessage,
          },
          {
            role: "assistant",
            content: `Make each recipe follow the same structure as this ${JSON.stringify(
              jsonTemplate
            )}`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });
      console.log(completion.choices[0].message.content);

      //sends the AI response to redux
      dispatch(
        actions.addRecipes(
          JSON.parse(completion.choices[0].message.content as string)
        )
      );
    } catch (error) {
      console.log("Error: " + error);
    }
    ///removes loading overlay
    setLoading(false);

    navigate("/results");
  };

  useEffect(() => {
    //recreates the message to AI whenever values in redux change
    createMessage();
  }, [userPreferences]);

  return <button onClick={askGPT}>Ask GPT</button>;
};
