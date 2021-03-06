import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import "./individual.css";
import { Button, Paper } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { CitizenContext } from "../../../../contexts/citizenContext";
import AlertDialog from "../../accountList/AlertDialog";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/authContext";
import { getDOB } from "../../../../utils/constant";

function Individual() {
  const { personID } = useParams();
  const navigate = useNavigate();

  const {
    authState: {
      account: { state },
    },
  } = useContext(AuthContext);

  const {
    getInforPerson,
    updateInforPerson,
    citizenState,
    citizenDispatch,
    deletePerson,
  } = useContext(CitizenContext);

  const { updatedInforSuccess } = citizenState;

  const [infor, setInfor] = useState({
    name: "",
    DOB: "",
    CCCD: "",
    sex: "",
    religion: "",
    academicLevel: "",
    job: "",
    TamTru: "",
    ThuongTru: "",
    idAddress: "",
    origin: "",
  });
  const {
    name,
    DOB,
    CCCD,
    sex,
    religion,
    academicLevel,
    job,
    tamTru,
    thuongTru,
    idAddress,
    origin,
  } = infor;

  const [temptValues, setTemptValues] = useState(infor);

  useEffect(() => {
    getInforPerson(infor, setInfor, setTemptValues, personID);
    // eslint-disable-next-line
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const handleChangeInput = (event) => {
    setInfor({ ...infor, [event.target.name]: event.target.value });
    // console.log(event.target.value);
  };

  const [dateForm, setDateForm] = useState(null);

  useEffect(() => {
    if (!isEdit) {
      setTemptValues(infor);
    }

    if (DOB) {
      const arr = DOB.split("/");
      setDateForm(arr[2] + "-" + arr[1] + "-" + arr[0]);
    }
  }, [isEdit, infor, DOB]);

  // console.log(DOB);
  const updateInfor = () => {
    const INFOR = {
      name,
      DOB: DOB.includes("-") ? DOB : dateForm,
      CCCD,
      sex,
      religion,
      academicLevel,
      job,
      tamTru,
      thuongTru,
      idAddress,
      origin,
    };
    updateInforPerson(INFOR, personID, setIsEdit);

    if (DOB.includes("-")) {
      setInfor({ ...infor, DOB: getDOB(DOB) });
    }
  };

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (updatedInforSuccess) setOpen(true);
    citizenDispatch({
      type: "UPDATE_INFOR_PERSON",
      payload: { updatedInforSuccess: false },
    });
  }, [updatedInforSuccess]);

  const handleClickEdit = () => {
    if (state) {
      setIsEdit(true);
    } else {
      setOpenEdit(true);
    }
  };

  return (
    <div>
      <Paper elevation={3} className="wrapper">
        <AlertDialog
          title={"Th??ng b??o"}
          content={"X??c nh???n c???p nh???t th??ng tin th??nh c??ng"}
          open={open}
          setOpen={setOpen}
          action={() => {}}
        />
        <AlertDialog
          title={"Th??ng b??o"}
          content={"X??c nh???n x??a th??ng tin ng?????i d??n "}
          open={openDel}
          setOpen={setOpenDel}
          action={() => {
            deletePerson(personID);
            navigate("/population");
          }}
        />

        <AlertDialog
          title={"Th??ng b??o"}
          content={"T??i kho???n b??? kh??a quy???n khai b??o "}
          open={openEdit}
          setOpen={setOpenEdit}
          action={() => {}}
        />

        <EditIcon className="edit-icon" onClick={handleClickEdit} />
        <div className="title">
          <span>Th??ng tin c?? nh??n</span>
        </div>

        <form className="form">
          <div className="specific-info">
            <label className="title-label"> H??? v?? T??n:</label>
            {!isEdit ? (
              <span> {name}</span>
            ) : (
              <TextField
                variant="standard"
                value={name}
                name="name"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> Ng??y Sinh:</label>
            {!isEdit ? (
              <span> {DOB}</span>
            ) : (
              <TextField
                variant="standard"
                defaultValue={dateForm}
                type="date"
                name="DOB"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> CCCD/CMND:</label>
            {!isEdit ? (
              <span> {CCCD}</span>
            ) : (
              <TextField
                variant="standard"
                value={CCCD}
                name="CCCD"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> Gi???i T??nh:</label>
            {!isEdit ? (
              <span> {sex}</span>
            ) : (
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="sex"
                  value={sex}
                  onChange={handleChangeInput}
                >
                  <FormControlLabel
                    value="Nam"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel value="N???" control={<Radio />} label="N???" />
                </RadioGroup>
              </FormControl>
            )}
          </div>
          <div className="specific-info">
            <label className="title-label"> Qu?? Qu??n:</label>
            {!isEdit ? (
              <span> {origin}</span>
            ) : (
              <TextField
                variant="standard"
                value={origin}
                name="origin"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> T??n gi??o:</label>
            {!isEdit ? (
              <span> {religion}</span>
            ) : (
              <TextField
                variant="standard"
                value={religion}
                name="religion"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> Tr??nh ????? h???c v???n:</label>
            {!isEdit ? (
              <span> {academicLevel}</span>
            ) : (
              <TextField
                variant="standard"
                value={academicLevel}
                name="academicLevel"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> Ngh??? Nghi???p</label>
            {!isEdit ? (
              <span> {job}</span>
            ) : (
              <TextField
                variant="standard"
                value={job}
                name="job"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> T???m Tr?? t???i:</label>
            {!isEdit ? (
              <span> {tamTru}</span>
            ) : (
              <TextField
                variant="standard"
                value={tamTru}
                name="tamTru"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> ?????a ch??? th?????ng tr??:</label>
            {!isEdit ? (
              <span> {thuongTru}</span>
            ) : (
              <TextField
                variant="standard"
                value={thuongTru}
                name="thuongTru"
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> ?????a ch??? ID:</label>
            <span> {idAddress}</span>
          </div>
        </form>
        {isEdit && (
          <div className="containerBTN">
            <Button variant="contained" type="submit" onClick={updateInfor}>
              C???p Nh???t
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setIsEdit(false);
                setInfor(temptValues);
              }}
            >
              H???y B???
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenDel(true);
              }}
            >
              X??a th??ng tin
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Individual;
