import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";

export const CuisinesList = () => {
  let title: string = "Preferred Cuisines";
  //replace with data from redux?
  let dataTosend: Category[] = [
    { name: "Italian", toggled: false },
    { name: "Indian", toggled: false },
    { name: "Mexican", toggled: false },
    { name: "Chinese", toggled: false },
    { name: "Korean", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);

  //have a datalist to send to the togglelist

  //have a func that takes back in the list of toggled categories from the togglelist

  /*{
    "title": "Creamy Korean Potato and Quorn Stir-Fry",
    "cuisine": "Korean",
    "ingredients": [
      "2 large, diced potatoes",
      "1/2 cup cream",
      "1 red, sliced bell pepper",
      "2 tbsp butter",
      "2 tbsp oil",
      "1 medium, thinly sliced cucumber",
      "1 cup, diced quorn",
      "2 cups, cooked rice",
      "1 medium, diced sweet potato"
    ],
    "instructions": [
      "In a large skillet, heat the oil and butter over medium heat.",
      "Add the diced potatoes and sweet potatoes to the skillet and cook until golden brown, about 10 minutes.",
      "Add the bell peppers and quorn to the skillet and sauté for another 5 minutes.",
      "Pour in the cream and stir to combine, then reduce heat to low and let simmer for 5 minutes.",
      "Serve the creamy potato and quorn stir-fry over the cooked rice and garnish with sliced cucumber."
    ]
  }
*/
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="CuisinesList">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={true}
        exclusive={false}
      />
    </div>
  );
};
