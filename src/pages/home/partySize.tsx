import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

export const PartySizeList = () => {
  let dataTosend: Category[] = [
    { name: "1", toggled: false },
    { name: "2", toggled: false },
    { name: "3", toggled: false },
    { name: "4", toggled: false },
  ];
  const [data, setData] = useState<Category[]>(dataTosend);
  let title: string = "Party Size";

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters the one object that is toggled and gets its name value, if none are toggled it defaults to an empty string object
    const dataForRedux: string = (
      data.find((obj) => obj.toggled === true) || { name: "" }
    ).name;

    //sends the new array to redux
    dispatch(actions.addPreference({ key: "partySize", value: dataForRedux }));
  }, [data]);

  ////// REDUX END/////

  return (
    <div className="PartySize">
      <ToggleList
        data={data}
        setData={setData}
        title={title}
        addButton={true}
        exclusive={true}
        numberValue={true}
      />
    </div>
  );
};
