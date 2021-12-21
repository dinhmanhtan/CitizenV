/* eslint-disable */
import "../chart.css";
import React, { useState, useContext, useEffect } from "react";
import { CitizenContext } from "../../../../contexts/citizenContext";
import { AuthContext } from "../../../../contexts/authContext";
import { Alert } from "@mui/material";
import { Button } from "@mui/material";
import SelectModeOne from "../../population/selectMode/SelectModeOne";
import SelectModeMany from "../../population/selectMode/SelectModeMany";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import { locations } from "../../../../utils/constant";

const ModeOptions = [
  { id: 0, value: "One", label: "Theo từng vùng" },
  { id: 1, value: "More", label: "Theo nhóm vùng" },
];

const CustomSelect = (props) => {
  const {
    ID_MODE,
    setID_MODE,
    IdModeOne,
    setIdModOne,
    ID_MODE_MANY,
    setID_MODE_MANY,
    alert,
  } = props;

  // Chose mode option (one - many)

  const {
    authState: { account },
  } = useContext(AuthContext);

  /// Mode 1 -----------------------------------------------------------------------------------

  const locaSelectBox = locations.slice(account.role);

  /// Mode Many -----------------------------------------------------------------------------

  const [iDSelectBox, setIdSelectBox] = useState(0);

  ///////

  useEffect(() => {
    if (ID_MODE_MANY !== null) setAlert(false);
  }, [ID_MODE_MANY]);

  return (
    <div className="analytic">
      <h1> Phân tích dữ liệu dân số</h1>
      <div className="select-mode-container">
        <Select
          options={ModeOptions}
          className="select-mode-option"
          defaultValue={ModeOptions[0]}
          onChange={(target) => setID_MODE(target.id)}
        />
        {ID_MODE === 1 && (
          <FormControl
            component="fieldset"
            className="select-box"
            sx={{ marginLeft: "20px" }}
          >
            {/* <FormLabel component="legend">Chọn Vùng</FormLabel> */}
            <RadioGroup
              row
              // aria-label="Chọn Vùng"
              name="row-radio-buttons-group"
              defaultValue={locaSelectBox[0]}
              sx={{ position: "relative", margin: "auto" }}
            >
              {locaSelectBox.map((loca, key) => {
                return (
                  <FormControlLabel
                    value={loca}
                    id={key}
                    key={key}
                    control={<Radio />}
                    label={loca}
                    onChange={() => setIdSelectBox(key)}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      </div>
      {ID_MODE === 0 ? (
        <SelectModeOne
          IdModeOne={IdModeOne}
          setIdModOne={setIdModOne}
          idAddress={account.id}
          role={account.role}
        />
      ) : (
        <SelectModeMany
          idAddress={account.id}
          role={account.role}
          ID_Select_Box={iDSelectBox}
          ID_MODE_MANY={ID_MODE_MANY}
          setID_MODE_MANY={setID_MODE_MANY}
        />
      )}
      {ID_MODE === 1 && alert && (
        <Alert
          severity="error"
          sx={{ width: "220px", margin: "0 0 20px 30px" }}
        >
          Các mục chưa được chọn hết
        </Alert>
      )}
    </div>
  );
};

export default CustomSelect;
