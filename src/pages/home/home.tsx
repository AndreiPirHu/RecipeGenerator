import { CookingFatsList } from "./cookingFats";
import { CuisinesList } from "./cuisines";
import "./home.css";
import { IngredientsList } from "./ingredientsList";
import { MealSizeList } from "./mealSize";
import { PartySizeList } from "./partySize";
import { SpecialFocusList } from "./specialFocus";
import { TastesList } from "./tastes";
import { TemperaturesList } from "./temperatures";
import { TimeList } from "./time";
import { TypeList } from "./types";

import OpenAI from "openai";

export const Home = () => {
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

  let apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  async function askGPT() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are recipe generator that generates a JSON with a recipe based on the ingredients that the user gives you. The recipe can only include these ingredients and nothing else and you must follow preferences like the preferred cuisine.",
        },
        {
          role: "user",
          content:
            "Give me a european inspired recipe that only uses these ingredients: potatoes, tomato sauce, cream, milk, bell peppers, butter, oil, cucumber, corn, quorn, ground beef,spaghetti, rice,sweet potatoes. It does not need to use them all, but cannot use any ingredients that are not here",
        },
        {
          role: "assistant",
          content: `Make it have the same structure as this ${JSON.stringify(
            jsonTemplate
          )}`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
  }

  return (
    <div className="Home">
      <main>
        <section id="hero-section">
          <h1>Find Recipes with Your Ingredients</h1>
          <h3>
            Get personalized recipe recommendations based on items in your
            fridge
          </h3>
          <button onClick={askGPT}>Ask GPT</button>
        </section>
        <section id="ingredients-section">
          <IngredientsList />
          <CookingFatsList />
          <CuisinesList />
          <TastesList />
          <TypeList />
          <TemperaturesList />
          <MealSizeList />
          <PartySizeList />
          <TimeList />
          <SpecialFocusList />
        </section>
      </main>
    </div>
  );
};
