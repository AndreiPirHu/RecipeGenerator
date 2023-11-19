import { useState } from "react";
import { ToggleList } from "./toggleList";

export const SpecialFocusList = () => {
  let dataToSend: Category[] = [
    { name: "High kcal", toggled: false },
    { name: "Low kcal", toggled: false },
    { name: "High protein", toggled: false },
    { name: "High carbs", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataToSend);
  let title: string = "Special Focus";
  return (
    <div className="SpecialFocusList">
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
