import { auth, collection, db, getDocs } from "../firebase";

export const getFirestoreRecipes = async (): Promise<Recipe[]> => {
  let firestoreRecipes: Recipe[] = [];
  const userID = auth.currentUser!.uid;

  const firestoreRecipesData = await getDocs(
    collection(db, "users", userID, "recipeHistory")
  );

  //decodes all recipes from firestore to correct format
  firestoreRecipesData.forEach((doc) => {
    const data = doc.data();
    const recipe: Recipe = {
      title: data.title,
      cuisine: data.cuisine,
      ingredients: data.ingredients,
      instructions: data.instructions,
      imgURL: data.imgURL,
      nutrition: data.nutrition,
    };
    firestoreRecipes.push(recipe);
  });

  return firestoreRecipes;
};
