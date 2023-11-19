import "./home.css";
import React, { useEffect, useState } from "react";

interface ToggleListProps {
  data: Category[];
  setData: React.Dispatch<React.SetStateAction<Category[]>>;
  title: string;
}

export const ToggleList: React.FC<ToggleListProps> = ({
  data,
  setData,
  title,
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [nodeList, setNodeList] = useState<React.ReactNode[]>([]);
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  let customInputList: string[] = [];

  let addInput: React.ReactNode = (
    <input
      onBlur={() => {
        setAddToggle(false);
      }}
      onKeyDown={(e) => (e.key == "Enter" ? handleAddCustomInput(input) : "")}
      autoFocus
      onChange={(e) => setInput(e.target.value)}
      type="text"
      name="addInput"
      id="addInput"
    />
  );

  let addText: React.ReactNode = (
    <p onClick={() => setAddToggle(true)}>Add +</p>
  );

  //TODO add cuisines from personalized list that is saved for each user later
  const addData = () => {
    setNodeList([]);
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

  const handleCategoryToggle = (name: string) => {
    //checks which element was pressed and gets the index
    //remakes the whole array with map but with the correct toggle value changed
    let index = categoryList.findIndex((category) => category.name == name);
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

  const handleAddCustomInput = (customInput: string) => {
    if (customInput === "") {
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

  //reset the list toggles to false
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
          <button onClick={handleClear}>Clear</button>
        </div>

        <ul id="list">
          {nodeList}
          <li className="list-item add-button">
            {addToggle ? addInput : addText}
          </li>
        </ul>
      </div>
    </div>
  );
};
