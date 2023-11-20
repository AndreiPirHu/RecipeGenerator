import { CookingFatsList } from "./cookingFats";
import { CuisinesList } from "./cuisines";
import { GetRecipes } from "./getRecipes";
import "./home.css";
import { IngredientsList } from "./ingredientsList";
import { MealSizeList } from "./mealSize";
import { PartySizeList } from "./partySize";
import { SpecialFocusList } from "./specialFocus";
import { TastesList } from "./tastes";
import { TemperaturesList } from "./temperatures";
import { TimeList } from "./time";
import { TypeList } from "./types";

export const Home = () => {
  return (
    <div className="Home">
      <main>
        <section id="hero-section">
          <h1>Find Recipes with Your Ingredients</h1>
          <h3>
            Get personalized recipe recommendations based on items in your
            fridge
          </h3>
        </section>
        <section id="ingredients-section">
          <GetRecipes />
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
