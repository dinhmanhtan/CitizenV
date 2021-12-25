import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import GroupsIcon from "@mui/icons-material/Groups";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <IoAnalyticsSharp />,
    cName: "nav-text",
    role: 4,
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <MdAccountBox />,
    cName: "nav-text",
    role: 4,
  },
];
