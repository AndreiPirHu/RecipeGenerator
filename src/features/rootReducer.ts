import { combineReducers } from "redux";
import { reducer as userPreferencesReducer } from "./userPreferences";
import { reducer as generatedRecipesReducer } from "./generatedRecipes";
import { reducer as userReducer } from "./user";

export const rootReducer = combineReducers({
  userPreferences: userPreferencesReducer,
  generatedRecipes: generatedRecipesReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
