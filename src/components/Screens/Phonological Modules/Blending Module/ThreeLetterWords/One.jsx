import { ChevronLeft, ChevronRight, Menu, Pause, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import "./OneStyle.css";

const One = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Function to play audio
  const playSound = () => {
    setPlaying(true);
    const audio = new Audio(
      require("./../../../../../Assets/Audio/Vowels/A.mp3")
    );
    audio.play();
    setTimeout(() => {
      setPlaying(false);
    }, 1500);
  };

  return (
    <div className="w-full relative wrapper">
      {/* Full-screen background image div */}
      <div className="absolute inset-0 z-0">
        <img
          src={require("./../../../../../Assets/Images/Phonological/Blending Module/Background-1.png")}
          alt="Background"
          className="w-full h-full object-fit"
        />
      </div>
      <div className="content relative z-10 h-full">
        {/* header */}
        <div className="header flex w-full h-[75px] items-center justify-between">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.BeastyBrown2 }}
            onClick={() => {
              navigate("/phonological-path/blending");
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
        <div className="body flex w-full justify-between items-center">
          <ChevronLeft
            className="left w-[125px] h-[125px]"
            style={{ color: Colors.Grey }}
          />
          <div>
            <div className="option-btn-group w-full flex justify-between px-32 items-center">
              <img
                src={require("./../../../../../Assets/Images/Phonological/Blending Module/c.png")}
                className="option-btn w-[122px] h-[116px]"
              />

              <Plus className="w-[50px] h-[50px] mx-5" />

              <img
                src={require("./../../../../../Assets/Images/Phonological/Blending Module/a.png")}
                className="option-btn w-[122px] h-[116px]"
              />

              <Plus className="w-[50px] h-[50px] mx-5" />

              <img
                src={require("./../../../../../Assets/Images/Phonological/Blending Module/t.png")}
                className="option-btn w-[122px] h-[116px]"
              />
            </div>
            <div className="letter-group flex justify-center items-center">
              <img
                src={require("./../../../../../Assets/Images/Phonological/Blending Module/cat.png")}
                className="letter w-[94px] h-[66px] mr-10"
              />
              <img
                src={require("./../../../../../Assets/Images/Phonological/Blending Module/Cat 1.png")}
                className="object w-[107px] h-[118px]"
              />
            </div>
          </div>
          <button onClick={() => navigate("/phonological-path/blending/quiz")}>
            <ChevronRight
              className="right w-[125px] h-[125px]"
              style={{ color: Colors.Black }}
            />
          </button>
        </div>
        {/* play */}
        <div className="play flex justify-center items-center">
          {playing ? (
            <div
              className="play-btn w-[138px] h-[138px] flex justify-center items-center"
              style={{ backgroundColor: Colors.Bisque, borderRadius: 100 }}
            >
              <Pause
                style={{
                  width: "50%",
                  height: "50%",
                  color: Colors.BeastyBrown2,
                }}
              />
            </div>
          ) : (
            <button onClick={playSound}>
              <img
                src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Play.png")}
                className="play-btn w-[138px] h-[138px]"
              />
            </button>
          )}
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
              Hi there, now lets practice joining 3 letter <br /> words. <br />{" "}
              Play to hear the sounds <br /> Follow along and do the quiz 😁
            </p>

            {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
            <img
              src={require("./../../../../../Assets/Images/Phonological/Blending Module/Cat 2.png")}
              alt="Cat"
              className="absolute -bottom-12 -left-20 w-20 h-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default One;
