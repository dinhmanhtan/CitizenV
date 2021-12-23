import React from "react";
import "./accountList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../home/SearchBar";
import { AuthContext } from "../../../contexts/authContext";
import Progress from "../login/Progress";
import { AccContext } from "../../../contexts/accContext";
import { useNavigate } from "react-router-dom";

function AccountList() {
  const navigate = useNavigate();
  const { setIdSubAccount } = useContext(AccContext);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "city", headerName: "Tỉnh/Thành phố", width: 150 },
    { field: "district", headerName: "Quận/Huyện", width: 150 },
    { field: "xa", headerName: "Xã/Phường", width: 150 },
    { field: "xom", headerName: "Thôn/Xóm", width: 150 },
    { field: "status", headerName: "Quyền khai báo", width: 150 },
    { field: "progress", headerName: "Tiến độ khai báo", width: 190 },
    {
      field: "action",
      headerName: " ",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/accounts/" + params.row.id}>
              <button
                className="btnEdit"
                onClick={() => setIdSubAccount(params.row.id)}
              >
                Edit
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  // set up table

  const { authState, getAllSubAccounts } = useContext(AuthContext);
  const { getSubAccLoading, account } = authState;
  // eslint-disable-next-line
  const { id, name, state, role } = account;

  // set up params for table
  const [users, setUsers] = useState([]);
  const [isData, setIsData] = useState(true);

  const cols = [
    columns[0],
    columns[role + 1],
    columns[5],
    columns[6],
    columns[columns.length - 1],
  ];
  const Getdata = async () => {
    try {
      const data = await getAllSubAccounts();
      if (data.success && data.account.length > 0) {
        console.log(data.account);
        var acc =
          data.account &&
          data.account.map((account) => {
            const entry = new Map([
              [cols[0].field, account.id],
              [cols[1].field, account.name],
              [cols[2].field, account.state ? "Active" : "Disabled"],
              [cols[3].field, "Chưa mở khai báo"],
            ]);

            const obj = Object.fromEntries(entry);
            return obj;
          });
        if (role === 0) {
          for (let i = 0; i < acc.length - 1; i++) acc[i] = acc[i + 1];
          acc.pop();
        }
        setUsers(acc);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Style csstable
  // const [styleTable, setStyleTable] = useState({
  //   marginTop: "100px",
  //   // height: 66 * users.length + "px",
  //   width: "1000px",
  //   display: "flex",
  // });

  // Search

  const [input, setInput] = useState("");

  const search = (str) => {
    setInput(str);
    // console.log(input);
  };

  const filterSearch = () => {
    // const columns = rows[0] && Object.keys(rows[0]);
    // const newRows = rows.filter((row) =>
    //   columns.some(
    //     (column) =>
    //       row[column].toString().toLowerCase().indexOf(input.toLowerCase()) > -1
    //   )
    // );
    // // console.log(newRows);
    // if (newRows.length > 0) setUsers(newRows);
  };

  if (getSubAccLoading) {
    return <Progress />;
  }

  return (
    <div className="accountList">
      {isData ? (
        <div className="wrap-container">
          <div className="top-container">
            {/* <SearchBar search={() => search} Submit={filterSearch} /> */}

            <Link to="/newAccount">
              <button className="btnCreateAccount"> New Account</button>
            </Link>
          </div>
          <div id="datatable">
            <DataGrid
              rows={users}
              columns={cols}
              // eslint-disable-next-line
              rowsPerPageOptions={[13]}
              // checkboxSelection
              disableSelectionOnClick
              autoHeight
              density="comfortable"
              onRowClick={(param, event) => {
                setIdSubAccount(param.id);
                navigate(`/accounts/${param.id}`);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="empty-list">
          <h1> No account was created</h1>
          <Link to="/newAccount">
            <button>Create a account</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AccountList;
