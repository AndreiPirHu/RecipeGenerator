import React, { useEffect, useState } from "react";
import "./home.css";

export const IngredientsList = () => {
  const [input, setInput] = useState<string>("");

  const [list, setList] = useState<React.ReactNode[]>([]);

  const [ingredientList, setIngredientList] = useState<string[]>([]);

  //make an empty array of objects
  //whenever i add a new ingredient with input i add an object to the array that has the name and index in it
  //whenever that array of objects is updated, the create list function is rerun
  //this creates a list based on all the objects
  //if i press the delete button it removes an object from the array with the same index, an object from the array is removed, and then the list is remade again based on the new array

  const handleAddButton = () => {
    if (input == "" || ingredientList.includes(input)) {
      setInput("");
      return;
    }

    let ingredient: string = input.toLowerCase();

    setIngredientList((prevState) => {
      return [...prevState, ingredient];
    });
    setInput("");
  };

  const createList = () => {
    console.log("creating new list");
    setList([]);

    for (let i = 0; i < ingredientList.length; i++) {
      let newIngredient: React.ReactNode = (
        <li key={ingredientList[i]} className="list-item">
          <p>{ingredientList[i]}</p>
          <button
            onClick={() => handleDeleteButton(ingredientList[i])}
            className="delete-item"
          >
            &times;
          </button>
        </li>
      );
      setList((prevState) => {
        return [prevState, newIngredient];
      });
    }
  };

  const handleDeleteButton = (name: string) => {
    setIngredientList((prevState) => prevState.filter((item) => item !== name));
  };

  useEffect(() => {
    createList();
  }, [ingredientList]);

  return (
    <div id="IngredientsList">
      <div id="input-container">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? handleAddButton() : "")}
          id="input-add"
          type="text"
        />
        <button onClick={handleAddButton} id="input-button">
          Add
        </button>
      </div>

      <ul id="list">{list}</ul>
    </div>
  );
};
