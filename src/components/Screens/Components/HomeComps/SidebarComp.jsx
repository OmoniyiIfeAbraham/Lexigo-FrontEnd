import React, { useState } from "react";
import { Home, Keyboard, User, LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
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
        className={`fixed md:relative h-screen bg-gray-900 text-white w-64 p-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:flex flex-col items-center md:w-64`}
      >
        {/* Logo */}
        <div className="text-xl font-bold mb-8">🚀 My Logo</div>

        {/* Nav Items */}
        <nav className="flex flex-col w-full space-y-4">
          <NavItem icon={<Home size={20} />} text="Home" />
          <NavItem icon={<Keyboard size={20} />} text="Type Test" />
          <NavItem icon={<User size={20} />} text="Profile" />
          <NavItem icon={<LogOut size={20} />} text="Logout" />
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

// Navbar Item Component
const NavItem = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
      {icon}
      <span className="text-lg">{text}</span>
    </div>
  );
};

export default Sidebar;
