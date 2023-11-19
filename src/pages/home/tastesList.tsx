import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";

export const TastesList = () => {
  const [data, setData] = useState<Category[]>([]);
  let title: string = "Preferred Tastes";
  let dataToSend: Category[] = [
    { name: "Spicy", toggled: false },
    { name: "Sweet", toggled: false },
    { name: "Savory", toggled: false },
    { name: "Sour", toggled: false },
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="Tastes">
      <ToggleList data={dataToSend} setData={setData} title={title} />
    </div>
  );
};
