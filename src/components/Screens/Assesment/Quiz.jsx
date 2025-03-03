import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { useNavigate } from "react-router-dom";
import "./QuizStyle.css";
import { Colors } from "../../Utils/Colors";

const questions = [
  {
    question: "Which word starts with the same sound as ‘dog’?",
    options: ["bat", "duck", "cat"],
  },
  {
    question: "What word do these sounds make? /c/ /a/ /t/",
    options: ["cat", "bat", "car"],
  },
  {
    question: "Which word rhymes with ‘hat’?",
    options: ["mat", "dog", "sun"],
  },
  {
    question: "Which letter is different?",
    options: ["b", "d", "b"],
  },
  {
    question: "Which word looks like ‘mop’?",
    options: ["mop", "pop", "cop"],
  },
  {
    question: "Which one has the letter ‘p’?",
    options: ["pan", "ban", "man"],
  },
];

const Quiz = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleCancel = () => {
    setTakenQuiz(null);
    navigate("/home", { state: { pass: true } });
  };

  const handleNext = () => {
    if (selectedOption !== null && currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null); // Reset selection for next question
    }
  };

  return (
    <div className="flex relative">
      <Sidebar takenQuiz={takenQuiz} />
      <main className="flex-1 p-6">
        <div className="flex flex-col items-center p-6">
          {/* Progress Bar with 6 Segments */}
          <div className="w-full max-w-md flex justify-between mb-4">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className={`w-1/6 h-4 mx-1 rounded-lg ${
                  index <= currentQuestion ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-center mb-4">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="w-full max-w-md flex flex-col gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`px-6 py-3 w-full text-lg rounded-md border-2 ${
                  selectedOption === index
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-400"
                }`}
                onClick={() => setSelectedOption(index)}
              >
                {String.fromCharCode(97 + index).toUpperCase()}. {option}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            className={`mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-md ${
              selectedOption === null ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedOption === null}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
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
                onClick={() => setTakenQuiz(true)}
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
