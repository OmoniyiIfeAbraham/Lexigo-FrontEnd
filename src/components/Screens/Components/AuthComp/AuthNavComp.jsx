import React from "react";
import { ChevronLeft } from "lucide-react";
import { Colors } from "../../../Utils/Colors";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-start">
      {/* Left Section */}
      <div className="relative w-[50%]">
        <img
          src={require("./../../../../Assets/Images/Auth/Group 2076.png")}
          alt="Logo"
          className="h-screen"
        />

        {/* Navbar */}
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
      </div>
      {/* Right Section */}
      <div>
        {/* title */}
        <div className='flex flex-col items-center'>
          <h1
            className="font-[Nunito] text-3xl font-bold"
            style={{ color: Colors.Black }}
          >
            Hello Friend!
          </h1>
          <h3
            className="font-[Nunito] text-xl font-bold"
            style={{ color: Colors.Black }}
          >
            Login to Learn and Play.
          </h3>
        </div>
        {/* form */}
        <form>
          <div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
