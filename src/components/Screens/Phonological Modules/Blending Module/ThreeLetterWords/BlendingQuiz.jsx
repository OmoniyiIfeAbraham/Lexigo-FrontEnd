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
const BlendingQuiz = () => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
          {currentQuestion > 0 ? (
            <button onClick={handlePrevious}>
              <ChevronLeft
                className="left w-[125px] h-[125px]"
                style={{ color: Colors.Black }}
              />
            </button>
          ) : (
            <ChevronLeft
              className="left w-[125px] h-[125px]"
              style={{ color: Colors.Grey }}
            />
          )}
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
          <button onClick={handleNext}>
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
            onClick={() => {
              setShowResult(true);
            }}
            disabled={currentQuestion < 1}
          >
            Submit
          </button>
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          {/* popup container */}
          <div
            className="successPopup p-6 shadow-lg relative w-[591px] text-start flex flex-col items-center"
            style={{ backgroundColor: Colors.Cream }}
          >
            {/* X Button positioned halfway out */}
            <button
              className="navBtn w-[75px] h-[75px] flex justify-center items-center absolute -top-8 -left-8"
              style={{ backgroundColor: Colors.Pompelmo, borderRadius: "50%" }}
              onClick={() => {
                setShowResult(false);
              }}
            >
              <X size={46} color={Colors.White} className="icon" />
            </button>

            <img
              src={require("./../../../../../Assets/Images/AssesmentPage/success.png")}
              alt="success"
              className="w-[416px] h-[60px] my-3"
            />
            <img
              src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
              alt="Owl"
              className="w-[143px] h-[143px] my-3"
            />
            <p
              className="successTitle text-[36px] font-[Nunito] my-1"
              style={{ color: Colors.green, fontWeight: "bolder" }}
            >
              Yay Passed!
            </p>
            {/* buttons */}
            <div className="flex justify-center items-center w-[100%] h-[100px]">
              <button
                className="px-4 py-2 transition font-[Nunito] w-[176.25px] h-[74.25px]"
                style={{
                  color: Colors.White,
                  backgroundColor: Colors.Pompelmo,
                  fontWeight: "bold",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: Colors.Pompelmo,
                }}
                onClick={() => setShowResult(false)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlendingQuiz;
