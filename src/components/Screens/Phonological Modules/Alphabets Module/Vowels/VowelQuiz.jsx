import { ChevronLeft, ChevronRight, Menu, Pause, X } from "lucide-react";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "Which letter makes the Aa sound?",
  },
  {
    question: "Which letter makes the Aa sound?",
  },
];

const VowelQuiz = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Background-Quiz-Text.png")})`,
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
          <div className="w-full flex items-center flex-col">
            {/* Progress Bar with Segments */}
            <div className="w-full max-w-md flex justify-center mb-6">
              {Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className={`w-1/6 h-[10px] mx-1 rounded-lg`}
                  style={{
                    backgroundColor:
                      index <= currentQuestion
                        ? Colors.Pompelmo
                        : Colors.Bisque,
                  }}
                />
              ))}
            </div>
            {/* progress */}
            <p
              className="text-center mb-6 text-lg font-semibold font-[Nunito]"
              style={{ color: Colors.Black }}
            >
              {currentQuestion + 1} / {questions.length}
            </p>
            {/* Question */}
            <h2
              className="text-xl font-normal font-[Nunito] text-center mb-6"
              style={{ color: Colors.Black }}
            >
              {/* {questions[currentQuestion].question} */}
              Which letter makes the{" "}
              <b style={{ color: Colors.Pompelmo }} className="text-[32px]">
                Aa
              </b>{" "}
              sound?
            </h2>
            <div className="w-full flex justify-between px-32">
              <button>
                <img
                  src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 1.png")}
                  className="option-btn w-[162px] h-[154px]"
                />
              </button>
              <button>
                <img
                  src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 2.png")}
                  className="option-btn w-[162px] h-[154px]"
                />
              </button>
              <button>
                <img
                  src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 3.png")}
                  className="option-btn w-[162px] h-[154px]"
                />
              </button>
            </div>
          </div>
          <button onClick={() => navigate("#")}>
            <ChevronRight
              className="right w-[125px] h-[125px]"
              style={{ color: Colors.Black }}
            />
          </button>
        </div>
        {/* play */}
        <div className="play flex justify-between items-center mt-10 px-24">
          <button
            className={`px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold`}
            style={{
              borderRadius: 20,
              backgroundColor: Colors.Pompelmo,
              opacity: 0,
            }}
            onClick={() => {}}
          >
            Submit
          </button>
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

          <button
            className={`px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold`}
            style={{
              borderRadius: 20,
              backgroundColor: Colors.Pompelmo,
            }}
            onClick={() => {}}
          >
            Submit
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
          <div
            className="popup bg-white p-8 shadow-lg relative w-104 text-start"
            style={{
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 10,
            }}
          >
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/star.png")}
              alt="Star"
              className="w-[104px] h-[104px]"
              style={{
                justifySelf: "center",
              }}
            />
            <p
              className="text-lg font-semibold font-[Nunito]"
              style={{ color: Colors.Black }}
            >
              Well done young scholar, you have <br /> finished your very first
              lesson. Its time to <br /> find out what you know. Lets go!!! 😁
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

export default VowelQuiz;
