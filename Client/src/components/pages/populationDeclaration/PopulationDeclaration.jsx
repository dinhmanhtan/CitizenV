import { useContext } from "react";
import "./popuDeclaration.css";
import { AuthContext } from "../../../contexts/authContext";
import NotFound from "../NotFound404/NotFound";
import { Navigate } from "react-router-dom";
const PopulationDeclaration = () => {
  const {
    authState: { account },
  } = useContext(AuthContext);

  const { role } = account;

  if (role !== 3 && role !== 4) {
    return <Navigate to="/%2Fdeclaration%5E%25" />;
  }

  return (
    <div className="container-declaration">
      <div className="title"> Nhập liệu về dân số</div>
      <form className="form-declaration">
        <div className="info">
          <div className="inputBox">
            <span className="details"> Họ và tên</span>
            <input type="text" id="fullname" required />
          </div>

          <div className="inputBox">
            <span className="details"> Ngày sinh</span>
            <input type="text" id="dob" required />
          </div>

          <div className="inputBox">
            <span className="details"> Số CCCD</span>
            <input type="text" id="person_id" required />
          </div>

          <div className="inputBox">
            <span className="details"> Tỉnh/Thành phố</span>
            <input type="text" id="province/city" required />
          </div>

          <div className="inputBox">
            <span className="details"> Quận/Huyện</span>
            <input type="text" id="district" required />
          </div>

          <div className="inputBox">
            <span className="details"> Xã/Phường</span>
            <input type="text" id="village/neighbourhood" required />
          </div>

          <div className="inputBox">
            <span className="details"> Địa chỉ</span>
            <input type="text" id="address" required />
          </div>

          <div className="inputBox">
            <span className="details"> SĐT</span>
            <input type="text" id="phone" required />
          </div>
        </div>

        <div className="gender-info">
          <input type="radio" name="gender" id="dot1" />
          <input type="radio" name="gender" id="dot2" />
          <span className="title"> Giới tính</span>
          <div className="option">
            <label htmlFor="dot1">
              <span className="dot one"></span>
              <span className="gender"> Nam</span>
            </label>

            <label htmlFor="dot2">
              <span className="dot two"></span>
              <span className="gender"> Nữ</span>
            </label>
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Nhập" />
          <input type="button" value="Hủy" />
        </div>
      </form>
    </div>
  );
};

export default PopulationDeclaration;
