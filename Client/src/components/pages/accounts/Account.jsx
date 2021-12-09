import React from "react";
import "./account.css";
import { CalendarToday, PermIdentity, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccContext } from "../../../contexts/accContext";

const Account = () => {
  const { accState } = useContext(AccContext);
  console.log(accState);

  return (
    <div className="account">
      <div className="accountTitleContainer">
        <h1 className="accountTitle">Edit Account</h1>
        <Link to="/newAccount">
          <button className="accountAddButton">Create</button>
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
              <span className="accountShowUserTitle">Xã GG - Huyện YY</span>
            </div>
          </div>
          <div className="accountShowBottom">
            <span className="accountShowTitle">Account Details</span>

            <div className="accountShowInfo">
              <PermIdentity className="accountShowIcon" />
              <span className="accountShowInfoTitle">Account ID: 4912312</span>
            </div>

            <div className="accountShowInfo">
              <PermIdentity className="accountShowIcon" />
              <span className="accountShowInfoTitle">Xã: GG</span>
            </div>

            <div className="accountShowInfo">
              <PermIdentity className="accountShowIcon" />
              <span className="accountShowInfoTitle">
                Thuộc : Huyện YY - Tỉnh ZZ
              </span>
            </div>

            <div className="accountShowInfo">
              <CalendarToday className="accountShowIcon" />
              <span className="accountShowInfoTitle">
                Ngày Tạo : 10.12.1999
              </span>
            </div>

            <div className="accountShowInfo">
              <CalendarToday className="accountShowIcon" />
              <span className="accountShowInfoTitle">
                Cấp bậc tài khoản : B1
              </span>
            </div>
          </div>
        </div>

        <div className="accountUpdate">
          <span className="accountUpdateTitle">Edit</span>
          <form className="accountUpdateForm">
            <div className="accountUpdateLeft">
              <div className="accountUpdateItem">
                <label>Account ID</label>
                <input
                  type="text"
                  placeholder="4912312"
                  className="accountUpdateInput"
                />
              </div>
              <div className="accountUpdateItem">
                <label>Xã</label>
                <input
                  type="text"
                  placeholder="GG"
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
              <button className="accountUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
