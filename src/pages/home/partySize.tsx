import { useState } from "react";
import { ToggleList } from "./toggleList";

export const PartySize = () => {
  let dataTosend: Category[] = [
    { name: "1", toggled: false },
    { name: "2", toggled: false },
    { name: "3", toggled: false },
    { name: "4", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);
  let title: string = "Party Size";
  return (
    <div className="PartySize">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={true}
        exclusive={true}
      />
    </div>
  );
};
