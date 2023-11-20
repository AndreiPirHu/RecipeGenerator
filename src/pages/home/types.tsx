import { useState } from "react";
import { ToggleList } from "./toggleList";

export const TypeList = () => {
  let dataToSend: Category[] = [
    { name: "Soups", toggled: false },
    { name: "Stews", toggled: false },
    { name: "Sandwiches", toggled: false },
    { name: "Pastas", toggled: false },
    { name: "Currys", toggled: false },
    { name: "Grills/Broils", toggled: false },
    { name: "Bakes/Roasts", toggled: false },
    { name: "Desserts", toggled: false },
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
        numberValue={false}
      />
    </div>
  );
};
