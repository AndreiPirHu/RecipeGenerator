import React from "react";
import "./recipeInfo.css";
type NutritionInfoProps = {
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
  };
};

export const NutritionInfo: React.FC<NutritionInfoProps> = (nutrition) => {
  return (
    <div className="NutritionInfo">
      <div className="nutrition-container">
        <h2 id="title">Nutrition facts</h2>
        <div className="primary-nutrient">
          <h4>Total Calories</h4>
          <h4>{nutrition.nutrition.totalKcal.quantity}</h4>
        </div>
        <div className="description">
          <p>Nutrient</p>
          <p>% Daily value</p>
        </div>
        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Total Fat</h6>
            <h6 className="amount">
              {`${nutrition.nutrition.totalNutrients.FAT.quantity.toFixed(1)} ${
                nutrition.nutrition.totalNutrients.FAT.unit
              }`}
            </h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.FAT.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="tertiary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Saturated Fat</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.FASAT.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.FASAT.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.FASAT.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="tertiary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Trans Fats</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.FATRN.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.FATRN.unit}`}</h6>
          </div>
          <h6 className="percent"></h6>
        </div>

        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Cholesterol</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.CHOLE.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.CHOLE.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.CHOLE.quantity.toFixed(
            0
          )}%`}</h6>
        </div>

        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Sodium</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.NA.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.NA.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.NA.quantity.toFixed(
            0
          )}%`}</h6>
        </div>

        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Total Carbohydrates</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.CHOCDF.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.CHOCDF.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.CHOCDF.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="tertiary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Dietary Fibers</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.FIBTG.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.FIBTG.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.FIBTG.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="tertiary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Total Sugars</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.SUGAR.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.SUGAR.unit}`}</h6>
          </div>
          <h6 className="percent"></h6>
        </div>

        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Protein</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.PROCNT.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.PROCNT.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.PROCNT.quantity.toFixed(
            0
          )}%`}</h6>
        </div>

        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Vitamin D</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.VITD.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.VITD.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.VITD.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Calcium</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.CA.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.CA.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.CA.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Iron</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.FE.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.FE.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.FE.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
        <div className="secondary-nutrient">
          <div className="nutrient-amount">
            <h6 className="title">Potassium</h6>
            <h6 className="amount">{`${nutrition.nutrition.totalNutrients.K.quantity.toFixed(
              1
            )} ${nutrition.nutrition.totalNutrients.K.unit}`}</h6>
          </div>
          <h6 className="percent">{`${nutrition.nutrition.dailyNutrientsPercent.K.quantity.toFixed(
            0
          )}%`}</h6>
        </div>
      </div>
    </div>
  );
};
