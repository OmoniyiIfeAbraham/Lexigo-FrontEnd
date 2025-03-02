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
    <div className="flex relative">
      <Sidebar takenQuiz={takenQuiz} />
      <main className="flex-1 p-6">
        <h1>Assessment Test</h1>
        <button onClick={handleCancel}>Cancel</button>
      </main>

      {/* Popup when takenQuiz is false */}
      {!takenQuiz && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          {/* Popup Container */}
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 text-center">
            <p className="text-lg font-semibold">
              Hey, I hope you are okay. Let’s know what you are.
              <br />
              They are simple 😁
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Quit
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Begin
              </button>
            </div>

            {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
            <img
              src={require("./../../../Assets/Images/HomePage/Lexigo dog 2.png")}
              alt="Dog"
              className="absolute -bottom-12 -left-20 w-20 h-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
