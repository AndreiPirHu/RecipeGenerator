import { createAction, createReducer } from "@reduxjs/toolkit";

const addPreference = createAction<{
  key: keyof Preferences;
  value: string[] | string;
}>("Sets one of the user preferences");
const actions = { addPreference };

const initialState: Preferences = {
  ingredients: [],
  cookingFats: [],
  cuisines: [],
  tastes: [],
  types: [],
  temperatures: [],
  mealSize: "",
  partySize: "",
  timeToCook: "",
  specialFocus: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addPreference, (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }));
});

export { reducer, actions };
