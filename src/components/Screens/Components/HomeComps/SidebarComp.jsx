import React, { useState } from "react";
import { Home, Keyboard, User, LogOut, Menu, X } from "lucide-react";
import { Colors } from "../../../Utils/Colors";
import NavItem from "./NavItemComp";
import { Link } from "react-router-dom";
import "./SidebarCompStyle.css";

const Sidebar = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 bg-gray-800 text-white rounded-lg z-50"
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
          <div className={active !== "Home" ? "active-tab" : null}>
            <NavItem
              icon={<Home size={20} color={Colors.White} />}
              text="Home"
            />
          </div>
          <NavItem
            icon={<Keyboard size={20} color={Colors.White} />}
            text="Type Test"
          />
          <NavItem
            icon={<User size={20} color={Colors.White} />}
            text="Profile"
          />
          <NavItem
            icon={<LogOut size={20} color={Colors.White} />}
            text="Logout"
          />
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
