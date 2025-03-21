import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import "./VowelAStyle.css";

const VowelA = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div
      style={{
        backgroundImage: `url(${require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Background-Text.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100vh", // Ensures full width while keeping height proportional
        backgroundPosition: "top center", // Aligns image to the top
      }}
      className="w-full min-h-screen relative"
    >
      <div className="content relative z-10 h-full">
        {/* header */}
        <div className="header flex w-full h-[75px] items-center justify-between px-[110px] pt-24">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.BeastyBrown2 }}
            onClick={() => {
              navigate("/phonological-path/alphabet");
            }}
          >
            <X size={46} color={Colors.White} className="icon" />
          </button>
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Pompelmo }}
            onClick={() => {}}
          >
            <Menu size={46} color={Colors.White} className="icon" />
          </button>
        </div>
        {/* body */}
        <div className="body flex w-full justify-between items-center mt-10">
          <ChevronLeft
            className="left w-[125px] h-[125px]"
            style={{ color: Colors.Grey }}
          />
          <div className="letter-group flex justify-between items-center">
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Aa.png")}
              className="letter w-[374px] h-[263px] mr-10"
            />
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Apple.png")}
              className="object w-[286px] h-[313px]"
            />
          </div>
          <button>
            <ChevronRight
              className="right w-[125px] h-[125px]"
              style={{ color: Colors.Black }}
            />
          </button>
        </div>
        {/* play */}
        <div className="play flex justify-center items-center mt-10">
          <button>
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Play.png")}
              className="play-btn w-[138px] h-[138px]"
            />
          </button>
        </div>
      </div>

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
              Welcome to the vowel lesson little one <br /> Learn the sounds of
              the 5 vowel letters <br /> Play to hear the sounds <br /> Follow
              along and do the quiz 😁
            </p>

            {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
              alt="Owl"
              className="absolute -bottom-12 -left-20 w-20 h-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VowelA;
