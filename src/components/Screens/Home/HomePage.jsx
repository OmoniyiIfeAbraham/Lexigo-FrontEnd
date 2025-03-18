import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../Utils/Colors";
import "./HomePageStyle.css";

const Home = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const [type, setType] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  // State for progress bars
  const [phonologicalProgress, setPhonologicalProgress] = useState(10);
  const [surfaceProgress, setSurfaceProgress] = useState(0);
  const [selectedPhonological, setSelectedPhonological] = useState(false);
  const [selectedSurface, setSelectedSurface] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let pass = location.state?.pass;
  console.log("pass: ", pass);

  const handlePhonologicalChange = () => {
    setSelectedPhonological(!selectedPhonological);
    setSelectedSurface(false);
  };
  const handleSurfaceChange = () => {
    setSelectedSurface(!selectedSurface);
    setSelectedPhonological(false);
  };

  const handleStart = () => {
    if (selectedPhonological) {
      navigate("/phonological-path");
    } else if (selectedSurface) {
      navigate("/surface-path");
    } else {
    }
  };
  return (
    <div className="flex">
      {!pass ? <Sidebar takenQuiz={takenQuiz} /> : <Sidebar />}
      <main className="flex-1 p-6" style={{ backgroundColor: Colors.White }}>
        {/* Title & Description */}
        <div className="md:ml-10 ml-14">
          <h1 className="font-[Nunito] font-bold text-2xl text-black">
            Learning Paths
          </h1>
          <p className="font-[Nunito] text-lg text-black">
            Select your type then begin to learn and play
          </p>
        </div>

        {/* Images & Progress Bars */}
        <div className="content flex flex-col md:flex-row gap-6 mt-14 items-center ml-10">
          {/* Phonological Image + Progress Bar */}
          <div className="img-main flex flex-col items-center md:mr-14">
            <button onClick={() => handlePhonologicalChange()}>
              {type === "Phonological Dyslexia" ? (
                <img
                  src={
                    selectedPhonological
                      ? require("../../../Assets/Images/HomePage/phonological type.png")
                      : require("../../../Assets/Images/HomePage/phonological n type.png")
                  }
                  className="img w-[100%] md:w-[347px] md:h-[226px]"
                  alt="Phonological"
                />
              ) : (
                <img
                  src={
                    selectedPhonological
                      ? require("../../../Assets/Images/HomePage/phonological selected.png")
                      : require("../../../Assets/Images/HomePage/phonological.png")
                  }
                  className="img w-[100%] md:w-[347px] md:h-[226px]"
                  alt="Phonological"
                />
              )}
            </button>
            <div
              className="w-full mt-2 rounded-full"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: Colors.Secondary,
                backgroundColor: Colors.Bisque,
              }}
            >
              <div
                style={{
                  width: `${phonologicalProgress}%`,
                  height: "21px",
                  backgroundColor: Colors.Secondary, // Blue
                  borderRadius: "50px",
                }}
              />
            </div>
          </div>

          {/* Surface Image + Progress Bar */}
          <div className="img-main flex flex-col items-center">
            <button onClick={() => handleSurfaceChange()}>
              {type === "Surface Dyslexia" ? (
                <img
                  src={
                    selectedSurface
                      ? require("../../../Assets/Images/HomePage/surface selected type.png")
                      : require("../../../Assets/Images/HomePage/surface type.png")
                  }
                  className="img w-[100%] md:w-[347px] md:h-[226px]"
                  alt="Surface"
                />
              ) : (
                <img
                  src={
                    selectedSurface
                      ? require("../../../Assets/Images/HomePage/surface selected.png")
                      : require("../../../Assets/Images/HomePage/surface.png")
                  }
                  className="img w-[100%] md:w-[347px] md:h-[226px]"
                  alt="Surface"
                />
              )}
            </button>
            <div
              className="w-full mt-2 rounded-full"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: Colors.Secondary,
                backgroundColor: Colors.Bisque,
              }}
            >
              <div
                style={{
                  width: `${surfaceProgress}%`,
                  height: "21px",
                  backgroundColor: Colors.Secondary,
                  borderRadius: "50px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="btn-main flex md:mt-12 items-center">
          <button
            className="btn px-4 py-2 transition font-[Nunito] mt-5 w-[268px] h-[84.7px] md:ml-72"
            style={{
              color: Colors.White,
              backgroundColor: Colors.Pink60,
              fontWeight: "bold",
              borderRadius: 16.7,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: Colors.Pink60,
            }}
            onClick={handleStart}
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
