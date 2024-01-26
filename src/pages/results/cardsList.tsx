import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CardListProps = {
  data: Recipes;
  title: string;
};

export const CardsList: React.FC<CardListProps> = ({ data, title }) => {
  const [nodeList, setNodeList] = useState<React.ReactNode>([]);
  const navigate = useNavigate();

  //creates NodeList based on data sent to component
  const createNodeList = () => {
    //clears the list before making it
    setNodeList([]);
    let imageIndex = 0;
    for (let item of data.recipes) {
      let newItem: React.ReactNode = (
        <div
          onClick={() => navigateToRecipeInfo(item.title)}
          key={item.title}
          className="card"
          style={{ width: "18rem" }}
        >
          <img
            src={item.imgURL}
            onError={handleBrokenImage}
            className="card-img-top"
            alt={"Image of " + item.title}
          />
          <div className="card-body">
            <p className="card-text">{item.title}</p>
          </div>
        </div>
      );

      setNodeList((prevState) => {
        return [prevState, newItem];
      });

      imageIndex++;
    }
  };

  const handleBrokenImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    //if image is broken it gets replaced by placeholder and gets an extra class added for better placeholder styling
    const imgElement = event.currentTarget;
    imgElement.src =
      "https://raw.githubusercontent.com/AndreiPirHu/RecipeGenerator/bf9eec81688786f97668c75ed538c918ebaf6975/src/assets/Card-placeholder.svg";
    imgElement.classList.add("placeholder-image");
  };

  useEffect(() => {
    createNodeList();
  }, []);

  //navigates to recipe and sends the correct recipe title in the url
  const navigateToRecipeInfo = (title: string) => {
    const destination: string = `/recipe/${title}`;
    navigate(destination);
  };

  return (
    <div className="CardsList">
      <div className="list-container">
        <h1>{title}</h1>
        <ul id="list">{nodeList}</ul>
      </div>
    </div>
  );
};
