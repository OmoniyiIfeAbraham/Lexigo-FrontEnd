import React from "react";
import { ArrowLeft } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-start p-4">
      {/* Back Icon */}
      <div className="border-2 border-gray-500 rounded-full p-2 cursor-pointer hover:bg-gray-200">
        <ArrowLeft size={24} />
      </div>

      {/* Logo */}
      <img src="/path/to/logo.png" alt="Logo" className="h-10" />
    </div>
  );
};

export default Header;
