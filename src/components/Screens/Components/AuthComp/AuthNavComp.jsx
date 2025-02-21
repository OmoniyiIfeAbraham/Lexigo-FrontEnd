import React from "react";
import { ArrowLeft } from "lucide-react";
import { Colors } from "../../../Utils/Colors";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-start">
      {/* Left Section */}
      <div className="relative w-[50%]">
        <img
          src={require("./../../../../Assets/Images/Auth/Group 2076.png")}
          alt="Logo"
          className="h-screen w-full"
        />

        {/* Navbar */}
        <div className="absolute top-4 left-4 flex items-center gap-4">
          {/* Back Icon */}
          <div className="border-2 border-gray-500 rounded-full p-2 cursor-pointer hover:bg-gray-200">
            <ArrowLeft size={24} />
          </div>

          {/* Logo */}
          <img
            src={require("./../../../../Assets/Images/Logo.png")}
            alt="Logo"
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
