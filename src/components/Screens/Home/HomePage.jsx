import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const [type, setType] = useState("");
  const location = useLocation();

  let pass = location.state?.pass;
  console.log("pass: ", pass);
  return (
    <div className="flex">
      {!pass ? <Sidebar takenQuiz={takenQuiz} /> : <Sidebar />}
      <main className="flex-1 p-6">
        {" "}
        {/* Content Area */}
        <div>
          <h1>Home Page</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
