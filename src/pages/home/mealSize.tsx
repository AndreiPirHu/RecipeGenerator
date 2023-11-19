import { useState } from "react";
import { ToggleList } from "./toggleList";

export const MealSize = () => {
  let dataToSend: Category[] = [
    { name: "Snack", toggled: false },
    { name: "Small", toggled: false },
    { name: "Medium", toggled: false },
    { name: "Big", toggled: false },
  ];

  const [data, setData] = useState<Category[]>(dataToSend);
  let title = "Preferred Meal Size";

  return (
    <div className="MealSize">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={false}
        exclusive={true}
      />
    </div>
  );
};
