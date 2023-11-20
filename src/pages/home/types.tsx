import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

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

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(actions.addPreference({ key: "types", value: dataForRedux }));
  }, [data]);

  ////// REDUX END/////

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
