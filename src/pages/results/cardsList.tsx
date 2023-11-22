import React, { useEffect, useState } from "react";

type CardListProps = {
  data: Recipes;
  title: string;
};

export const CardsList: React.FC<CardListProps> = ({ data, title }) => {
  const [nodeList, setNodeList] = useState<React.ReactNode>([]);
  let mockData: Recipes = {
    recipes: [
      {
        title: "Creamy Korean Potato and Quorn Stir-Fry",
        cuisine: "Korean",
        ingredients: [
          "2 large, diced potatoes",
          "1/2 cup cream",
          "1 red, sliced bell pepper",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 medium, thinly sliced cucumber",
          "1 cup, diced quorn",
          "2 cups, cooked rice",
          "1 medium, diced sweet potato",
        ],
        instructions: [
          "In a large skillet, heat the oil and butter over medium heat.",
          "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
          "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
          "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
          "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber.",
        ],
      },
      {
        title: "Creamy Quorn Stir-Fry",
        cuisine: "Korean",
        ingredients: [
          "2 large, diced potatoes",
          "1/2 cup cream",
          "1 red, sliced bell pepper",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 medium, thinly sliced cucumber",
          "1 cup, diced quorn",
          "2 cups, cooked rice",
          "1 medium, diced sweet potato",
        ],
        instructions: [
          "In a large skillet, heat the oil and butter over medium heat.",
          "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
          "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
          "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
          "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber.",
        ],
      },
      {
        title: "Creamy Korean Potato",
        cuisine: "Korean",
        ingredients: [
          "2 large, diced potatoes",
          "1/2 cup cream",
          "1 red, sliced bell pepper",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 medium, thinly sliced cucumber",
          "1 cup, diced quorn",
          "2 cups, cooked rice",
          "1 medium, diced sweet potato",
        ],
        instructions: [
          "In a large skillet, heat the oil and butter over medium heat.",
          "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
          "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
          "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
          "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber.",
        ],
      },
    ],
  };
  let datas = data;

  //creates NodeList based on data sent to component
  const createNodeList = () => {
    //clears the list before making it
    setNodeList([]);
    for (let item of mockData.recipes) {
      let newItem: React.ReactNode = (
        <div key={item.title} className="card" style={{ width: "18rem" }}>
          <img
            src="/src/assets/Card-placeholder.svg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">{item.title}</p>
          </div>
        </div>
      );

      setNodeList((prevState) => {
        return [prevState, newItem];
      });
    }
  };

  useEffect(() => {
    createNodeList();
  }, []);

  return (
    <div className="CardsList">
      <div className="list-container">
        <h1>{title}</h1>
        <ul id="list">{nodeList}</ul>
      </div>
    </div>
  );
};
