import React, { useEffect, useState } from "react";
import { Home, ClipboardList, User, LogOut, Menu, X } from "lucide-react";
import { Colors } from "../../../Utils/Colors";
import NavItem from "./NavItemComp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SidebarCompStyle.css";
import Swal from "sweetalert2";
import { BaseUrl } from "../../../Config/Config";
import axios from "axios";
import Notify from "../../../Notification/Notify";

const Sidebar = ({ takenQuiz }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false); // ✅ Prevent multiple redirects

  // Map routes to tab names
  const screenMap = {
    "/home": "Home",
    "/quiz": "Type Test",
    "/profile": "Profile",
    "/auth/signin": "Logout",
  };

  const active = screenMap[location.pathname] || "Home";


  useEffect(() => {
    console.log('takenQuiz: ', takenQuiz);
    // ✅ Redirect only once if takenQuiz is false
    if (takenQuiz === false && !redirected && location.pathname === "/home") {
      navigate("/quiz", { replace: true });
      setRedirected(true); // ✅ Mark as redirected
    }
  }, [takenQuiz, navigate, location.pathname, redirected]);

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
          <Link to="/home" className={active === "Home" ? "active-tab" : ""}>
            <NavItem
              icon={
                <Home
                  size={20}
                  color={active === "Home" ? Colors.Primary : Colors.White}
                />
              }
              text="Home"
              active={active === "Home"}
            />
          </Link>
          <Link
            to="/quiz"
            className={active === "Type Test" ? "active-tab" : ""}
          >
            <NavItem
              icon={
                <ClipboardList
                  size={20}
                  color={active === "Type Test" ? Colors.Primary : Colors.White}
                />
              }
              text="Type Test"
              active={active === "Type Test"}
            />
          </Link>
          <Link
            to="/profile"
            // to="/coming-soon"
            className={active === "Profile" ? "active-tab" : ""}
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
              active={active === "Profile"}
            />
          </Link>
          <Link
            to="/auth/signin"
            className={active === "Logout" ? "active-tab" : ""}
          >
            <NavItem
              icon={
                <LogOut
                  size={20}
                  color={active === "Logout" ? Colors.Primary : Colors.White}
                />
              }
              text="Logout"
              active={active === "Logout"}
            />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
