import "./chart.css";
import React, { useState, useContext, useEffect } from "react";
import { CitizenContext } from "../../../contexts/citizenContext";
import { AuthContext } from "../../../contexts/authContext";
import CustomSelect from "./CustomSelect/CustomSelect";
import { analytic } from "./analytic";
import { Button } from "@mui/material";

const Chart = () => {
  const {
    authState: { account },
  } = useContext(AuthContext);

  const { getAllPopulation, citizenState } = useContext(CitizenContext);

  const { popList, isGetSuccess } = citizenState;
  useEffect(() => {
    getAllPopulation(account.id);
  }, []);

  // Chose mode option (one - many)
  const [ID_MODE, setID_MODE] = useState(0);
  const [IdModeOne, setIdModOne] = useState(0);
  const [ID_MODE_MANY, setID_MODE_MANY] = useState(null);
  const [alert, setAlert] = useState(false);

  const [isClickPT, setIsClickPT] = useState(false);

  const showPopuTable = () => {
    if (ID_MODE === 0) {
      setIsClickPT(true);
    } else if (ID_MODE === 1) {
      if (!ID_MODE_MANY) {
        setAlert(true);
        setTimeout(() => setAlert(false), 4000);
      } else {
        setIsClickPT(true);
      }
    }
  };

  useEffect(() => {
    if (isGetSuccess || isClickPT) {
      analytic("02", popList);
    }
  }, [isGetSuccess, isClickPT]);

  return (
    <div className="analytic">
      <CustomSelect
        ID_MODE={ID_MODE}
        setID_MODE={setID_MODE}
        IdModeOne={IdModeOne}
        setIdModOne={setIdModOne}
        ID_MODE_MANY={ID_MODE_MANY}
        setID_MODE_MANY={setID_MODE_MANY}
        setIsClickPT={setIsClickPT}
        alert={alert}
      />
      <Button variant="contained" color="success" onClick={showPopuTable}>
        Phân tích
      </Button>
    </div>
  );
};

export default Chart;
