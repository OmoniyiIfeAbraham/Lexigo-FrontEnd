import React from "react";
import { ChevronLeft } from "lucide-react";
import { Colors } from "../../../Utils/Colors";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="absolute top-4 left-4 flex flex-row items-center justify-center gap-4">
      {/* Back Icon */}
      <Link
        className="border-2 rounded-full p-2 cursor-pointer"
        style={{
          backgroundColor: Colors.White,
          borderColor: Colors.Primary,
        }}
        to="/"
      >
        <ChevronLeft size={24} color={Colors.Primary} />
      </Link>

      {/* Logo */}
      <img
        src={require("./../../../../Assets/Images/Auth/Lexigo Logo 1.png")}
        alt="Logo"
        className="h-10"
      />
    </div>
  );
};

export default Header;
