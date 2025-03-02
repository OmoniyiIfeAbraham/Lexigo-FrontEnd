import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { useNavigate } from "react-router-dom";
import "./QuizStyle.css";
import { Colors } from "../../Utils/Colors";

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
      </main>

      {/* Popup when takenQuiz is false */}
      {!takenQuiz && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          {/* Popup Container */}
          <div className="popup bg-white p-6 shadow-lg relative w-104 text-start">
            <p
              className="text-lg font-semibold font-[Nunito]"
              style={{ color: Colors.Black }}
            >
              Hey, I hope you are okay. Let’s know what you are.
              <br />
              They are simple 😁
            </p>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 transition font-[Nunito] mt-5 w-[99.5px] h-[49.5px]"
                style={{
                  color: Colors.Primary,
                  backgroundColor: Colors.Cream,
                  fontWeight: "bold",
                  borderRadius: 16.7,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: Colors.Primary,
                }}
              >
                Quit
              </button>
              <button
                className="px-4 py-2 transition font-[Nunito] mt-5 w-[99.5px] h-[49.5px]"
                style={{
                  color: Colors.White,
                  backgroundColor: Colors.Primary,
                  fontWeight: "bold",
                  borderRadius: 16.7,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: Colors.Primary,
                }}
              >
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
