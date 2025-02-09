import React from "react";
import { Colors } from "../../../Utils/Colors";
import { Link } from "react-router-dom";

const NavComp = () => {
  return (
    <div>
      <nav
        className="flex justify-between items-center p-4 h-[70px]"
        style={{ backgroundColor: Colors.White }}
      >
        <div className="logo">
          <img
            src={require("./../../../../Assets/Images/Logo.png")}
            alt="Logo"
            className="h-12"
          />
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="#"
            className="font-[Nunito]"
            style={{ color: Colors.Black }}
          >
            Home
          </Link>
          <Link
            href="#"
            className="font-[Nunito]"
            style={{ color: Colors.Black }}
          >
            Take Assessment
          </Link>
          <button
            className="px-4 py-2 rounded-lg transition font-[Nunito]"
            style={{
              color: Colors.White,
              backgroundColor: Colors.Primary,
              fontWeight: "bold",
            }}
          >
            Let's Play
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavComp;
