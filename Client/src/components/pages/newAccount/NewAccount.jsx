import React from "react";
import "./NewAccount.css";

function NewAccount() {
  return (
    <div className="new-account">
      <h1 className="newUserTitle">Tạo Tài Khoản Mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tài Khoản - ID</label>
          <input type="text" placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Xã/Phường</label>
          <input type="text" placeholder="" />
        </div>

        <div className="newUserItem">
          <label>Mật Khẩu</label>
          <input type="password" placeholder="" />
        </div>

        <div className="newUserItem">
          <label>Nhập Lại Mật Khẩu</label>
          <input type="password" placeholder="" />
        </div>

        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Xác Nhận</button>
      </form>
    </div>
  );
}

export default NewAccount;
