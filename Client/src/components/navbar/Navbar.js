import React, { useState, useContext } from "react";
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

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const {
    logOut,
    authState: {
      account: { role, name },
    },
  } = useContext(AuthContext);

  // menu-item for icon profile
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClickProfile = () => {
    navigate("/profile");
  };
  const handleClickLogOut = () => {
    // setAnchorEl(null);
    logOut();
  };

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
                <RiNotification4Fill className="icon" />
                <span className="topIconBadge">2</span>
                {/* <Badge badgeContent={2} color="error">
                  <NotificationsIcon className="icon" />
                </Badge> */}
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
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {(role === 3 || role === 4) && (
              <li className="nav-text">
                <Link to="/declaration" className="row-nav">
                  <NoteAltIcon />
                  <span>Declaration</span>
                </Link>
              </li>
            )}

            <li className="nav-text">
              <div className="row-nav" onClick={logOut}>
                <ExitToAppIcon />
                <span>Log Out</span>
              </div>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
