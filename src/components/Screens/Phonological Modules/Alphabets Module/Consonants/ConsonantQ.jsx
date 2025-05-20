import { ChevronLeft, ChevronRight, Menu, Pause, X } from "lucide-react";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import "./ConsonantBStyle.css";

const ConsonantQ = () => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  // Function to play audio
  const playSound = () => {
    setPlaying(true);
    const audio = new Audio(
      require("./../../../../../Assets/Audio/Consonants/Q.mp3")
    );
    audio.play();
    setTimeout(() => {
      setPlaying(false);
    }, 4000);
  };

  return (
    <div className="w-full relative wrapper">
      {/* Full-screen background image div */}
      <div className="absolute inset-0 z-0">
        <img
          src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Background-Text.png")}
          alt="Background"
          className="w-full h-full object-fit"
        />
      </div>

      <div className="content relative z-10 h-full">
        {/* header */}
        <div className="header flex w-full h-[75px] items-center justify-between">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center disabled:opacity-50"
            style={{ backgroundColor: Colors.BeastyBrown2 }}
            onClick={() => {
              navigate("/phonological-path/alphabet");
            }}
            disabled={playing}
          >
            <X size={46} color={Colors.White} className="icon" />
          </button>
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Pompelmo, opacity: 0 }}
            onClick={() => {}}
            disabled
          >
            <Menu size={46} color={Colors.White} className="icon" />
          </button>
        </div>
        {/* body */}
        <div className="body flex w-full justify-between items-center">
          <button
            onClick={() => navigate("/phonological-path/bd/consonantP")}
            disabled={playing}
            className="disabled:opacity-50"
          >
            <ChevronLeft
              className="left w-[125px] h-[125px]"
              style={{ color: Colors.Black }}
            />
          </button>
          <div className="letter-group flex justify-between items-center">
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Consonants/Qq.png")}
              className="letter w-[374px] h-[263px] mr-10"
              alt=""
            />
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Consonants/18.png")}
              className="object w-[286px] h-[313px]"
              alt=""
            />
          </div>
          <button
            onClick={() => navigate("/phonological-path/bd/consonantR")}
            disabled={playing}
            className="disabled:opacity-50"
          >
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
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsonantQ;
