import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

export const TemperaturesList = () => {
  let dataToSend: Category[] = [
    { name: "Cold", toggled: false },
    { name: "Warm", toggled: false },
  ];

  const [data, setData] = useState<Category[]>(dataToSend);
  let title = "Preferred temperatures";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(
      actions.addPreference({ key: "temperatures", value: dataForRedux })
    );
  }, [data]);

  ////// REDUX END/////

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
