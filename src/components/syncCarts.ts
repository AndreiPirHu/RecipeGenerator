import { addDoc, collection, db } from "../firebase";

export const syncCarts = async (userID: string) => {
  //checks for local recipes
  const localRecipes: Recipes =
    localStorage.getItem("recipeHistory") !== null
      ? JSON.parse(localStorage.getItem("recipeHistory")!)
      : null;

  if (localRecipes == null) {
    return;
  }

  for (let recipe of localRecipes.recipes) {
    try {
      const collectionRef = collection(db, "users", userID, "recipeHistory");

      await addDoc(collectionRef, recipe);
    } catch (error) {
      console.log(error);
    }
  }
  //removes recipes in localstorage after syncing them to firestore
  localStorage.removeItem("recipeHistory");
};
