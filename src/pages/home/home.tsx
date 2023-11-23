import { useState } from "react";
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
import { LoadingModal } from "./loadingModal";

export const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
          <LoadingModal loading={loading} />
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
          <GetRecipes setLoading={setLoading} />
        </section>
      </main>
    </div>
  );
};
