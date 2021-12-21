import { useState, useEffect, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { CitizenContext } from "../../../../contexts/citizenContext";
import Select from "react-select";
import "../population.css";

const SelectModeMany = (props) => {
  const {
    idAddress,
    ID_Select_Box,
    ID_MODE_MANY,
    setID_MODE_MANY,
    setValueModeMany,
  } = props;

  const { getInforSubAccount } = useContext(CitizenContext);

  const [option0, setOption0] = useState([{ id: "", value: "", label: "" }]);
  const [option1, setOption1] = useState([{ id: "", value: "", label: "" }]);
  const [option2, setOption2] = useState([{ id: "", value: "", label: "" }]);
  const [option3, setOption3] = useState([{ id: "", value: "", label: "" }]);

  const [idOption, setIdOption] = useState({
    id0: null,
    id1: null,
    id2: null,
    id3: null,
  });

  const { id0, id1, id2, id3 } = idOption;
  const [isOptions, setIsOptions] = useState([true, false, false, false]);
  const [numOfOptions, setNumOfOptions] = useState(0);

  const [valueOptMany, setValueOptMany] = useState({
    value0: null,
    value1: null,
    value2: null,
    value3: null,
  });
  const { value0, value1, value2, value3 } = valueOptMany;

  const getInForLocations = async (id, num) => {
    try {
      const response = await getInforSubAccount(id);
      var opt = [];
      if (response.success) {
        const names = response.account.map((acc) => {
          if (acc.id !== "00")
            opt.push({ id: acc.id, value: acc.name, label: acc.name });

          return;
        });
        if (num === 0) {
          setOption0(opt);
        } else if (num === 1) {
          setOption1(opt);
        } else if (num === 2) {
          setOption2(opt);
        } else if (num === 3) {
          setOption3(opt);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // set options cho option0
  useEffect(() => {
    getInForLocations(idAddress, 0);
  }, []);

  // set options cho option1
  useEffect(() => {
    if (ID_Select_Box > 0) getInForLocations(id0, 1);
    setValueOptMany({
      ...valueOptMany,
      value1: null,
      value2: null,
      value3: null,
    });
    setIdOption({ ...idOption, id1: null, id2: null, id3: null });
  }, [id0]);

  // set options cho option2
  useEffect(() => {
    if (ID_Select_Box > 1) getInForLocations(id1, 2);
    setValueOptMany({
      ...valueOptMany,
      value2: null,
      value3: null,
    });
    setIdOption({ ...idOption, id2: null, id3: null });
  }, [id1]);

  // set options cho option3
  useEffect(() => {
    if (ID_Select_Box > 2) getInForLocations(id2, 3);
    setValueOptMany({
      ...valueOptMany,
      value3: null,
    });
    setIdOption({ ...idOption, id3: null });
  }, [id2]);

  useEffect(() => {
    setValueOptMany({ value0: null, value1: null, value2: null, value3: null });
    setIdOption({ id0: null, id1: null, id2: null, id3: null });
  }, [ID_Select_Box]);

  // Khi thay đổi option
  const onChangeSelect0 = (target) => {
    setValueOptMany({ ...valueOptMany, value0: target });

    if (ID_Select_Box > 0) {
      setIdOption({ ...idOption, id0: target ? target.id : null });
    } else if (ID_Select_Box === 0) {
      const arr_ID =
        target.length > 0 ? target.map((option) => option.id) : null;

      setIdOption({ ...idOption, id0: arr_ID });
    }
  };

  const onChangeSelect1 = (target) => {
    setValueOptMany({ ...valueOptMany, value1: target });

    if (ID_Select_Box > 1) {
      setIdOption({ ...idOption, id1: target ? target.id : null });
    } else if (ID_Select_Box === 1) {
      const arr_ID =
        target.length > 0 ? target.map((option) => option.id) : null;

      setIdOption({ ...idOption, id1: arr_ID });
    }
  };
  const onChangeSelect2 = (target) => {
    setValueOptMany({ ...valueOptMany, value2: target });

    if (ID_Select_Box > 2) {
      setIdOption({ ...idOption, id2: target ? target.id : null });
    } else if (ID_Select_Box === 2) {
      const arr_ID =
        target.length > 0 ? target.map((option) => option.id) : null;

      setIdOption({ ...idOption, id2: arr_ID });
    }
  };
  const onChangeSelect3 = (target) => {
    setValueOptMany({ ...valueOptMany, value3: target });

    const arr_ID = target.map((option) => option.id);
    setIdOption({ ...idOption, id3: target.length > 0 ? arr_ID : null });
  };

  // set ID_MODE_MANY

  // style

  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,

  //     // color: state.isSelected ? "red" : "black",
  //   }),
  //   control: (styles, state) => ({
  //     ...styles,
  //     borderColor: state.selectProps.value !== null ? "blue" : "red",
  //   }),
  //   // singleValue: (provided, state) => {
  //   //   const opacity = state.isDisabled ? 0.5 : 1;
  //   //   const transition = "opacity 300ms";

  //   //   return { ...provided, opacity, transition };
  //   // },
  // };

  useEffect(() => {
    if (ID_Select_Box === 0) {
      setID_MODE_MANY(id0);
      setValueModeMany(value0);
    }
    if (ID_Select_Box === 1) {
      setID_MODE_MANY(id1);
      setValueModeMany(value1);
    }
    if (ID_Select_Box === 2) {
      setID_MODE_MANY(id2);
      setValueModeMany(value2);
    }
    if (ID_Select_Box === 3) {
      setID_MODE_MANY(id3);
      setValueModeMany(value3);
    }
  }, [idOption]);

  return (
    <div className="location-options">
      <Select
        // placeholder="Chọn Tỉnh/Thành Phố"
        className="select-mode-option-many"
        isMulti={ID_Select_Box === 0 ? true : false}
        options={option0}
        // className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChangeSelect0}
        value={value0}
        // styles={customStyles}
      />
      {ID_Select_Box >= 1 && (
        <Select
          className="select-mode-option-many"
          isMulti={ID_Select_Box === 1 ? true : false}
          options={option1}
          // className="basic-multi-select"
          classNamePrefix="select"
          value={value1}
          onChange={onChangeSelect1}
        />
      )}
      {ID_Select_Box >= 2 && (
        <Select
          className="select-mode-option-many"
          isMulti={ID_Select_Box === 2 ? true : false}
          options={option2}
          // className="basic-multi-select"
          classNamePrefix="select"
          value={value2}
          onChange={onChangeSelect2}
        />
      )}
      {ID_Select_Box >= 3 && (
        <Select
          className="select-mode-option-many"
          isMulti={ID_Select_Box === 3 ? true : false}
          options={option3}
          // className="basic-multi-select"
          classNamePrefix="select"
          value={value3}
          onChange={onChangeSelect3}
        />
      )}
    </div>
  );
};

export default SelectModeMany;
