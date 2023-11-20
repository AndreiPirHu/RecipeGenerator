import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

export const TastesList = () => {
  let dataToSend: Category[] = [
    { name: "Spicy", toggled: false },
    { name: "Sweet", toggled: false },
    { name: "Savory", toggled: false },
    { name: "Sour", toggled: false },
  ];

  const [data, setData] = useState<Category[]>(dataToSend);
  let title: string = "Preferred Tastes";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(actions.addPreference({ key: "tastes", value: dataForRedux }));
  }, [data]);

  ////// REDUX END/////

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
