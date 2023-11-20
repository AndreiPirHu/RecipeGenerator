import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

export const SpecialFocusList = () => {
  let dataToSend: Category[] = [
    { name: "High kcal", toggled: false },
    { name: "Low kcal", toggled: false },
    { name: "High protein", toggled: false },
    { name: "Low carbs", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataToSend);
  let title: string = "Special Focus";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(
      actions.addPreference({ key: "specialFocus", value: dataForRedux })
    );
  }, [data]);

  ////// REDUX END/////

  return (
    <div className="SpecialFocusList">
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
