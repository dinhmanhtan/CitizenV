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
  } = infor;

  const [temptValues, setTemptValues] = useState(infor);

  useEffect(() => {
    getInforPerson(infor, setInfor, setTemptValues, personID);
    // eslint-disable-next-line
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const handleChangeInput = (event) => {
    setInfor({ ...infor, [event.target.name]: event.target.value });
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

  const updateInfor = () => {
    updateInforPerson(infor, personID, setIsEdit);
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
          title={"Thông báo"}
          content={"Xác nhận cập nhật thông tin thành công"}
          open={open}
          setOpen={setOpen}
          action={() => {}}
        />
        <AlertDialog
          title={"Thông báo"}
          content={"Xác nhận xóa thông tin người dân "}
          open={openDel}
          setOpen={setOpenDel}
          action={() => {
            deletePerson(personID);
            navigate("/population");
          }}
        />

        <AlertDialog
          title={"Thông báo"}
          content={"Tài khoản bị khóa quyền khai báo "}
          open={openEdit}
          setOpen={setOpenEdit}
          action={() => {}}
        />

        <EditIcon className="edit-icon" onClick={handleClickEdit} />
        <div className="title">
          <span>Thông tin cá nhân</span>
        </div>

        <form className="form">
          <div className="specific-info">
            <label className="title-label"> Họ và Tên:</label>
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
            <label className="title-label"> Ngày Sinh:</label>
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
            <label className="title-label"> Giới Tính:</label>
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
                  <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
            )}
          </div>
          <div className="specific-info">
            <label className="title-label"> Quê Quán:</label>
            {!isEdit ? (
              <span> {}</span>
            ) : (
              <TextField
                variant="standard"
                value={""}
                name=""
                onChange={handleChangeInput}
                className="text-field"
              />
            )}
          </div>

          <div className="specific-info">
            <label className="title-label"> Tôn giáo:</label>
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
            <label className="title-label"> Trình độ học vấn:</label>
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
            <label className="title-label"> Nghề Nghiệp</label>
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
            <label className="title-label"> Tạm Trú tại:</label>
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
            <label className="title-label"> Địa chỉ thường trú:</label>
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
            <label className="title-label"> Địa chỉ ID:</label>
            <span> {idAddress}</span>
          </div>
        </form>
        {isEdit && (
          <div className="containerBTN">
            <Button variant="contained" type="submit" onClick={updateInfor}>
              Cập Nhật
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setIsEdit(false);
                setInfor(temptValues);
              }}
            >
              Hủy Bỏ
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenDel(true);
              }}
            >
              Xóa thông tin
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Individual;
