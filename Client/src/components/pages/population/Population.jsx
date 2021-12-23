import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { CitizenContext } from "../../../contexts/citizenContext";
import "./population.css";
import Select from "react-select";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SelectModeOne from "./selectMode/SelectModeOne";
import SelectModeMany from "./selectMode/SelectModeMany";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import { locations, getDOB } from "../../../utils/constant";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ModeOptions = [
  { id: 0, value: "One", label: "Theo từng vùng" },
  { id: 1, value: "More", label: "Theo nhóm vùng" },
];

const columns = [
  { field: "idAddress", headerName: "ID Vùng", width: 100 },
  { field: "fullName", headerName: "Họ và tên", width: 160 },
  { field: "DOB", headerName: "Ngày sinh", width: 150 },
  { field: "address", headerName: "Quê quán", width: 200 },
  { field: "sex", headerName: "Giới tính", width: 100 },
  {
    field: "action",
    headerName: " ",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/population/" + params.row.id} className="btnEditPopu">
            <Button
              variant="contained"

              // onClick={() => {}}
            >
              Xem thông tin
            </Button>
          </Link>
        </>
      );
    },
  },
];

const Population = () => {
  const search = () => {};
  const submit = () => {};
  const navigate = useNavigate();

  const {
    authState: { account },
  } = useContext(AuthContext);

  const { citizenState, getAllPopulation, getInforSubAccount } =
    useContext(CitizenContext);
  const { popList, isLoading } = citizenState;

  const idAddress = account.id;

  const [PopuRows, setPopuRows] = useState([]);

  const getPoPuById = (id) => {
    getAllPopulation(id);
  };

  useEffect(() => {
    var personRows = popList.map((person) => {
      // const dob = getDOB(new Date(person.DOB));

      const dob = getDOB(person.DOB);
      const entry = new Map([
        ["id", person._id],
        [columns[0].field, person.idAddress],
        [columns[1].field, person.name],
        [columns[2].field, dob],
        [columns[3].field, person.thuongtru],
        [
          columns[4].field,
          `${person.sex[0].toUpperCase()}${person.sex.slice(1)}`,
        ],
      ]);

      const obj = Object.fromEntries(entry);
      return obj;
    });
    if (ID_MODE === 0) {
      setPopuRows(personRows);
    } else {
      const Rows =
        ID_MODE_MANY &&
        ID_MODE_MANY.map((id) => {
          const x = personRows.filter((option) =>
            option.idAddress.startsWith(id)
          );
          return x;
        });
      var data = Rows && Rows[0];
      if (Rows) for (let i = 1; i < Rows.length; i++) data.concat(Rows[i]);
      // console.log(Rows);
      // console.log(data);
      setPopuRows(data);
    }
  }, [popList]);

  // Chose mode option (one - many)

  const [ID_MODE, setID_MODE] = useState(0);
  const [isHiddenData, setisHiddenData] = useState(true);

  /// Mode 1 -----------------------------------------------------------------------------------

  const [IdModeOne, setIdModOne] = useState(0);

  /// Mode Many -----------------------------------------------------------------------------

  const locaSelectBox = locations.slice(account.role);
  const [iDSelectBox, setIdSelectBox] = useState(0);

  const [ID_MODE_MANY, setID_MODE_MANY] = useState(null);
  const [alert, setAlert] = useState(false);
  ///////
  const showPopuTable = () => {
    if (ID_MODE === 0) {
      setisHiddenData(false);

      getPoPuById(IdModeOne === 0 ? idAddress : IdModeOne);
    } else if (ID_MODE === 1) {
      if (!ID_MODE_MANY) {
        setAlert(true);
        setTimeout(() => setAlert(false), 4000);
      } else {
        setisHiddenData(false);

        getPoPuById(idAddress);
      }
    }
  };
  useEffect(() => {
    if (ID_MODE_MANY !== null) setAlert(false);
  }, [ID_MODE_MANY]);

  //

  const setValueModeMany = (a) => {
    return a;
  };

  return (
    <div className="popu-container">
      <h1> Dữ liệu dân số</h1>

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
          idAddress={idAddress}
          role={account.role}
        />
      ) : (
        <SelectModeMany
          idAddress={idAddress}
          role={account.role}
          ID_Select_Box={iDSelectBox}
          ID_MODE_MANY={ID_MODE_MANY}
          setID_MODE_MANY={setID_MODE_MANY}
          setValueModeMany={setValueModeMany}
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
      <Button variant="contained" color="success" onClick={showPopuTable}>
        Xem dữ liệu
      </Button>

      {!isHiddenData && isLoading && (
        <div className="circular-progress">
          <CircularProgress />
        </div>
      )}
      {!isHiddenData && !isLoading && (
        <div className="popu-table">
          <DataGrid
            rows={PopuRows}
            columns={columns}
            // pageSize={users.length}
            rowsPerPageOptions={[20]}
            // checkboxSelection
            disableSelectionOnClick
            autoHeight
            density="comfortable"
            onRowClick={(param, event) => {
              navigate(`/population/${param.id}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Population;
