import "./home.css";
import React, { useEffect, useState } from "react";

//Type for all the params ToggleList takes in
type ToggleListProps = {
  data: Category[];
  setData: React.Dispatch<React.SetStateAction<Category[]>>;
  title: string;
  addButton: boolean;
  exclusive: boolean;
  numberValue: boolean;
};

export const ToggleList: React.FC<ToggleListProps> = ({
  data,
  setData,
  title,
  addButton,
  exclusive,
  numberValue,
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [nodeList, setNodeList] = useState<React.ReactNode[]>([]);
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  //list of all the user-created categories
  let customInputList: string[] = [];

  //Input element for the add button when toggled
  let addInput: React.ReactNode = (
    <input
      onBlur={() => {
        setAddToggle(false);
      }}
      onKeyDown={(e) => (e.key == "Enter" ? handleAddCustomInput(input) : "")}
      autoFocus
      onChange={(e) => setInput(e.target.value)}
      type={numberValue ? "number" : "text"}
      name="addInput"
      id="addInput"
    />
  );

  //Text for the add button when not toggled
  let addText: React.ReactNode = (
    <p onClick={() => setAddToggle(true)}>Add +</p>
  );

  //creates a toggleable NodeList with list items for each category in categorylist, remakes it when user creates a custom category
  const addData = () => {
    //resets the list before remaking it
    setNodeList([]);
    //makes the list
    for (let category of categoryList) {
      let newCategory: React.ReactNode = (
        <li
          key={category.name}
          onClick={() => handleCategoryToggle(category.name)}
          className={`list-item ${category.toggled ? "toggled" : ""}`}
        >
          <p>{category.name}</p>
        </li>
      );

      setNodeList((prevState) => {
        return [prevState, newCategory];
      });
    }
  };

  //recreates the categoryList with the updated toggled category
  const handleCategoryToggle = (name: string) => {
    //checks which element was pressed and gets the index
    let index = categoryList.findIndex((category) => category.name == name);

    //Clears other toggled values if Exclusive parameter from parent is true
    if (exclusive) {
      handleClear();
    }

    //remakes the whole array with map but with the correct toggle value changed
    setCategoryList((prevState) => {
      return prevState.map((updatedCategoryList, i) => {
        if (i === index) {
          return {
            ...updatedCategoryList,
            toggled: !updatedCategoryList.toggled,
          };
        }

        return updatedCategoryList;
      });
    });
  };

  //handles the user input to create a new category
  const handleAddCustomInput = (customInput: string) => {
    if (
      customInput === "" ||
      categoryList.some((category) =>
        category.name.toLowerCase().includes(input.toLowerCase())
      )
    ) {
      //untoggles the add button on invalid input
      setAddToggle(false);
      return;
    }
    //Correctly formats input
    let capitalizedCustomInput =
      customInput.charAt(0).toUpperCase() + customInput.slice(1).toLowerCase();

    //add it to custom input list for future use
    customInputList.push(capitalizedCustomInput);

    //add it to the current cuisines list to remake the whole list
    let customElement: Category = {
      name: capitalizedCustomInput,
      toggled: false,
    };

    setCategoryList((prevState) => {
      return [...prevState, customElement];
    });
    //toggle input field off
    setAddToggle(false);
  };

  //reset the list toggles to false on button press
  const handleClear = () => {
    setCategoryList((prevState) => {
      let resetData: Category[] = [];
      for (let item of prevState) {
        item.toggled = false;

        resetData.push(item);
      }
      return [...resetData];
    });
  };

  useEffect(() => {
    setCategoryList(data);
  }, []);

  useEffect(() => {
    // Run addData after cuisinesList has been updated
    addData();
    //updates the data in the parent component list
    setData(categoryList);
  }, [categoryList]);

  return (
    <div id="ToggleList">
      <div id="list-container">
        <div className="title-container">
          <h3>{title}</h3>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        <ul id="list">
          {nodeList}
          {addButton && (
            <li className="list-item add-button">
              {addToggle ? addInput : addText}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
