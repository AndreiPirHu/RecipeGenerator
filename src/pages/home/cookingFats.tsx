import { useState } from "react";
import { ToggleList } from "./toggleList";

export const CookingFatsList = () => {
  let dataTosend: Category[] = [
    { name: "Butter", toggled: false },
    { name: "Canola oil", toggled: false },
    { name: "Olive oil", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);
  let title = "Preferred Cooking Fats";
  return (
    <div className="CookingFatsList">
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
