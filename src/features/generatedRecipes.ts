import { createAction, createReducer } from "@reduxjs/toolkit"

const addRecipes = createAction<Recipes>("Adds the latest generated recipes")

const actions = {addRecipes}

const initialState: Recipes ={
    recipes: [
      {
        title: "",
        cuisine: "",
        ingredients: [],
        instructions: []
      },
      {
        title: "",
        cuisine: "",
        ingredients: [],
        instructions: []
      },
      {
        title: "",
        cuisine: "",
        ingredients: [],
        instructions: []
      }
    ]
  }


  const reducer = createReducer(initialState, (builder) =>{
    builder
    .addCase(addRecipes, (state,action)=>({
        ...state,
        recipes: action.payload.recipes
    }))
  })

  export {reducer, actions}
