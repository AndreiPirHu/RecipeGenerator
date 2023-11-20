import { useEffect, useState } from "react";
import { ToggleList } from "./toggleList";
import { useDispatch } from "react-redux";
import { actions } from "../../features/userPreferences";

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

  ////// REDUX START/////////
  const dispatch = useDispatch();

  useEffect(() => {
    //filters all the objects that are toggled and then maps their name value to a new array
    const dataForRedux: string[] = data
      .filter((obj) => obj.toggled === true)
      .map((obj) => obj.name);

    //sends the new array to redux
    dispatch(actions.addPreference({ key: "cuisines", value: dataForRedux }));
  }, [data]);

  ////// REDUX END/////

  return (
    <div className="CuisinesList">
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
