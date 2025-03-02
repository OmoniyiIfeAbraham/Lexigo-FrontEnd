import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { Link, useLocation } from "react-router-dom";
import { Colors } from "../../Utils/Colors";

const Home = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const [type, setType] = useState("");
  const [showPopup, setShowPopup] = useState(true);
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
          <h1
            className="font-[Nunito] font-bold"
            style={{ fontSize: 24, color: Colors.Black }}
          >
            Learning Paths
          </h1>
          <p
            className="font-[Nunito]"
            style={{ fontSize: 16, fontWeight: "normal", color: Colors.Black }}
          >
            Select your type then begin to learn and play
          </p>
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
