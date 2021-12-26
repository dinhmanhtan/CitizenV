import { useContext, useState, useEffect } from "react";
import "./popuDeclaration.css";
import {
  apiURL,
  apiURLCitizen,
  LOCAL_STORAGE_TOKEN_NAME,
  socketIO,
} from "../../../utils/constant";
import { AuthContext } from "../../../contexts/authContext";
import { CitizenContext } from "../../../contexts/citizenContext";
// import NotFound from "../NotFound404/NotFound";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const PopulationDeclaration = () => {
  const [dataList, setDataList] = useState([]);

  const navigate = useNavigate();
  const {
    authState: { account },
  } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    CCCD: "",
    DOB: "",
    idAddress: account.role === 4 ? account.id : "",
    academicLevel: "",
    job: "",
    religion: "",
    sex: "",
    tamTru: "",
    thuongTru: "",
  });

  const { role, id, name, state } = account;

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
          socketIO.emit("sendDataClient", { id: account.id });
          navigate("/home");
        } else {
          // alert(response.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChangeProgress = () => {
    async function changeProgress() {
      const dataResult = await fetch(`${apiURL}/auth/changeProgress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
        body: JSON.stringify({
          progress: true,
        }),
      });

      return dataResult.json();
    }

    changeProgress()
      .then((response) => {
        console.log(response);
        if (response.success === true) {
          // socketIO.emit('sendDataClient', {id : account.id});
          navigate("/home");
        } else {
          // alert(response.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    navigate("/home");
  };

  useEffect(() => {
    async function getDataAuth() {
      const dataResult = await fetch(`${apiURL}/auth/${id}/getAllSubAccounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return dataResult.json();
    }

    getDataAuth()
      .then((dataTest) => {
        console.log(dataTest);
        if (dataTest.success) {
          setDataList(dataTest.account);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (role !== 3 && role !== 4) {
    return <Navigate to="/%2Fdeclaration%5E%25" />;
  }

  return (
    <div className="container-declaration">
      {state === true ? (
        <>
          <Link
            to="/PhieuDieuTra.pdf"
            target="_blank"
            download
            className="btn-download"
          >
            <Button variant="contained">
              <DownloadIcon />
              <span style={{ padding: "1px 2px" }}>Tải phiếu Điều tra</span>
            </Button>
          </Link>
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
                  onChange={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: e.currentTarget.value,
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
                {role === 4 ? (
                  <input
                    name="idAddress"
                    type="text"
                    required
                    value={id}
                    readOnly
                  />
                ) : (
                  <select
                    name="idAddress"
                    id=""
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  >
                    <option value="">--- Chọn địa điểm ---</option>
                    {dataList.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                )}
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

              <div className="inputBox">
                <span className="details">Tạm trú</span>
                <input
                  name="tamTru"
                  type="text"
                  required
                  value={data.tamTru}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div className="inputBox">
                <span className="details">Thường trú</span>
                <input
                  name="thuongTru"
                  type="text"
                  required
                  value={data.thuongTru}
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
              <input
                type="button"
                className="finished"
                value="Hoàn thành khai báo"
                onClick={handleChangeProgress}
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="notification-header">Không được khai báo !!!</h2>
          <p className="notification-reason">
            Tài khoản của bạn hiện chưa được cấp quyền khai báo hoặc chưa tới
            thời điểm khai báo
          </p>
        </>
      )}
    </div>
  );
};

export default PopulationDeclaration;
