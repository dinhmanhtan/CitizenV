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
              <span style={{ padding: "1px 2px" }}>T???i phi???u ??i???u tra</span>
            </Button>
          </Link>
          <div className="title"> Nh???p li???u v??? d??n s???</div>
          <form className="form-declaration" onSubmit={(e) => handleSubmit(e)}>
            <div className="info">
              <div className="inputBox">
                <span className="details"> H??? v?? t??n</span>
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
                <span className="details"> Ng??y sinh</span>
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
                <span className="details"> S??? CCCD</span>
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
                <span className="details"> ?????a ch???</span>
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
                    <option value="">--- Ch???n ?????a ??i???m ---</option>
                    {dataList.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="inputBox">
                <span className="details">Tr??nh ????? h???c v???n</span>
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
                <span className="details"> C??ng vi???c</span>
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
                <span className="details"> T??n gi??o</span>
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
                <span className="details">T???m tr??</span>
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
                <span className="details">Th?????ng tr??</span>
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
                value="n???"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
              <span className="title"> Gi???i t??nh</span>
              <div className="option">
                <label htmlFor="dot1">
                  <span className="dot one"></span>
                  <span className="gender"> Nam</span>
                </label>

                <label htmlFor="dot2">
                  <span className="dot two"></span>
                  <span className="gender"> N???</span>
                </label>
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Nh???p" />
              <input type="button" value="H???y" onClick={handleClose} />
              <input
                type="button"
                className="finished"
                value="Ho??n th??nh khai b??o"
                onClick={handleChangeProgress}
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="notification-header">Kh??ng ???????c khai b??o !!!</h2>
          <p className="notification-reason">
            T??i kho???n c???a b???n hi???n ch??a ???????c c???p quy???n khai b??o ho???c ch??a t???i
            th???i ??i???m khai b??o
          </p>
        </>
      )}
    </div>
  );
};

export default PopulationDeclaration;
