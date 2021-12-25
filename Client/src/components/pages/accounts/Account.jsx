/* eslint-disable */
import { useState, useContext, useEffect, useRef } from "react";
import "./account.css";
import { CalendarToday, PermIdentity, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AccContext } from "../../../contexts/accContext";
import AlertDialog from "../accountList/AlertDialog";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { locations } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import GppGoodIcon from "@mui/icons-material/GppGood";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ChangePassword from "./ChangeSubPassword/ChangeSubPassword";
import ChangeSubStatus from "./ChangeSubStatus/ChangeSubStatus";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SchoolIcon from "@mui/icons-material/School";
import DomainIcon from "@mui/icons-material/Domain";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { AuthContext } from "../../../contexts/authContext";
import { getDOB } from "../../../utils/constant";

const Account = ({ accountID }) => {
  const navigate = useNavigate();

  const [subAccount, setSubAccount] = useState({
    id: "",
    name: "",
    progress: "",
    state: "",
    role: "",
    address: "",
    startTime: "",
    endTime: "",
  });

  const levels = ["A1", "A2", "A3", "B1", "B2"];

  const { accState, getSubAccount, deleteSubAccount } = useContext(AccContext);

  // Get infor account
  const GetSubAccount = async () => {
    try {
      const DataSubAccount = await getSubAccount(accountID);
      if (DataSubAccount.success) {
        const {
          name,
          id,
          progress,
          role,
          state,
          address,
          startTime,
          deadTime,
        } = DataSubAccount.subAccount;
        const addr = address && address.split("-");
        console.log(DataSubAccount.subAccount);

        setSubAccount({
          ...subAccount,
          name,
          id,
          progress,
          role,
          state,
          address,
          startTime: getDOB(startTime),
          endTime: getDOB(deadTime),
        });
      }
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  };
  useEffect(() => {
    GetSubAccount();
  }, []);

  // state for dialog
  const [open, setOpen] = useState(false);

  // func delete account

  const handleClickDelBtn = () => {
    setOpen(true);
    console.log(accState);
  };

  const deleteAccount = async () => {
    try {
      const reponse = await deleteSubAccount();
      if (reponse.success) {
        navigate("/accounts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Change Password
  const [formChangePass, setFormChangePass] = useState(false);
  const [formChangeStatus, setFormChangeStatus] = useState(false);

  if (!accState.isGetSubAccount) return <></>;
  return (
    <div className="account">
      <AlertDialog
        title={"Xác nhận xóa tài khoản"}
        content={
          "Xóa tài khoản này sẽ khiến tất cả tài khoản dưới quyền bị xóa"
        }
        open={open}
        setOpen={setOpen}
        action={deleteAccount}
      />
      <div className="accountTitleContainer">
        <h1 className="accountTitle">Edit Tài khoản</h1>
        <Link to="/newAccount">
          <button className="accountAddButton">Tạo tài khoản mới</button>
        </Link>
      </div>
      <div className="accountContainer">
        <div className="accountShow">
          <div className="accountShowTop">
            <img
              src="https://file.vfo.vn/hinh/2013/12/co-viet-nam-2.jpg"
              alt=""
              className="accountShowImg"
            />
            <div className="accountShowTopTitle">
              <span className="accountShowUsername">
                Tài Khoản Điều Tra Dân Số
              </span>
              <span className="accountShowUserTitle"> {subAccount.name}</span>
            </div>
          </div>
          <div className="accountShowBottom">
            <span className="accountShowTitle">Account Details</span>

            <div className="accountShowInfo">
              <span className="accountShowInfoTitle">
                <PermIdentity className="accountShowIcon" />
                <span> Account ID:</span>
              </span>
              <span>{subAccount.id}</span>
            </div>

            <div className="accountShowInfo">
              <span className="accountShowInfoTitle">
                <DomainIcon className="accountShowIcon" />
                <span> {`${locations[subAccount.role - 1]}:`} </span>
              </span>
              <span> {subAccount.name}</span>
            </div>
            {subAccount.role > 1 && (
              <div className="accountShowInfo">
                <span className="accountShowInfoTitle">
                  <DomainIcon className="accountShowIcon" />
                  <span>Thuộc :</span>
                </span>
                <span>{subAccount.address}</span>
              </div>
            )}
            <div className="accountShowInfo">
              <span className="accountShowInfoTitle">
                <SchoolIcon className="accountShowIcon" />
                <span>Cấp bậc tài khoản :</span>
              </span>
              <span> {levels[subAccount.role]}</span>
            </div>
            <div className="accountShowInfo">
              <span className="accountShowInfoTitle">
                <CalendarToday className="accountShowIcon" />
                <span>Quyền khai báo:</span>
              </span>
              <span>{subAccount.state ? "Mở" : "Tắt"}</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        <div className="accountUpdate">
          <span className="accountUpdateTitle">Chỉnh sửa</span>
          <form className="accountUpdateForm">
            <div className="accountUpdateLeft">
              <div className="accountUpdateItem">
                <label>Account ID</label>
                <input
                  type="text"
                  placeholder={subAccount.id}
                  className="accountUpdateInput"
                />
              </div>
              <div className="accountUpdateItem">
                <label>{locations[subAccount.role - 1]}</label>
                <input
                  type="text"
                  placeholder={subAccount.name}
                  className="accountUpdateInput"
                />
              </div>
            </div>
            <div className="accountUpdateRight">
              <div className="accountUpdateUpload">
                <img
                  className="accountUpdateImg"
                  src="https://file.vfo.vn/hinh/2013/12/co-viet-nam-2.jpg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="accountUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="accountUpdateButton">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
      <div className="infor-declaration">
        <div className="accountShowInfo">
          <span className="accountShowInfoTitle">
            <EventAvailableIcon className="accountShowIcon" />
            <span>Thời gian bắt đầu khai báo:</span>
          </span>
          <span>{subAccount.startTime}</span>
        </div>
        <div className="accountShowInfo">
          <span className="accountShowInfoTitle">
            <EventBusyIcon className="accountShowIcon" />
            <span>Thời gian kết thúc khai báo:</span>
          </span>
          <span>{subAccount.endTime}</span>
        </div>
        <div className="accountShowInfo">
          <span className="accountShowInfoTitle">
            <DonutLargeIcon className="accountShowIcon" />
            <span>Tiến độ khai báo:</span>
          </span>
          <span>{subAccount.progress ? "Hoàn thành" : "Chưa hoàn thành"}</span>
        </div>
      </div>

      {/*----------------------------------------------------------------------------------------*/}
      <div className="containerButton">
        <Button
          variant="contained"
          size="large"
          startIcon={<DeleteIcon />}
          onClick={handleClickDelBtn}
        >
          Xóa Tài Khoản
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<GppGoodIcon />}
          onClick={() => {
            setFormChangePass(true);
            setFormChangeStatus(false);
          }}
        >
          Đổi Mật Khẩu
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<AssignmentIndIcon />}
          onClick={() => {
            setFormChangePass(false);
            setFormChangeStatus(true);
          }}
        >
          Mở khai báo dân số
        </Button>
      </div>

      {formChangePass && (
        <div className="change-password">
          <ChangePassword open={formChangePass} setOpen={setFormChangePass} />
        </div>
      )}

      {formChangeStatus && (
        <ChangeSubStatus subId={subAccount.id} setOpen={setFormChangeStatus} />
      )}
    </div>
  );
};

export default Account;
