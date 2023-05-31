import React from "react";
import "../App.css";
import { FaTh, FaBuilding, FaRegListAlt, FaBars } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { BsBuildingGear } from "react-icons/bs";
// import { MdSubject } from "react-icons/md";
import { IoAirplane, IoPeople } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsBuildingsFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo.png";

export default function SideBar({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/basicinfo",
      name: "Basic Info",
      icon: <AiFillInfoCircle />,
    },
    {
      path: "/departments",
      name: "Departments",
      icon: <BsBuildingsFill />,
    },
    {
      path: "/students",
      name: "Students",
      icon: <IoIosPeople />,
    },
    {
      path: "/financials",
      name: "Financials",
      icon: <BsBank />,
    },
    {
      path: "/result",
      name: "Result",
      icon: <FaRegListAlt />,
    },
    {
      path: "/staff",
      name: "Staff",
      icon: <IoPeople />,
    },
    {
      path: "/infrastructure",
      name: "Infrastructure",
      icon: <BsBuildingGear />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <BiLogOut />,
      onClick: logout,
    },
  ];

  if (localStorage.getItem("role") === "Account Section") {
    menuItems.splice(1, 3);    
    menuItems.splice(2, 2);
    // menuItems.splice(3, 1);
  }

  if (localStorage.getItem("role") === "Student Section") {
    menuItems.splice(1, 1);
    menuItems.splice(3, 4);
  }

  if (localStorage.getItem("role") === "Establishment Section") {
    menuItems.splice(1, 1);
    menuItems.splice(2, 3);
    menuItems.splice(3, 1);
  }

  if (localStorage.getItem("role") === "COE") {
    menuItems.splice(1, 1);
    menuItems.splice(3, 1);
    menuItems.splice(4, 2);
  }

  return (
    <div className="con">
      <div className="sidebar" style={{ width: isOpen ? "270px" : "70px" }}>
        <div className="top_section">
          <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "120px", height: "50px", marginLeft: "20px", marginTop: "10px"}}
            />
          </h1>
          <div
            onClick={toggle}
            className="bars"
            style={{ marginLeft: isOpen ? "45px" : "0px" }}
          >
            <FaBars />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            className="link"
            to={item.path}
            key={index}
            activeclassname="active"
            onClick={item.onClick}
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="dashItem">{children}</main>
    </div>
  );
}
