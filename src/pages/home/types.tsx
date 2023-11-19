import { useState } from "react";
import { ToggleList } from "./toggleList";

export const TypeList = () => {
  let dataToSend: Category[] = [
    { name: "Soup", toggled: false },
    { name: "Stew", toggled: false },
    { name: "Sandwich", toggled: false },
    { name: "Pasta", toggled: false },
    { name: "Curry", toggled: false },
    { name: "Grill/Broil", toggled: false },
    { name: "Bake/Roast", toggled: false },
    { name: "Dessert", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataToSend);
  let title = "Preferred Types";

  return (
    <div className="TypeList">
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
