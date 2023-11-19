import { useState } from "react";
import { ToggleList } from "./toggleList";

export const TimeList = () => {
  let dataTosend: Category[] = [
    { name: "10 minutes", toggled: false },
    { name: "10-20 minutes", toggled: false },
    { name: "20-30 minutes", toggled: false },
    { name: "30-40 minutes", toggled: false },
    { name: "40-50 minutes", toggled: false },
    { name: "50-60 minutes", toggled: false },
    { name: "60+ minutes", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);
  let title = "Preferred time to cook";
  return (
    <div className="Time">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={false}
        exclusive={false}
      />
    </div>
  );
};
