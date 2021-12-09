import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { RiNotification4Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../../contexts/authContext";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { logOut } = useContext(AuthContext);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          c
          <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">CitizenV</span>
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
                <AccountCircleIcon className="icon" />
              </div>

              <div className="topbarIconContainer">
                <IoMdSettings className="icon" />
              </div>
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
