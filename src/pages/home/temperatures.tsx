import { useState } from "react";
import { ToggleList } from "./toggleList";

export const TemperaturesList = () => {
  let dataToSend: Category[] = [
    { name: "Cold", toggled: false },
    { name: "Warm", toggled: false },
  ];

  const [data, setData] = useState<Category[]>(dataToSend);
  let title = "Preferred temperatures";

  return (
    <div className="TemperaturesList">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={false}
        exclusive={false}
        numberValue={false}
      />
    </div>
  );
};
