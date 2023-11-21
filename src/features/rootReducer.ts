import { combineReducers } from "redux";
import { reducer as userPreferencesReducer} from "./userPreferences";
import { reducer as generatedRecipesReducer } from "./generatedRecipes";

export const rootReducer = combineReducers({
    userPreferences: userPreferencesReducer,
    generatedRecipes:  generatedRecipesReducer
})

export type RootState = ReturnType<typeof rootReducer>;
