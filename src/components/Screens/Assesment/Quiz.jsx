import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setTakenQuiz(null);
    navigate("/home", { state: { pass: true } });
  };
  return (
    <div className="flex">
      <Sidebar takenQuiz={takenQuiz} />
      <h1>Assesment Test</h1>
      <button onClick={() => handleCancel()}>Cancel</button>
    </div>
  );
};

export default Quiz;
