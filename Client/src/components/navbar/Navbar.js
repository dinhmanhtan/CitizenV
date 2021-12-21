import React, { useState, useContext, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { RiNotification4Fill } from "react-icons/ri";
// import { IoMdSettings } from "react-icons/io";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../../contexts/authContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { AccContext } from "../../contexts/accContext";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NotifiList from "./NotifiList";
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constant";
import socketIOClient from "socket.io-client";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [sideNoti, setSideNoti] = useState(1);

  const [dataOne, setDataOne] = useState();
  const [dataTwo, setDataTwo] = useState();
<<<<<<< HEAD
  const [id1, setId1] = useState();
  const [noti , setNoti] = useState();
  const [data, setData] = useState([]);

  const socketRef = useRef();

  console.log(id1);
  console.log(noti, '123');
=======
  const [id, setId] = useState();
  const [noti, setNoti] = useState();

  const socketRef = useRef();

  console.log(id);
  console.log(noti, "123");
>>>>>>> 8a4f1ac3f4b80ed2350d4bad2ce7e448d29087ba
  console.log(isHidden);
  console.log(data)

  const showSidebar = () => setSidebar(!sidebar);

  const {
    logOut,
    authState: {
      account: { role, name, id },
    },
  } = useContext(AuthContext);

  // menu-item for icon profile
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClickProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };
  const handleClickLogOut = () => {
    // setAnchorEl(null);
    logOut();
  };


  useEffect(() => {
<<<<<<< HEAD
    socketRef.current = socketIOClient.connect('http://localhost:5555')

    socketRef.current.on('getId', data => {
      setId1(data)
    })

    socketRef.current.on(`getNoti${id}`, data => setData(d => [...d, data]));

  }, [])
=======
    socketRef.current = socketIOClient.connect("http://localhost:5555");
    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("getNoti", (data) => setNoti(data));
  }, []);
>>>>>>> 8a4f1ac3f4b80ed2350d4bad2ce7e448d29087ba

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${apiURL}/notify/typeOne`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return data.json();
    }

    fetchData()
      .then((data) => {
        console.log(data);
        setDataOne(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${apiURL}/notify/typeTwo`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return data.json();
    }

    fetchData()
      .then((data) => {
        console.log(data);
        setDataTwo(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">CitizenV</span>
              <span className="title-name">Tài khoản {name}</span>
            </div>
            <div className="topRight">
              <div className="topbarIconContainer">
                <RiNotification4Fill
                  className="icon"
                  onClick={() => setIsHidden((data) => !data)}
                />
                <span
                  className="topIconBadge"
                  onClick={() => setIsHidden((data) => !data)}
                >
                  !
                </span>
                {/* <Badge badgeContent={2} color="error">
                  <NotificationsIcon className="icon" />
                </Badge> */}
                {!isHidden && (
                  <div
                    className="wrap-notify"
                    onClick={(e) => console.log(e.target)}
                  >
                    <div className="header-notify">
                      <span
                        style={
                          sideNoti === 1 ? { backgroundColor: "#ccc" } : {}
                        }
                        onClick={() => setSideNoti(1)}
                      >
                        Cấp trên
                      </span>
                      <span
                        style={
                          sideNoti === 2 ? { backgroundColor: "#ccc" } : {}
                        }
                        onClick={() => setSideNoti(2)}
                      >
                        Cấp dưới
                      </span>
                    </div>
                    {sideNoti === 1 ? (
                      <NotifiList datas={dataOne} />
                    ) : (
                      <NotifiList datas={dataTwo} />
                    )}
                  </div>
                )}
              </div>

              <div className="topbarIconContainer">
                <AccountCircleIcon
                  className="icon"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  id="icon-profile"
                />
                <Menu
                  // sx={{ mt: "33px" }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "icon-profile",
                  }}
                  // anchorOrigin={{
                  //   vertical: "top",
                  //   horizontal: "right",
                  // }}
                  // keepMounted
                  // transformOrigin={{
                  //   vertical: "top",
                  //   horizontal: "right",
                  // }}
                >
                  <MenuItem
                    sx={{
                      width: "110px",
                      height: "40px",
                      justifyContent: "center",
                    }}
                    onClick={handleClickProfile}
                  >
                    Profile
                  </MenuItem>

                  <MenuItem
                    sx={{
                      width: "110px",
                      height: "40px",
                      justifyContent: "center",
                    }}
                    onClick={handleClickLogOut}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>

              {/* <div className="topbarIconContainer">
                <IoMdSettings className="icon" />
              </div> */}
            </div>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className="row-nav">
                    {item.icon}
                    <span className="title-span">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {(role === 3 || role === 4) && (
              <li className="nav-text">
                <Link to="/declaration" className="row-nav">
                  <NoteAltIcon />
                  <span className="title-span">Declaration</span>
                </Link>
              </li>
            )}

            <li className="nav-text">
              <div className="row-nav" onClick={logOut}>
                <ExitToAppIcon />
                <span className="title-span">Log Out</span>
              </div>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
