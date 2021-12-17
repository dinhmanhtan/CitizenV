import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { CitizenContext } from "../../../contexts/citizenContext";
import "./population.css";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SelectModeOne from "./selectMode/SelectModeOne";

const ModeOptions = [
  { id: 0, value: "One", label: "Theo từng vùng" },
  { id: 1, value: "More", label: "Theo nhóm vùng" },
];

const columns = [
  { field: "fullName", headerName: "Họ và tên", width: 200 },
  { field: "DOB", headerName: "Ngày sinh", width: 200 },
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
      // const date = new Date(person.DOB);
      // console.log(date, Date.parse(person.DOB));
      const entry = new Map([
        ["id", person._id],
        [columns[0].field, person.name],
        [columns[1].field, person.DOB.toString()],
        [columns[2].field, person.thuongtru],
        [
          columns[3].field,
          `${person.sex[0].toUpperCase()}${person.sex.slice(1)}`,
        ],
        [("idAdress", person.idAddress)],
      ]);

      const obj = Object.fromEntries(entry);
      return obj;
    });
    setPopuRows(personRows);
  }, [popList]);

  // Chose mode option (one - many)

  const [ID_MODE, setID_MODE] = useState(0);
  const [isHiddenData, setisHiddenData] = useState(true);

  /// Mode 1 -----------------------------------------------------------------------------------

  const [IdModeOne, setIdModOne] = useState(0);

  /// Mode More -----------------------------------------------------------------------------
  const [option1, setOption1] = useState([{ id: "", value: "", label: "" }]);
  const [option2, setOption2] = useState([{ id: "", value: "", label: "" }]);
  const [option3, setOption3] = useState([{ id: "", value: "", label: "" }]);
  const [option4, setOption4] = useState([{ id: "", value: "", label: "" }]);
  ///////
  const showPopuTable = () => {
    setisHiddenData(false);
    if (ID_MODE === 0) {
      console.log(IdModeOne);
      getPoPuById(IdModeOne === 0 ? idAddress : IdModeOne);
    }
  };

  return (
    <div className="popu-container">
      <h1> Dữ liệu dân số</h1>
      <div>
        <Select
          options={ModeOptions}
          className="select-mode-option"
          defaultValue={ModeOptions[1]}
          onChange={(target) => setID_MODE(target.id)}
        />
      </div>
      {ID_MODE === 0 ? (
        <SelectModeOne
          IdModeOne={IdModeOne}
          setIdModOne={setIdModOne}
          idAddress={idAddress}
          role={account.role}
        />
      ) : (
        <div className="location-options">
          <Select
            className="select-mode-option"
            isMulti
            // options={}
            // className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
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
            // onRowClick={(param, event) => {

            // }}
          />
        </div>
      )}
    </div>
  );
};

export default Population;
