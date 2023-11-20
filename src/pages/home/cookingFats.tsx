import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

export const CookingFatsList = () => {
  let dataTosend: Category[] = [
    { name: "Butter", toggled: false },
    { name: "Canola oil", toggled: false },
    { name: "Olive oil", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);

  let title = "Preferred Cooking Fats";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(
      actions.addPreference({ key: "cookingFats", value: dataForRedux })
    );
  }, [data]);

  ////// REDUX END/////

  return (
    <div className="CookingFatsList">
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
