import "./home.css";
import { IngredientsList } from "./ingredientsList";
import { ToggleList } from "./toggleList";

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
          <h3>Preferred Cuisines</h3>
          <ToggleList />
        </section>
      </main>
    </div>
  );
};
