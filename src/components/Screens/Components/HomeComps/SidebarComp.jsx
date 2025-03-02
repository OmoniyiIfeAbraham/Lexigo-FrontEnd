import React, { useState } from "react";
import { Home, ClipboardList, User, LogOut, Menu, X } from "lucide-react";
import { Colors } from "../../../Utils/Colors";
import NavItem from "./NavItemComp";
import { Link } from "react-router-dom";
import "./SidebarCompStyle.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 text-white rounded-lg z-50"
        style={{ backgroundColor: Colors.Primary }}
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen text-white w-64 p-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:flex flex-col items-center md:w-64`}
        style={{ backgroundColor: Colors.White }}
      >
        {/* Logo */}
        <Link to="/home" className="text-xl font-bold mb-8">
          <img
            src={require("./../../../../Assets/Images/Auth/Lexigo Logo 1.png")}
            alt="logo"
          />
        </Link>

        {/* Nav Items */}
        <nav className="flex flex-col w-full space-y-4">
          <button
            className={active === "Home" ? "active-tab" : null}
            onClick={() => setActive("Home")}
          >
            <NavItem
              icon={
                <Home
                  size={20}
                  color={active === "Home" ? Colors.Primary : Colors.White}
                />
              }
              text="Home"
              active={active === "Home" ? true : false}
            />
          </button>
          <button
            className={active === "Type Test" ? "active-tab" : null}
            onClick={() => setActive("Type Test")}
          >
            <NavItem
              icon={
                <ClipboardList
                  size={20}
                  color={active === "Type Test" ? Colors.Primary : Colors.White}
                />
              }
              text="Type Test"
              active={active === "Type Test" ? true : false}
            />
          </button>
          <button
            className={active === "Profile" ? "active-tab" : null}
            onClick={() => setActive("Profile")}
          >
            <NavItem
              icon={
                <img
                  src={require("./../../../../Assets/Images/HomePage/Lexigo dog 2.png")}
                  alt="Profile-img"
                  style={{ width: 24, height: 24 }}
                />
              }
              text="Profile"
              active={active === "Profile" ? true : false}
            />
          </button>
          <button
            className={active === "Logout" ? "active-tab" : null}
            onClick={() => setActive("Logout")}
          >
            <NavItem
              icon={
                <LogOut
                  size={20}
                  color={active === "Logout" ? Colors.Primary : Colors.White}
                />
              }
              text="Logout"
              active={active === "Logout" ? true : false}
            />
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )} */}
    </>
  );
};

export default Sidebar;
