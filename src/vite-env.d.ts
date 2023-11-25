/// <reference types="vite/client" />

type Category = {
    name: string;
    toggled: boolean;
  };

  type Preferences={
    ingredients: string[],
    cookingFats: string[],
    cuisines: string[],
    tastes: string[],
    types: string[],
    temperatures: string[],
    mealSize: string,
    partySize: string,
    timeToCook: string,
    specialFocus: string[],
}

type Recipe= {
  title: string,
  cuisine: string,
  ingredients: string[],
  instructions: string[]
  imgURL: string,
  nutrition: {} | null,
}

type Recipes ={
  recipes: Recipe[]
}
