import OpenAI from "openai";
import { useSelector } from "react-redux";

import { RootState } from "../../features/rootReducer";

export const GetRecipes = () => {
  let userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );
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

  //testdata to test if it works
  let jsonUserPreferenceTestData: Preferences = {
    ingredients: [
      "potatoes",
      "rice",
      "spaghetti",
      "ground meat",
      "tomato sauce",
    ],
    cookingFats: ["Oil", "Butter"],
    cuisines: ["Peruvian", "Korean", "Western"],
    tastes: ["Savory", "Sour"],
    types: ["Soups", "Currys"],
    temperatures: ["Cold"],
    mealSize: "Medium",
    partySize: "1",
    timeToCook: "20-30 minutes",
    specialFocus: ["High protein"],
  };

  //string that is sent to AI
  let jsonUserPreferenceText: string = "";

  const createMessage = () => {
    //resets text before remaking it
    jsonUserPreferenceText = "";

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
    if (jsonUserPreferenceTestData.cuisines.length === 0) {
      cuisineSnippet = "randomly";
    } else {
      for (let cuisine of jsonUserPreferenceTestData.cuisines) {
        cuisineSnippet = cuisineSnippet.concat(cuisine.toLowerCase(), " or ");
      }
      //removes the final slash
      cuisineSnippet = cuisineSnippet.slice(0, -4);
    }

    //makes temperatures snippet
    if (jsonUserPreferenceTestData.temperatures.length === 0) {
    } else {
      for (let temperature of jsonUserPreferenceTestData.temperatures) {
        temperaturesSnippet = temperaturesSnippet.concat(
          temperature.toLowerCase(),
          " or "
        );
      }
      temperaturesSnippet = temperaturesSnippet.slice(0, -3);
    }

    //makes types snippet
    if (jsonUserPreferenceTestData.types.length === 0) {
      typesSnippet = "meals";
    } else {
      for (let type of jsonUserPreferenceTestData.types) {
        typesSnippet = typesSnippet.concat(type.toLowerCase(), "/");
      }
      typesSnippet = typesSnippet.slice(0, -1);
    }

    //makes tastes snippet
    if (jsonUserPreferenceTestData.tastes.length === 0) {
      tastesSnippet = "";
    } else {
      for (let taste of jsonUserPreferenceTestData.tastes) {
        tastesSnippet = tastesSnippet.concat(taste.toLowerCase(), "/");
      }
      tastesSnippet = tastesSnippet.slice(0, -1);
      tastesSnippet = " are " + tastesSnippet + " and";
    }

    //makes ingredients snippet
    for (let ingredient of jsonUserPreferenceTestData.ingredients) {
      ingredientsSnippet = ingredientsSnippet.concat(
        ingredient.toLowerCase(),
        ", "
      );
    }
    ingredientsSnippet = ingredientsSnippet.slice(0, -2);

    //makes meal size snippet
    if (jsonUserPreferenceTestData.mealSize === "") {
      mealSizeSnippet = "";
    } else {
      mealSizeSnippet = jsonUserPreferenceTestData.mealSize.toLowerCase();
      mealSizeSnippet = " " + mealSizeSnippet + " sized";
    }

    //makes party size snippet
    if (
      jsonUserPreferenceTestData.partySize === "" ||
      jsonUserPreferenceTestData.partySize === "1" ||
      jsonUserPreferenceTestData.partySize.includes("e")
    ) {
      partySizeSnippet = "1 person";
    } else {
      partySizeSnippet = jsonUserPreferenceTestData.partySize + " people";
    }

    //makes time snippet
    if (jsonUserPreferenceTestData.timeToCook === "") {
      timeToCookSnippet = "";
    } else {
      timeToCookSnippet = jsonUserPreferenceTestData.timeToCook;
      timeToCookSnippet =
        " that takes around " + timeToCookSnippet + " to make";
    }

    //makes special focus snippet
    if (jsonUserPreferenceTestData.specialFocus.length === 0) {
      specialFocusSnippet = "";
    } else {
      for (let specialFocus of jsonUserPreferenceTestData.specialFocus) {
        specialFocusSnippet = specialFocusSnippet.concat(
          specialFocus.toLowerCase(),
          ", "
        );
      }
      specialFocusSnippet.slice(0, -2);
      specialFocusSnippet =
        " The meals should have a special focus on being " +
        specialFocusSnippet +
        ".";
    }

    jsonUserPreferenceText = `Give me 3 different ${cuisineSnippet} inspired recipes of ${temperaturesSnippet}${typesSnippet} that${tastesSnippet} only use these ingredients: ${ingredientsSnippet}. It does not need to use them all, but cannot use any ingredients that are not here. The recipes need to be for a${mealSizeSnippet} meal for ${partySizeSnippet}${timeToCookSnippet}.${specialFocusSnippet}`;

    console.log(jsonUserPreferenceText);
  };

  let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const askGPT = async () => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are recipe generator that generates a JSON with 3 recipes based on the ingredients that the user gives you. The recipes can only include these ingredients and nothing else and you must follow preferences like the preferred cuisine.",
        },
        {
          role: "user",
          content:
            "Give me 3 different european or korean inspired recipe that only uses these ingredients: potatoes, tomato sauce, cream, milk, bell peppers, butter, oil, cucumber, corn, quorn, ground beef,spaghetti, rice,sweet potatoes, entrecote, tofu. It does not need to use them all, but cannot use any ingredients that are not here",
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
  };
  return <button onClick={createMessage}>Ask GPT</button>;
};
