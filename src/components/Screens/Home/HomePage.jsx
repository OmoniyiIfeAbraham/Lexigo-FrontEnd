import React from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {" "}
        {/* Content Area */}
        <h1 className="text-2xl font-bold">Welcome to Home</h1>
      </main>
    </div>
  );
};

export default Home;
