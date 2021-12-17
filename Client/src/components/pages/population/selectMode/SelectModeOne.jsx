import { useState, useEffect, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { CitizenContext } from "../../../../contexts/citizenContext";
import Select from "react-select";
import "../population.css";

const SelectModeOne = (props) => {
  const { citizenState, getInforSubAccount } = useContext(CitizenContext);

  // set params for selecting option

  const { setIdModOne, idAddress, role } = props;

  const [option1, setOption1] = useState([
    { id: 0, value: "all", label: "Toàn vùng" },
  ]);
  const [option2, setOption2] = useState([{ id: "", value: "", label: "" }]);
  const [option3, setOption3] = useState([{ id: "", value: "", label: "" }]);
  const [option4, setOption4] = useState([{ id: "", value: "", label: "" }]);
  // Id được chọn cho mỗi option
  const [idOptionOne, setIdOption] = useState({
    id1: 0,
    id2: null,
    id3: null,
    id4: null,
  });

  const { id1, id2, id3, id4 } = idOptionOne;
  const [isOptionsOne, setIsOptionsOne] = useState([true, false, false, false]);
  const [numOfOptions, setNumOfOptions] = useState(1);

  const [valueOptOne, setValueOptOne] = useState({
    value1: null,
    value2: null,
    value3: null,
    value4: null,
  });
  const { value1, value2, value3, value4 } = valueOptOne;

  //

  const getInForLocations = async (id, num) => {
    try {
      const response = await getInforSubAccount(id);
      var opt = num === 1 ? [option1[0]] : [];
      if (response.success) {
        const names = response.account.map((acc) => {
          if (acc.id !== "00")
            opt.push({ id: acc.id, value: acc.name, label: acc.name });

          return;
        });
        if (num === 1) setOption1(opt);
        else if (num === 2) setOption2(opt);
        else if (num === 3) setOption3(opt);
        else if (num === 4) setOption4(opt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // set options cho option1 - Mode One
  useEffect(() => {
    getInForLocations(idAddress, 1);
  }, []);
  // set options cho option2
  useEffect(() => {
    if (id1 !== 0 && isOptionsOne[1]) {
      getInForLocations(id1, 2);
      setValueOptOne({ ...valueOptOne, value2: null });
    }
    if (id1 === 0) {
      setValueOptOne({ ...valueOptOne, value2: null });
      setIsOptionsOne([true, false, false, false]);
      setNumOfOptions(1);
      setIdOption({ id1: 0, id2: null, id3: null, id4: null });
    }
    // console.log(id1);
  }, [id1, isOptionsOne[1]]);

  // set options cho option3
  useEffect(() => {
    if (isOptionsOne[2]) {
      getInForLocations(id2, 3);
    }
    setValueOptOne({ ...valueOptOne, value3: null });
    setIdOption({ ...idOptionOne, id3: null, id4: null });
  }, [id2, isOptionsOne[2]]);

  // set options cho option4
  useEffect(() => {
    if (isOptionsOne[3]) {
      getInForLocations(id3, 4);
    }
    setValueOptOne({ ...valueOptOne, value4: null });
    setIdOption({ ...idOptionOne, id4: null });
  }, [id3, isOptionsOne[3]]);

  //
  const handleAddOptionsOne = () => {
    if (id1 !== 0 && numOfOptions < 4 - role) {
      var isOpt = isOptionsOne;
      isOpt[numOfOptions] = true;
      setIsOptionsOne(isOpt);
      setNumOfOptions(numOfOptions + 1);
    }
  };

  // Close selcect bar
  const closeOptionOne = (num) => {
    if (num === 4) {
      setIdOption({ ...idOptionOne, id4: null });
      setIsOptionsOne([true, true, true, false]);
      setNumOfOptions(3);
    }
    if (num === 3) {
      setIdOption({ ...idOptionOne, id3: null });
      setIsOptionsOne([true, true, false, false]);
      setNumOfOptions(2);
    }
    if (num === 2) {
      setIdOption({ ...idOptionOne, id2: null });
      setIsOptionsOne([true, false, false, false]);
      setNumOfOptions(1);
    }
  };

  // update ID for ONE mode

  useEffect(() => {
    setIdModOne(id4 || id3 || id2 || id1);
  }, [idOptionOne]);

  const style = {
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  return (
    <div className="location-options">
      <Select
        options={option1}
        className="select-mode-option"
        defaultValue={option1[0]}
        onChange={(target) => {
          setIdOption({ ...idOptionOne, id1: target.id });
        }}
      />
      {isOptionsOne[1] && (
        <div style={style}>
          <Select
            options={option2}
            className="select-mode-option"
            value={value2}
            onChange={(target) => {
              setIdOption({ ...idOptionOne, id2: target.id });
              setValueOptOne({ ...valueOptOne, value2: target });
            }}
          />
          {!isOptionsOne[2] && !isOptionsOne[3] && (
            <ClearIcon
              className="remove-select-icon"
              onClick={() => closeOptionOne(2)}
            />
          )}
        </div>
      )}

      {isOptionsOne[1] && isOptionsOne[2] && (
        <div style={style}>
          <Select
            options={option3}
            className="select-mode-option"
            value={value3}
            onChange={(target) => {
              setIdOption({ ...idOptionOne, id3: target.id });
              setValueOptOne({ ...valueOptOne, value3: target });
            }}
          />
          {!isOptionsOne[3] && (
            <ClearIcon
              className="remove-select-icon"
              onClick={() => closeOptionOne(3)}
            />
          )}
        </div>
      )}

      {isOptionsOne[1] && isOptionsOne[2] && isOptionsOne[3] && (
        <div style={style}>
          <Select
            options={option4}
            className="select-mode-option"
            value={value4}
            onChange={(target) => {
              setIdOption({ ...idOptionOne, id4: target.id });
              setValueOptOne({ ...valueOptOne, value4: target });
            }}
          />
          <ClearIcon
            className="remove-select-icon"
            onClick={() => closeOptionOne(4)}
          />
        </div>
      )}

      <AddIcon className="add-icon" onClick={handleAddOptionsOne} />
    </div>
  );
};

export default SelectModeOne;
