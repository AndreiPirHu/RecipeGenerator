import "./home.css";
import { IngredientsList } from "./ingredientsList";

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
        </section>
      </main>
    </div>
  );
};
