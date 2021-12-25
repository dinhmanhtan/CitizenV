import { useContext, useState } from "react";
import "./NewAccount.css";
import { AuthContext } from "../../../contexts/authContext";
import AlertMessage from "../login/AlertMessage";
import TextField from "@mui/material/TextField";
import { AccContext } from "../../../contexts/accContext";
import { useNavigate, Navigate } from "react-router-dom";
import { locations } from "../../../utils/constant";

const NewAccount = () => {
  const {
    authState: { account },
  } = useContext(AuthContext);

  const { createNewAccount } = useContext(AccContext);
  const navigate = useNavigate();

  const { id, role, state } = account;

  const [form, setForm] = useState({
    sub_id: "",
    location: "",
    pass: "",
    rePass: "",
  });
  const [mssgAlert, setMssg] = useState(null);
  const { sub_id, location, pass, rePass } = form;

  const submit = async (e) => {
    e.preventDefault();
    // console.log(pass, rePass);
    if (pass !== rePass) {
      setMssg({
        type: "danger",
        message: "Xác nhận password không trùng khớp",
      });
      setTimeout(() => setMssg(null), 7000);
      console.log("khac");
    } else {
      const accountForm = {
        id: sub_id,
        password: pass,
        name: location,
        role: role + 1,
      };

      try {
        const accountData = await createNewAccount(accountForm);
        console.log(accountData);
        if (accountData.success) {
          console.log("success \n");
          navigate(`/accounts/${sub_id}`);
        } else {
          setMssg({ type: "", message: accountData.message });
          setForm({ ...form, rePass: "" });
          setTimeout(() => setMssg(null), 6000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (role === 4) return <Navigate to="/notfound" />;

  return (
    <div className="new-account">
      {role !== 4 && (
        <>
          <h1 className="newUserTitle">Tạo Tài Khoản Mới</h1>
          <form className="newUserForm" onSubmit={submit}>
            <AlertMessage info={mssgAlert} />
            <div className="newUserItem">
              <label>Tài Khoản - ID</label>
              <input
                name="sub_id"
                type="text"
                placeholder=""
                required
                value={sub_id}
                onChange={handleChangeValue}
              />
            </div>

            <div className="newUserItem">
              <label>{locations[role]}</label>
              <input
                name="location"
                type="text"
                placeholder=""
                required
                value={location}
                onChange={handleChangeValue}
              />
            </div>

            <div className="newUserItem">
              <label>Mật Khẩu</label>
              <input
                name="pass"
                type="password"
                placeholder=""
                required
                value={pass}
                onChange={handleChangeValue}
              />
            </div>

            <div className="newUserItem">
              <label>Nhập Lại Mật Khẩu</label>
              <input
                name="rePass"
                type="password"
                placeholder=""
                required
                value={rePass}
                onChange={handleChangeValue}
              />
            </div>

            {/* <div className="newUserItem">
          <label>Quyền Khai báo</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Có</option>
            <option value="no">Không</option>
          </select>
        </div> */}
            <button className="newUserButton" type="submit">
              Xác Nhận
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewAccount;
