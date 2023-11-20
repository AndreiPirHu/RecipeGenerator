import { combineReducers } from "redux";
import { reducer as userPreferencesReducer} from "./userPreferences";

export const rootReducer = combineReducers({
    userPreferences: userPreferencesReducer
})

export type RootState = ReturnType<typeof rootReducer>;
