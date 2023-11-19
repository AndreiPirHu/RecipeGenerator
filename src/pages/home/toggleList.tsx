import "./home.css";
import React, { useEffect, useState } from "react";

type Cuisine = {
  name: string;
  toggled: boolean;
};

export const ToggleList = () => {
  const [cuisinesList, setCuisinesList] = useState<Cuisine[]>([]);
  const [nodeList, setNodeList] = useState<React.ReactNode[]>([]);

  let data: Cuisine[] = [
    { name: "Italian", toggled: false },
    { name: "Indian", toggled: false },
    { name: "Mexican", toggled: false },
    { name: "Chinese", toggled: false },
    { name: "Korean", toggled: false },
  ];

  //TODO add cuisines from personalized list that is saved for each user later
  const addData = () => {
    console.log(cuisinesList);
    setNodeList([]);
    for (let cuisine of cuisinesList) {
      let newCuisine: React.ReactNode = (
        <li
          key={cuisine.name}
          onClick={() => handleCuisineClick(cuisine.name)}
          className={`list-item ${cuisine.toggled ? "toggled" : ""}`}
        >
          <p>{cuisine.name}</p>
        </li>
      );
      setNodeList((prevState) => {
        return [prevState, newCuisine];
      });
    }
  };

  const handleCuisineClick = (name: string) => {
    let index = cuisinesList.findIndex((cuisine) => cuisine.name == name);
    setCuisinesList((prevState) => {
      return prevState.map((updatedCuisineList, i) => {
        if (i === index) {
          return {
            ...updatedCuisineList,
            toggled: !updatedCuisineList.toggled,
          };
        }
        console.log(updatedCuisineList);
        return updatedCuisineList;
      });
    });
  };

  useEffect(() => {
    setCuisinesList(data);
  }, []);

  useEffect(() => {
    // Run addData after cuisinesList has been updated
    addData();
  }, [cuisinesList]);

  return (
    <div id="ToggleList">
      <div id="list-container">
        <ul id="list">{nodeList}</ul>
      </div>
    </div>
  );
};
