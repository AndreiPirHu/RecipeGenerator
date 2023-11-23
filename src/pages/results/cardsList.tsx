import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CardListProps = {
  data: Recipes;
  imageData: string[];
  title: string;
};

export const CardsList: React.FC<CardListProps> = ({
  data,
  imageData,
  title,
}) => {
  const [nodeList, setNodeList] = useState<React.ReactNode>([]);
  const navigate = useNavigate();

  //creates NodeList based on data sent to component
  const createNodeList = () => {
    console.log(imageData);

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
            src={imageData[imageIndex]}
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
