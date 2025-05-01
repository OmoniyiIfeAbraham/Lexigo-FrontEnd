import React, { useEffect, useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import { useNavigate } from "react-router-dom";
import "./QuizStyle.css";
import { Colors } from "../../Utils/Colors";
import { ChevronLeft, RotateCw } from "lucide-react";
import Swal from "sweetalert2";
import { BaseUrl } from "../../Config/Config";
import axios from "axios";
import Notify from "../../Notification/Notify";

const questions = [
  {
    question: "Which word starts with the same sound as ‘Dog’?",
    options: ["Bat", "Duck", "Cat"],
    correct: "Duck",
  },
  {
    question: "What word do these sounds make? /c/ /a/ /t/",
    options: ["Cat", "Bat", "Car"],
    correct: "Cat",
  },
  {
    question: "Which word rhymes with ‘Hat’?",
    options: ["Mat", "Dog", "Sun"],
    correct: "Mat",
  },
  {
    question: "Which letter is different?",
    options: ["b", "d", "b"],
    correct: "d",
  },
  {
    question: "Which word looks like ‘Mop’?",
    options: ["Mop", "Pop", "Cop"],
    correct: "Mop",
  },
  {
    question: "Which one has the letter ‘p’?",
    options: ["Pan", "Ban", "Man"],
    correct: "Pan",
  },
];

const Quiz = () => {
  const [takenQuiz, setTakenQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  const [phonologicalScore, setPhonologicalScore] = useState(0);
  const [surfaceScore, setSurfaceScore] = useState(0);

  const navigate = useNavigate();

  const handleCancel = () => {
    setTakenQuiz(null);
    navigate("/home", { state: { pass: true } });
  };

  const handleNext = async () => {
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    const selectedIndex = selectedOptions[currentQuestion];
    const selectedAnswer = questions[currentQuestion]?.options[selectedIndex];
    const correctAnswer = questions[currentQuestion].correct;

    let newScore = score;
    let newPscore = phonologicalScore;
    let newSscore = surfaceScore;

    if (selectedAnswer === correctAnswer) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;

      if (currentQuestion < 3) {
        newPscore += 1;
      } else {
        newSscore += 1;
      }

      setScore(newScore);
      setPhonologicalScore(newPscore);
      setSurfaceScore(newSscore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      await axios.get(
        `${BaseUrl}/api/test/type/progress/add?level=${currentQuestion}&score=${newScore}&Pscore=${newPscore}&Sscore=${newSscore}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${parsedData.Auth}`,
          },
        }
      );
      console.log("Progress saved");
    } catch (err) {
      console.error("Progress error", err);
      const errorMessage =
        err.response?.data?.Error || err.message || "An error occurred.";
      Notify({
        title: "Error",
        message: errorMessage,
        Type: "danger",
      });
    }

    // Go to next question only after request completes
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (index) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = index; // Store selected option for current question
    setSelectedOptions(updatedSelections);
  };

  const StartQuiz = async () => {
    Swal.fire({
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif",
      imageHeight: 50,
      showCloseButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    try {
      const Data = await localStorage.getItem("Profile");
      const parsedData = JSON.parse(Data);

      // console.log(`Bearer ${parsedData.Auth}`);

      let url = `${BaseUrl}/api/test/type/start`;

      let response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${parsedData.Auth}`,
          },
        }
      );

      if (response.data.Error === false) {
        console.log("initial: ", response.data);
        setCurrentQuestion(
          response.data.Data.Progress == 0 || response.data.Data.Progress == 5
            ? response.data.Data.Progress
            : response.data.Data.Progress + 1
        );
        setScore(response.data.Data.Score);
        setPhonologicalScore(response.data.Data.PhonologicalScore);
        setSurfaceScore(response.data.Data.SurfaceScore);
        setTakenQuiz(response.data.Data.Completed);
      } else {
        Notify({
          title: "Error",
          message: response.data.Error,
          Type: "danger",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.Error || error.message || "An error occurred.";
      Notify({
        title: "Error",
        message: errorMessage,
        Type: "danger",
      });
    } finally {
      Swal.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    StartQuiz();
  }, []);

  const handleSubmit = async () => {
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    const selectedIndex = selectedOptions[currentQuestion];
    const selectedAnswer = questions[currentQuestion]?.options[selectedIndex];
    const correctAnswer = questions[currentQuestion].correct;

    let finalScore = score;

    // Evaluate current question
    let isCorrect = false;
    if (selectedAnswer === correctAnswer) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      finalScore += 1;
      setScore(finalScore); // Update score state
      isCorrect = true;
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    // Increment scores based on only the current question
    let newPScore = phonologicalScore;
    let newSScore = surfaceScore;

    if (isCorrect) {
      if (currentQuestion < 3) {
        newPScore += 1;
        setPhonologicalScore(newPScore);
      } else {
        newSScore += 1;
        setSurfaceScore(newSScore);
      }
    }

    // Determine type based on LOWEST score
    let dyslexiaType = "";
    if (newPScore < newSScore) dyslexiaType = "Phonological Dyslexia";
    else if (newSScore < newPScore) dyslexiaType = "Surface Dyslexia";
    else if (newPScore === newSScore && newPScore < 3)
      dyslexiaType = "Mixed Dyslexia";
    else if (newPScore === newSScore) dyslexiaType = "None";

    // Save updated progress
    try {
      await axios.get(
        `${BaseUrl}/api/test/type/progress/add?level=${currentQuestion}&score=${finalScore}&Pscore=${newPScore}&Sscore=${newSScore}&result=${encodeURIComponent(
          dyslexiaType
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${parsedData.Auth}`,
          },
        }
      );
      console.log("Final progress saved");
    } catch (err) {
      console.error("Submit progress error", err);
      const errorMessage =
        err.response?.data?.Error || err.message || "An error occurred.";
      Notify({
        title: "Error",
        message: errorMessage,
        Type: "danger",
      });
    }

    setResult(dyslexiaType);

    console.log("Phonological Score:", newPScore);
    console.log("Surface Score:", newSScore);
    console.log("Final Total Score:", newPScore + newSScore);
    console.log("Detected Dyslexia Type:", dyslexiaType);

    setShowResult(true);
  };

  console.log(score);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex relative">
      <Sidebar takenQuiz={takenQuiz} />
      <main className="flex-1 p-6" style={{ backgroundColor: Colors.White }}>
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
            {questions[currentQuestion]?.question}
          </h2>

          {/* Options */}
          <div className="w-full max-w-md flex flex-col gap-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                className={`px-6 py-2 w-full text-lg border-2 flex flex-row items-center`}
                style={{
                  borderRadius: 32,
                  backgroundColor: Colors.Cream,
                  borderColor:
                    selectedOptions[currentQuestion] === index
                      ? Colors.Orange
                      : Colors.Bisque,
                }}
                onClick={() => handleOptionSelect(index)}
              >
                <p
                  key={index}
                  className="px-3 py-1 mr-5 font-[Nunito] font-bold"
                  style={{
                    backgroundColor:
                      selectedOptions[currentQuestion] === index
                        ? Colors.Orange
                        : Colors.Bisque,
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
        </div>
        {/* controls */}
        <div className="w-[100%] flex flex-row justify-between items-center mt-6">
          {/* previous */}
          {currentQuestion <= 0 ? (
            <button>
              <img
                src={require("./../../../Assets/Images/AssesmentPage/back-inactive.png")}
                className="w-20 h-20"
              />
            </button>
          ) : (
            <button onClick={handlePrevious}>
              <img
                src={require("./../../../Assets/Images/AssesmentPage/back-active.png")}
                className="w-20 h-20"
              />
            </button>
          )}
          {/* next */}
          {selectedOptions !== null && currentQuestion < 5 ? (
            <button onClick={handleNext}>
              <img
                src={require("./../../../Assets/Images/AssesmentPage/front.png")}
                className="w-20 h-20"
              />
            </button>
          ) : currentQuestion === 5 ? (
            <button
              className={`mt-6 px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold`}
              style={{
                borderRadius: 40,
                backgroundColor: Colors.Secondary,
                opacity: selectedOptions === null ? 0.5 : 1,
              }}
              disabled={selectedOptions === null}
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : null}
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
                // onClick={() => StartQuiz()}
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

      {showResult && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          {/* popup container */}
          <div
            className="successPopup p-6 shadow-lg relative w-[591px] text-start flex flex-col items-center"
            style={{ backgroundColor: Colors.Cream }}
          >
            <img
              src={require("./../../../Assets/Images/AssesmentPage/success.png")}
              alt="success"
              className="w-[416px] h-[60px] my-3"
            />
            <img
              src={require("./../../../Assets/Images/HomePage/Lexigo dog 2.png")}
              alt="Dog"
              className="w-20 h-20 my-3"
            />
            <p
              className="successTitle text-[24px] font-[Nunito] my-1"
              style={{ color: Colors.RoastedCoffee }}
            >
              What you got
            </p>
            <div
              className="score w-[60%] h-[86px] flex justify-center items-center my-1"
              style={{ backgroundColor: Colors.BeastyBrown }}
            >
              <p
                className="score-text text-[32px] font-[Nunito]"
                style={{ color: Colors.BeastyBrown2 }}
              >
                Score: {score} / 6
              </p>
            </div>
            <p
              className="percentage text-[36px] font-[Nunito] my-3"
              style={{ color: Colors.BeastyBrown2 }}
            >
              {(score / 6) * 100}%
            </p>
            <p
              className="percentage text-[20px] font-[Nunito]"
              style={{ color: Colors.BeastyBrown2 }}
            >
              {result}
            </p>
            {/* buttons */}
            <div className="flex justify-between items-center w-[100%] h-[100px]">
              <button
                className="navBtn w-[75px] h-[75px] flex justify-center items-center"
                style={{ backgroundColor: Colors.Pompelmo }}
                onClick={() => setShowResult(false)}
              >
                <ChevronLeft size={46} color={Colors.White} />
              </button>
              <button
                className="px-4 py-2 transition font-[Nunito] w-[176.25px] h-[74.25px]"
                style={{
                  color: Colors.White,
                  backgroundColor: Colors.Primary,
                  fontWeight: "bold",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: Colors.Primary,
                }}
                onClick={() => setShowResult(false)}
              >
                Results
              </button>
              <button
                className="navBtn w-[75px] h-[75px] flex justify-center items-center"
                style={{ backgroundColor: Colors.Pompelmo }}
                onClick={() => setShowResult(false)}
              >
                <RotateCw size={46} color={Colors.White} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
