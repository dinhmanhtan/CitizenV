import { useContext, useState, useRef } from "react";
import "./popuDeclaration.css";
import {
  apiURLCitizen,
  LOCAL_STORAGE_TOKEN_NAME,
} from "../../../utils/constant";
import { AuthContext } from "../../../contexts/authContext";
// import TextField from "@mui/material/TextField";
import { CitizenContext } from "../../../contexts/citizenContext";
// import NotFound from "../NotFound404/NotFound";
import { Navigate, useNavigate } from "react-router-dom";

const PopulationDeclaration = () => {
  const navigate = useNavigate();
  const {
    authState: { account },
  } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    CCCD: "",
    DOB: "",
    idAddress: account.id,
    academicLevel: "",
    job: "",
    religion: "",
    sex: "",
  });

  const { role } = account;

  if (role !== 3 && role !== 4) {
    return <Navigate to="/%2Fdeclaration%5E%25" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    async function createNewPerson(data) {
      const dataResult = await fetch(`${apiURLCitizen}/addPerson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
        body: JSON.stringify(data),
      });

      return dataResult.json();
    }

    createNewPerson(data)
      .then((response) => {
        console.log(response);
        if (response.message === "success") {
          navigate("/population");
        } else {
          alert(response.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    navigate("/population");
  };

  return (
    <div className="container-declaration">
      <div className="title"> Nhập liệu về dân số</div>
      <form className="form-declaration" onSubmit={(e) => handleSubmit(e)}>
        <div className="info">
          <div className="inputBox">
            <span className="details"> Họ và tên</span>
            <input
              name="name"
              type="text"
              required
              value={data.name}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="inputBox">
            <span className="details"> Ngày sinh</span>
            <input
              name="DOB"
              type="date"
              required
              value={null}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.name]: e.currentTarget.valueAsDate,
                })
              }
            />
          </div>

          <div className="inputBox">
            <span className="details"> Số CCCD</span>
            <input
              name="CCCD"
              type="text"
              required
              value={data.CCCD}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="inputBox">
            <span className="details"> Địa chỉ</span>
            <input
              name="idAddress"
              type="text"
              required
              value={data.idAddress}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="inputBox">
            <span className="details">Trình độ học vấn</span>
            <input
              name="academicLevel"
              type="text"
              required
              value={data.academicLevel}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="inputBox">
            <span className="details"> Công việc</span>
            <input
              name="job"
              type="text"
              required
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="inputBox">
            <span className="details"> Tôn giáo</span>
            <input
              name="religion"
              type="text"
              required
              value={data.religion}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>

        <div className="gender-info">
          <input
            type="radio"
            name="sex"
            id="dot1"
            value="nam"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <input
            type="radio"
            name="sex"
            id="dot2"
            value="nữ"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
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
          <input type="button" value="Hủy" onClick={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default PopulationDeclaration;