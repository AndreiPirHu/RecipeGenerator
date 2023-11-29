import { createAction, createReducer } from "@reduxjs/toolkit";

const addRecipes = createAction<Recipes>("Adds the latest generated recipes");

const actions = { addRecipes };

const initialState: Recipes = {
  recipes: [
    {
      title: "",
      cuisine: "",
      ingredients: [],
      instructions: [],
      imgURL: "",
      nutrition: {
        dailyNutrientsPercent: {
          CA: {
            quantity: 0,
          },
          CHOCDF: {
            quantity: 0,
          },
          CHOLE: {
            quantity: 0,
          },
          FAT: {
            quantity: 0,
          },
          FASAT: {
            quantity: 0,
          },
          FATRN: {
            quantity: 0,
          },
          FE: {
            quantity: 0,
          },
          FIBTG: {
            quantity: 0,
          },
          K: {
            quantity: 0,
          },
          NA: {
            quantity: 0,
          },
          PROCNT: {
            quantity: 0,
          },
          SUGAR: {
            quantity: 0,
          },
          VITD: {
            quantity: 0,
          },
        },
        ingredientsNutrition: [{}],
        title: "",
        totalKcal: {
          quantity: "",
        },
        totalNutrients: {
          CA: {
            quantity: 0,
            unit: "",
          },
          CHOCDF: {
            quantity: 0,
            unit: "",
          },
          CHOLE: {
            quantity: 0,
            unit: "",
          },
          FAT: {
            quantity: 0,
            unit: "",
          },
          FASAT: {
            quantity: 0,
            unit: "",
          },
          FATRN: {
            quantity: 0,
            unit: "",
          },
          FE: {
            quantity: 0,
            unit: "",
          },
          FIBTG: {
            quantity: 0,
            unit: "",
          },
          K: {
            quantity: 0,
            unit: "",
          },
          NA: {
            quantity: 0,
            unit: "",
          },
          PROCNT: {
            quantity: 0,
            unit: "",
          },
          SUGAR: {
            quantity: 0,
            unit: "",
          },
          VITD: {
            quantity: 0,
            unit: "",
          },
        },
      },
    },
  ],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addRecipes, (state, action) => ({
    ...state,
    recipes: action.payload.recipes,
  }));
});

export { reducer, actions };
