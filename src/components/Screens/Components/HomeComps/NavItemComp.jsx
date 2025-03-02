import React from "react";
import { Colors } from "../../../Utils/Colors";
import "./NavItemCompStyle.css";

const NavItem = ({ icon, text }) => {
  return (
    <div className="main-div flex items-center space-x-3 p-3 rounded-lg cursor-pointer">
      <div
        className="p-2"
        style={{ backgroundColor: Colors.Primary, borderRadius: 25 }}
      >
        {icon}
      </div>
      <span
        className="text-lg font-[Nunito] font-bold"
        style={{ color: Colors.Primary }}
      >
        {text}
      </span>
    </div>
  );
};

export default NavItem;
