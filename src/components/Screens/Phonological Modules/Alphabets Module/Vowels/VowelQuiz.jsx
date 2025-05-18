import { ChevronLeft, ChevronRight, Menu, Pause, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BaseUrl } from "../../../../Config/Config";
import axios from "axios";
import Notify from "../../../../Notification/Notify";

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
  const [showResult, setShowResult] = useState(false);
  const [selectedA, setSelectedA] = useState(false);
  const [selectedE, setSelectedE] = useState(false);
  const [selectedO, setSelectedO] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [btnTempDisabled, setBtnTempDisabled] = useState(false);

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

  const handleNext = async () => {
    setBtnTempDisabled(true);
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    let newScore = score;

    if (
      (currentQuestion === 0 && selectedA) ||
      (currentQuestion === 1 && selectedO)
    ) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;

      setScore(newScore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      await axios.get(
        `${BaseUrl}/api/phonological/quiz/alphabets/vowel/progress/add?level=${currentQuestion}&score=${newScore}`,
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
    } finally {
      setBtnTempDisabled(false);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
    setSelectedA(false);
    setSelectedE(false);
    setSelectedO(false);
  };

  const handleSubmit = async () => {
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    let newScore = 0;

    if (
      (currentQuestion === 0 && selectedA) ||
      (currentQuestion === 1 && selectedO)
    ) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;
      setScore(newScore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      const response = await axios.get(
        `${BaseUrl}/api/phonological/quiz/alphabets/vowel/progress/add?level=${currentQuestion}&score=${newScore}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${parsedData.Auth}`,
          },
        }
      );
      console.log("Final Progress Saved");
      setFinalScore(response.data.Data.Score);

      // Swal.fire({
      //   icon: "success",
      //   title: "Quiz Completed!",
      //   text: `You scored ${newScore} / ${questions.length}`,
      // });

      // navigate("/phonological-path/alphabet"); // or go to results page
      setShowResult(true);
    } catch (err) {
      console.error("Final Progress Error", err);
      const errorMessage =
        err.response?.data?.Error || err.message || "An error occurred.";
      Notify({
        title: "Error",
        message: errorMessage,
        Type: "danger",
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
    setSelectedA(false);
    setSelectedE(false);
    setSelectedO(false);
    setScore(0);
  };

  console.log(currentQuestion);

  const handleAChange = () => {
    setSelectedA(!selectedA);
    setSelectedE(false);
    setSelectedO(false);
  };

  const handleEChange = () => {
    setSelectedE(!selectedE);
    setSelectedA(false);
    setSelectedO(false);
  };

  const handleOChange = () => {
    setSelectedO(!selectedO);
    setSelectedE(false);
    setSelectedA(false);
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

      let url = `${BaseUrl}/api/phonological/quiz/alphabets/vowel/quiz/start`;

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
        setCurrentQuestion(response.data.Data.Progress);
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
      if (
        errorMessage === "Unauthorized, please log in again" ||
        errorMessage === "Invalid or expired token"
      ) {
        navigate("/auth/signin");
      }
    } finally {
      Swal.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    StartQuiz();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full wrapper">
      <div className="absolute inset-0 z-0">
        <img
          src={require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Background-Quiz-Text.png")}
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
              navigate("/phonological-path/alphabet");
            }}
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
                  className={`bar w-1/6 h-[10px] mx-1 rounded-lg`}
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
            {currentQuestion === 0 ? (
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
            ) : (
              <h2
                className="text-xl font-normal font-[Nunito] text-center mb-6"
                style={{ color: Colors.Black }}
              >
                {/* {questions[currentQuestion].question} */}
                Which letter makes the{" "}
                <b style={{ color: Colors.Pompelmo }} className="text-[32px]">
                  Oo
                </b>{" "}
                sound?
              </h2>
            )}
            <div className="options w-full flex justify-between px-32">
              <button onClick={handleAChange}>
                <img
                  src={
                    selectedA
                      ? require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 1-S.png")
                      : require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 1.png")
                  }
                  className="option-btn w-[162px] h-[154px]"
                  alt=""
                />
              </button>
              <button onClick={handleEChange}>
                <img
                  src={
                    selectedE
                      ? require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 2-S.png")
                      : require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 2.png")
                  }
                  className="option-btn w-[162px] h-[154px]"
                  alt=""
                />
              </button>
              <button onClick={handleOChange}>
                <img
                  src={
                    selectedO
                      ? require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 3-S.png")
                      : require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Option 3.png")
                  }
                  className="option-btn w-[162px] h-[154px]"
                  alt=""
                />
              </button>
            </div>
          </div>
          {currentQuestion < 1 ? (
            <button
              disabled={
                (!selectedA && !selectedE && !selectedO) || btnTempDisabled
              }
              onClick={handleNext}
              className="disabled:opacity-50"
            >
              <ChevronRight
                className="right w-[125px] h-[125px]"
                style={{ color: Colors.Black }}
              />
            </button>
          ) : (
            <ChevronRight
              className="right w-[125px] h-[125px]"
              style={{ color: Colors.Grey }}
            />
          )}
        </div>
        {/* play */}
        <div className="flex justify-between items-center w-full md:px-10 mt-[20px] mb-[100px]">
          <button
            className={`submit px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold`}
            style={{
              borderRadius: 20,
              backgroundColor: Colors.Pompelmo,
              opacity: 0,
            }}
            onClick={() => {}}
            disabled
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
                className="play-btn w-[138px] h-[138px] mx-20"
                alt=""
              />
            </button>
          )}

          <button
            className={`submit px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold`}
            style={{
              borderRadius: 20,
              backgroundColor: Colors.Pompelmo,
            }}
            onClick={handleSubmit}
            disabled={
              currentQuestion < 1 || (!selectedA && !selectedE && !selectedO)
            }
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
                navigate("/phonological-path/alphabet");
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
            {finalScore === 0 ? (
              <p
                className="successTitle text-[36px] font-[Nunito] my-1"
                style={{ color: Colors.Pompelmo, fontWeight: "bolder" }}
              >
                Not Bad. Keep Trying!
              </p>
            ) : finalScore === 1 ? (
              <p
                className="successTitle text-[36px] font-[Nunito] my-1"
                style={{ color: Colors.Orange, fontWeight: "bolder" }}
              >
                Nice Work!
              </p>
            ) : (
              <p
                className="successTitle text-[36px] font-[Nunito] my-1"
                style={{ color: Colors.green, fontWeight: "bolder" }}
              >
                Yay Passed!
              </p>
            )}
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
                onClick={() => {
                  setShowResult(false);
                  navigate("/phonological-path/alphabet");
                }}
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

export default VowelQuiz;
