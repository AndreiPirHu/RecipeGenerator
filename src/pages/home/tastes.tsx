import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";

export const TastesList = () => {
  let dataToSend: Category[] = [
    { name: "Spicy", toggled: false },
    { name: "Sweet", toggled: false },
    { name: "Savory", toggled: false },
    { name: "Sour", toggled: false },
  ];

  const [data, setData] = useState<Category[]>(dataToSend);
  let title: string = "Preferred Tastes";

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="Tastes">
      <ToggleList
        data={dataToSend}
        setData={setData}
        title={title}
        addButton={true}
        exclusive={false}
        numberValue={false}
      />
    </div>
  );
};
