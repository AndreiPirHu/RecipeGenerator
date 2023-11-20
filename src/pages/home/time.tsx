import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

export const TimeList = () => {
  let dataTosend: Category[] = [
    { name: "10 minutes", toggled: false },
    { name: "10-20 minutes", toggled: false },
    { name: "20-30 minutes", toggled: false },
    { name: "30-40 minutes", toggled: false },
    { name: "40-50 minutes", toggled: false },
    { name: "50-60 minutes", toggled: false },
    { name: "60+ minutes", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);
  let title = "Max time to cook";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(actions.addPreference({ key: "timeToCook", value: dataForRedux }));
  }, [data]);

  ////// REDUX END/////

  return (
    <div className="Time">
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
