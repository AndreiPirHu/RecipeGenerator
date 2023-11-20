import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { actions } from "../../features/userPreferences";
import { useDispatch } from "react-redux";

export const MealSizeList = () => {
  let dataToSend: Category[] = [
    { name: "Snack", toggled: false },
    { name: "Small", toggled: false },
    { name: "Medium", toggled: false },
    { name: "Big", toggled: false },
  ];

  const [data, setData] = useState<Category[]>(dataToSend);
  let title = "Preferred Meal Size";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters the one object that is toggled and gets its name value, if none are toggled it defaults to an empty string object
    const dataForRedux: string = (
      data.find((obj) => obj.toggled === true) || { name: "" }
    ).name;

    //sends the new array to redux
    dispatch(actions.addPreference({ key: "mealSize", value: dataForRedux }));
  }, [data]);

  ////// REDUX END/////

  return (
    <div className="MealSize">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={false}
        exclusive={true}
        numberValue={false}
      />
    </div>
  );
};
