import { CuisinesList } from "./cuisines";
import "./home.css";
import { IngredientsList } from "./ingredientsList";
import { MealSize } from "./mealSize";
import { PartySize } from "./partySize";
import { TastesList } from "./tastes";
import { TemperaturesList } from "./temperatures";
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
          <IngredientsList />
          <CuisinesList />
          <TastesList />
          <TypeList />
          <TemperaturesList />
          <MealSize />
          <PartySize />
          <h3>Preferred Time to make</h3>
          <h3>Special Focus</h3>
          <p>High calories</p>
          <p>high protein</p>
          <p>low calories</p>
          <p>low carb</p>
        </section>
      </main>
    </div>
  );
};
