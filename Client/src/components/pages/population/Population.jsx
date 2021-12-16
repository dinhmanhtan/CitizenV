import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { CitizenContext } from "../../../contexts/citizenContext";
import SearchBar from "../home/SearchBar";
import Person from "./Person";
import "./population.css";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const ModeOptions = [
  { id: 0, value: "One", label: "Theo từng vùng" },
  { id: 1, value: "More", label: "Theo nhóm vùng" },
];

const Population = () => {
  const search = () => {};
  const submit = () => {};

  const {
    authState: { account },
  } = useContext(AuthContext);

  const { citizenState, getAllPopulation, getInforSubAccount } =
    useContext(CitizenContext);
  const { popList } = citizenState;

  const idAddress = account.id;

  /// Mode 1 -----------------------------------------------------------------------------------
  // set params for selecting option
  const [option1, setOption1] = useState([
    { id: 0, value: "all", label: "Toàn vùng" },
  ]);
  const [option2, setOption2] = useState([{ id: "", value: "", label: "" }]);
  // Id được chọn cho mỗi option
  const [idOption, setIdOption] = useState({
    id1: 0,
    id2: null,
    id3: null,
    id4: null,
  });

  const { id1, id2, id3, id4 } = idOption;
  const [isOptionsOne, setIsOptionsOne] = useState([true, false, false, false]);
  const [numOfOptions, setNumOfOptions] = useState(1);
  const [defaultOptionOne, setDefaultOptionOne] = useState({
    defaultOpt1: "Toàn vùng",
    defaultOpt2: "",
    defaultOpt3: "",
    defaultOpt4: "",
  });

  //

  useEffect(() => {
    getAllPopulation(idAddress);
  }, []);

  const getInForLocations = async (id, num) => {
    try {
      const response = await getInforSubAccount(id);
      var opt = num === 1 ? [option1[0]] : [];
      if (response.success) {
        const names = response.account.map((acc) => {
          opt.push({ id: acc.id, value: acc.name, label: acc.name });
          return;
        });
        if (num === 1) setOption1(opt);
        else if (num === 2) setOption2(opt);
        else if (num === 3) setOption2(opt);
        else if (num === 4) setOption2(opt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // set options cho option1 - Mode One
  useEffect(() => {
    getInForLocations(idAddress, 1);
  }, []);

  useEffect(() => {
    if (id1 !== 0 && isOptionsOne[1]) {
      getInForLocations(id1, 2);
      setDefaultOptionOne({ ...defaultOptionOne, defaultOpt2: option2[0] });
    }
  }, [id1, isOptionsOne[1]]);

  //
  const handleAddOptionsOne = () => {
    if (id1 !== 0 && numOfOptions <= 4 - account.role) {
      var isOpt = isOptionsOne;
      isOpt[numOfOptions] = true;
      setIsOptionsOne(isOpt);
      setNumOfOptions(numOfOptions + 1);
    }
    console.log(option2);
  };

  /// Mode More -----------------------------------------------------------------------------

  return (
    <div className="popu-container">
      <h1> Dữ liệu dân số</h1>
      <div>
        <Select
          options={ModeOptions}
          className="select-mode-option"
          defaultValue={ModeOptions[0]}
        />
      </div>
      <div className="location-options">
        <Select
          options={option1}
          className="select-mode-option"
          defaultValue={option1[0]}
          onChange={(target) => {
            setIdOption({ ...idOption, id1: target.id });
            setDefaultOptionOne({
              ...defaultOptionOne,
              defaultOpt2: null,
            });
            console.log(defaultOptionOne);
          }}
        />
        {isOptionsOne[1] && (
          <Select
            options={option2}
            className="select-mode-option"
            defaultValue={defaultOptionOne.defaultOpt2}
            onChange={(target) => setIdOption({ ...idOption, id2: target.id })}
          />
        )}
        <AddIcon className="add-icon" onClick={handleAddOptionsOne} />
      </div>

      <Button variant="contained" color="success">
        Xem dữ liệu
      </Button>
    </div>
  );
};

export default Population;
