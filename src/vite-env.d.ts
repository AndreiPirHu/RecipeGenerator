/// <reference types="vite/client" />

type Category = {
  name: string;
  toggled: boolean;
};

type Preferences = {
  ingredients: string[];
  cookingFats: string[];
  cuisines: string[];
  tastes: string[];
  types: string[];
  temperatures: string[];
  mealSize: string;
  partySize: string;
  timeToCook: string;
  specialFocus: string[];
};

type Recipe = {
  title: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  imgURL: string;
  nutrition: {
    dailyNutrientsPercent: {
      CA: {
        quantity: number;
      };
      CHOCDF: {
        quantity: number;
      };
      CHOLE: {
        quantity: number;
      };
      FAT: {
        quantity: number;
      };
      FASAT: {
        quantity: number;
      };
      FATRN: {
        quantity: number;
      };
      FE: {
        quantity: number;
      };
      FIBTG: {
        quantity: number;
      };
      K: {
        quantity: number;
      };
      NA: {
        quantity: number;
      };
      PROCNT: {
        quantity: number;
      };
      SUGAR: {
        quantity: number;
      };
      VITD: {
        quantity: number;
      };
    };
    ingredientsNutrition: [{}];
    title: string;
    totalKcal: {
      quantity: "";
    };
    totalNutrients: {
      CA: {
        quantity: number;
        unit: string;
      };
      CHOCDF: {
        quantity: number;
        unit: string;
      };
      CHOLE: {
        quantity: number;
        unit: string;
      };
      FAT: {
        quantity: number;
        unit: string;
      };
      FASAT: {
        quantity: number;
        unit: string;
      };
      FATRN: {
        quantity: number;
        unit: string;
      };
      FE: {
        quantity: number;
        unit: string;
      };
      FIBTG: {
        quantity: number;
        unit: string;
      };
      K: {
        quantity: number;
        unit: string;
      };
      NA: {
        quantity: number;
        unit: string;
      };
      PROCNT: {
        quantity: number;
        unit: string;
      };
      SUGAR: {
        quantity: number;
        unit: string;
      };
      VITD: {
        quantity: number;
        unit: string;
      };
    };
  } | null;
};

type Recipes = {
  recipes: Recipe[];
};
