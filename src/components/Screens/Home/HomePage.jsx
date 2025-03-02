import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { Link, useLocation } from "react-router-dom";
import { Colors } from "../../Utils/Colors";

const Home = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const [type, setType] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  // State for progress bars
  const [phonologicalProgress, setPhonologicalProgress] = useState(50);
  const [surfaceProgress, setSurfaceProgress] = useState(30);
  const location = useLocation();

  let pass = location.state?.pass;
  console.log("pass: ", pass);
  return (
    <div className="flex">
      {!pass ? <Sidebar takenQuiz={takenQuiz} /> : <Sidebar />}
      <main className="flex-1 p-6">
        {/* Title & Description */}
        <div className="ml-10">
          <h1 className="font-[Nunito] font-bold text-2xl text-black">
            Learning Paths
          </h1>
          <p className="font-[Nunito] text-lg text-black">
            Select your type then begin to learn and play
          </p>
        </div>

        {/* Images & Progress Bars */}
        <div className="flex flex-col md:flex-row gap-6 mt-14 items-center ml-10">
          {/* Phonological Image + Progress Bar */}
          <div className="flex flex-col items-center md:mr-14">
            <img
              src={require("../../../Assets/Images/HomePage/phonological.png")}
              className="w-[267px] h-[186px] md:w-[267px] md:h-[186px]"
              alt="Phonological"
            />
            <div className="w-full mt-2 bg-gray-200 rounded-full border-2 border-blue-500 p-1">
              <div
                style={{
                  width: `${phonologicalProgress}%`,
                  height: "12px",
                  backgroundColor: "#3B82F6", // Blue
                  borderRadius: "50px",
                }}
              />
            </div>
          </div>

          {/* Surface Image + Progress Bar */}
          <div className="flex flex-col items-center">
            <img
              src={require("../../../Assets/Images/HomePage/surface.png")}
              className="w-[267px] h-[186px] md:w-[267px] md:h-[186px]"
              alt="Surface"
            />
            <div className="w-full mt-2 bg-gray-200 rounded-full border-2 border-blue-500 p-1">
              <div
                style={{
                  width: `${surfaceProgress}%`,
                  height: "12px",
                  backgroundColor: "#3B82F6", // Blue
                  borderRadius: "50px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex mt-12 items-center">
          <button
            className="px-4 py-2 transition font-[Nunito] mt-5 w-[268px] h-[84.7px] md:ml-52"
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
            Start
          </button>
        </div>
      </main>

      {/* popup */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          {/* Popup Container */}
          <div className="popup bg-white p-8 shadow-lg relative w-104 text-start">
            <p
              className="text-lg font-semibold font-[Nunito]"
              style={{ color: Colors.Black }}
            >
              Hi there, Welcome to Lexigo.
              <br />
              <Link
                to="/quiz"
                className="font-[Nunito]"
                style={{ color: Colors.Primary }}
              >
                Take the quiz
              </Link>{" "}
              if you have not 😁
            </p>

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

export default Home;
