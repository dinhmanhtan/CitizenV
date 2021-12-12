import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";

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
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <MdAccountBox />,
    cName: "nav-text",
  },

  {
    title: "Population",
    path: "/population",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
