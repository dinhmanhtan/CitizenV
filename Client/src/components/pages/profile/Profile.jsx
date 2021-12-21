import React from "react";
import "./profile.css";
import { Avatar } from "@mui/material";

const Profile = () => {
  return (
    <div className="wrapper-profile">
      <div class="left">
        <Avatar src="https://github.com/dinhmanhtan/CitizenV/blob/869912aafb2beb215e1651555212ded6563b57b6/Client/src/utils/avatar.jpg" />

        <h4>user1</h4>
      </div>

      <div class="right">
        <div class="info">
          <h3> Thông tin tài khoản</h3>

          <div class="info-data">
            <div class="data">
              <h4> Mã tài khoản</h4>
              <p> user1</p>
            </div>
          </div>
        </div>

        <div class="authorization">
          <h3> Quyền hạn</h3>

          <div class="authorization-data">
            <div class="data">
              <h4> Vai trò</h4>
              <p> A1</p>
            </div>

            <div class="data">
              <h4> Quyền khai báo</h4>
              <p> Được phép</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
