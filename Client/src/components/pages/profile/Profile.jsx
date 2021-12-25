import { useContext } from "react";
import "./profile.css";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../../contexts/authContext";
import { levels, getDOB } from "../../../utils/constant";

const Profile = () => {
  const {
    authState: { account },
  } = useContext(AuthContext);
  console.log(account);

  const { name, id, role, state, progress, startTime, deadTime, address } =
    account;

  return (
    <div className="wrapper-profile">
      <div className="left">
        <Avatar
          src="https://file.vfo.vn/hinh/2013/12/co-viet-nam-2.jpg"
          sx={{ width: 60, height: 60, margin: "auto" }}
        />

        <h4>{`Tài khoản ${name}`}</h4>
      </div>

      <div className="right">
        <div className="info">
          <h2> Thông tin tài khoản</h2>

          <div className="info-data">
            <div className="data">
              <h4> Mã tài khoản:</h4>
              <span> {id}</span>
            </div>
          </div>
          {address && (
            <div className="info-data">
              <div className="data">
                <h4> Thuộc:</h4>
                <span> {address}</span>
              </div>
            </div>
          )}
          {role === 0 && (
            <div className="info-data">
              <div className="data">
                <h4> Thuộc Bộ y tế</h4>
              </div>
            </div>
          )}
        </div>

        <div className="authorization">
          <h2> Quyền hạn</h2>

          <div className="authorization-data">
            <div className="data">
              <h4> Vai trò: </h4>
              <span> {levels[role]}</span>
            </div>

            <div className="data">
              <h4> Quyền khai báo :</h4>
              <span> {state ? "Được phép" : "Tạm khóa"}</span>
            </div>
            {role !== 0 && (
              <>
                <div className="data">
                  <h4> Thời gian bắt đầu khai báo :</h4>
                  <span> {getDOB(startTime)}</span>
                </div>
                <div className="data">
                  <h4> Thời gian kết thúc khai báo :</h4>
                  <span> {getDOB(deadTime)}</span>
                </div>
                <div className="data">
                  <h4> Tiến độ khai báo :</h4>
                  <span> {progress ? "Hoàn thành" : "Chưa hoàn thành"}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
