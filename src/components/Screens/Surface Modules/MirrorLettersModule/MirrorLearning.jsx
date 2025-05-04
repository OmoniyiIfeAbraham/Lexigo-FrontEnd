import { ChevronLeft, ChevronRight, Menu, Pause, X } from "lucide-react";
import React, { useState } from "react";
import { Colors } from "../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import "./MirrorLearningStyle.css";

const MirrorLearning = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [selectP, setSelectP] = useState(false);
  const [selectQ, setSelectQ] = useState(false);

  // Function to play audio
  const playSound = () => {
    setPlaying(true);
    const audio = new Audio(require("./../../../../Assets/Audio/Vowels/A.mp3"));
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
          src={require("./../../../../Assets/Images/Surface/Mirror Letters/Background.png")}
          alt="Background"
          className="w-full h-full object-fit"
        />
      </div>
      <div className="content relative z-10 h-full">
        {/* header */}
        <div className="header flex w-full h-[75px] items-center justify-between px-[110px] pt-24">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.BeastyBrown2 }}
            onClick={() => {
              navigate("/surface-path/mirror");
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
          <div className="letter-group-r flex justify-between items-center w-[50%]">
            <button
              onClick={() => {
                setSelectP(!selectP);
                setSelectQ(false);
              }}
            >
              <img
                src={
                  selectP
                    ? require("./../../../../Assets/Images/Surface/Mirror Letters/p.png")
                    : require("./../../../../Assets/Images/Surface/Mirror Letters/p-r.png")
                }
                className={"letter w-[175px] h-[262px]"}
                style={selectP ? { zIndex: 10 } : null}
              />
            </button>
            <button
              onClick={() => {
                setSelectQ(!selectQ);
                setSelectP(false);
              }}
            >
              <img
                src={
                  selectQ
                    ? require("./../../../../Assets/Images/Surface/Mirror Letters/q.png")
                    : require("./../../../../Assets/Images/Surface/Mirror Letters/q-r.png")
                }
                className="object w-[175px] h-[262px]"
              />
            </button>
          </div>
          <button onClick={() => navigate("/surface-path/mr/quiz")}>
            <ChevronRight
              className="right w-[125px] h-[125px]"
              style={{ color: Colors.Black }}
            />
          </button>
        </div>
        {/* play */}
        <div className="play flex justify-center items-center mt-10">
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
                src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Play.png")}
                className="play-btn w-[138px] h-[138px]"
              />
            </button>
          )}
        </div>
      </div>

      {/* select popup */}
      {(selectP || selectQ) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-9">
          {/* Popup Container */}
          {selectP && (
            <div
              className="absolute bg-white p-8 shadow-lg w-104 text-start bottom-20 left-40 z-15"
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <p
                className="text-lg font-semibold font-[Nunito]"
                style={{ color: Colors.Black }}
              >
                p goes this way
              </p>

              {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
              <img
                src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
                alt="Owl"
                className="absolute -bottom-12 -left-20 w-20 h-20"
              />
            </div>
          )}

          {selectQ && (
            <div
              className="absolute bg-white p-8 shadow-lg w-104 text-start bottom-20 right-40 z-15"
              style={{
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <p
                className="text-lg font-semibold font-[Nunito]"
                style={{ color: Colors.Black }}
              >
                q goes this way
              </p>

              {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
              <img
                src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
                alt="Owl"
                className="absolute -bottom-12 -right-20 w-20 h-20"
              />
            </div>
          )}
        </div>
      )}

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
              Welcome to the first lesson😁 <br /> Get ready to learn the
              difference <br />
              between p and q
            </p>

            {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
            <img
              src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
              alt="Owl"
              className="absolute -bottom-12 -left-20 w-20 h-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MirrorLearning;
