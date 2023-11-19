import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";

export const CuisinesList = () => {
  let title: string = "Preferred Cuisines";
  //replace with data from redux?
  let dataTosend: Category[] = [
    { name: "Italian", toggled: false },
    { name: "Indian", toggled: false },
    { name: "Mexican", toggled: false },
    { name: "Chinese", toggled: false },
    { name: "Korean", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);

  //have a datalist to send to the togglelist

  //have a func that takes back in the list of toggled categories from the togglelist

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="CuisinesList">
      <ToggleList data={data} setData={setData} title={title} />
    </div>
  );
};
