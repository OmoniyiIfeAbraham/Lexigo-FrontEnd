import React, { useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { useNavigate } from "react-router-dom";
import "./QuizStyle.css";
import { Colors } from "../../Utils/Colors";

const questions = [
  {
    question: "Which word starts with the same sound as ‘Dog’?",
    options: ["Bat", "Duck", "Cat"],
  },
  {
    question: "What word do these sounds make? /c/ /a/ /t/",
    options: ["Cat", "Bat", "Car"],
  },
  {
    question: "Which word rhymes with ‘Hat’?",
    options: ["Mat", "Dog", "Sun"],
  },
  {
    question: "Which letter is different?",
    options: ["b", "d", "b"],
  },
  {
    question: "Which word looks like ‘Mop’?",
    options: ["Mop", "Pop", "Cop"],
  },
  {
    question: "Which one has the letter ‘p’?",
    options: ["Pan", "Ban", "Man"],
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
          {/* heading */}
          <h1
            className="font-[Nunito] font-bold text-[30px] my-6"
            style={{ color: Colors.Black }}
          >
            Assessment Test
          </h1>
          {/* Progress Bar with 6 Segments */}
          <div className="w-full max-w-md flex justify-between mb-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className={`w-1/6 h-[10px] mx-1 rounded-lg`}
                style={{
                  backgroundColor:
                    index <= currentQuestion ? Colors.Secondary : Colors.Bisque,
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
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="w-full max-w-md flex flex-col gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`px-6 py-2 w-full text-lg border-2 flex flex-row items-center`}
                style={{
                  borderRadius: 32,
                  backgroundColor: Colors.Cream,
                  borderColor:
                    selectedOption === index ? Colors.Orange : Colors.Bisque,
                }}
                onClick={() => setSelectedOption(index)}
              >
                <p
                  key={index}
                  className="px-3 py-1 mr-5 font-[Nunito] font-bold"
                  style={{
                    backgroundColor:
                      selectedOption === index ? Colors.Orange : Colors.Bisque,
                    borderRadius: 100,
                    color: Colors.Black,
                  }}
                >
                  {String.fromCharCode(97 + index).toUpperCase()}
                </p>
                <p
                  className="font-[Nunito] font-bold"
                  style={{ color: Colors.Black }}
                >
                  {option}
                </p>
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
