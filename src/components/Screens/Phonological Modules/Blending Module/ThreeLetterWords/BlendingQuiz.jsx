import { ChevronLeft, ChevronRight, Menu, Pause, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../../Config/Config";
import Notify from "../../../../Notification/Notify";
import Swal from "sweetalert2";
import "./BlendingQuizStyle.css";

const questions = [
  {
    question: "",
  },
  {
    question: "",
  },
];
const BlendingQuiz = () => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedFan, setSelectedFan] = useState(false);
  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedPan, setSelectedPan] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [btnTempDisabled, setBtnTempDisabled] = useState(false);

  // Function to play audio
  const playSound = () => {
    setPlaying(true);
    const audio = new Audio(
      require(currentQuestion === 0
        ? "./../../../../../Assets/Audio/Blending/c_a_t.mp3"
        : "./../../../../../Assets/Audio/Blending/p_a_n.mp3")
    );
    audio.play();
    setTimeout(
      () => {
        setPlaying(false);
      },
      currentQuestion === 0 ? 4500 : 5000
    );
  };

  const handleNext = async () => {
    setBtnTempDisabled(true);
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    let newScore = score;

    if (
      (currentQuestion === 0 && selectedCat) ||
      (currentQuestion === 1 && selectedPan)
    ) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;

      setScore(newScore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      await axios.get(
        `${BaseUrl}/api/phonological/quiz/blending/progress/add?level=${currentQuestion}&score=${newScore}`,
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

    setSelectedCat(false);
    setSelectedFan(false);
    setSelectedPan(false);
  };

  const handleSubmit = async () => {
    setBtnTempDisabled(true);
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    let newScore = 0;

    if (
      (currentQuestion === 0 && selectedCat) ||
      (currentQuestion === 1 && selectedPan)
    ) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;
      setScore(newScore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      const response = await axios.get(
        `${BaseUrl}/api/phonological/quiz/blending/progress/add?level=${currentQuestion}&score=${newScore}`,
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
    } finally {
      setBtnTempDisabled(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }

    setSelectedCat(false);
    setSelectedFan(false);
    setSelectedPan(false);
    setScore(0);
  };

  const handleFanChange = () => {
    setSelectedFan(!selectedFan);
    setSelectedCat(false);
    setSelectedPan(false);
  };

  const handleCatChange = () => {
    setSelectedCat(!selectedCat);
    setSelectedFan(false);
    setSelectedPan(false);
  };

  const handlePanChange = () => {
    setSelectedPan(!selectedPan);
    setSelectedCat(false);
    setSelectedFan(false);
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

      let url = `${BaseUrl}/api/phonological/quiz/blending/quiz/start`;

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
        if (response.data.Data.Completed === true) {
          setBtnTempDisabled(true);
          // setShowPopup(true);
          window.alert(
            "You have completed this quiz previously. Reset Progress on your profile to take the quiz again."
          );
        }
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
              navigate("/phonological-path/blending");
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
            <button
              onClick={handlePrevious}
              disabled={btnTempDisabled}
              className="disabled:opacity-50"
            >
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
                  className={`progress w-1/6 h-[10px] mx-1 rounded-lg`}
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
              <div className="option-btn-f-group w-full flex justify-center px-32 items-center">
                <img
                  src={require("./../../../../../Assets/Images/Phonological/Blending Module/c.png")}
                  className="option-btn-f w-[90px] h-[90px]"
                  alt=""
                />

                <Plus className="plus w-[50px] h-[50px] mx-5" />

                <img
                  src={require("./../../../../../Assets/Images/Phonological/Blending Module/a.png")}
                  className="option-btn-f w-[90px] h-[90px]"
                  alt=""
                />

                <Plus className="plus w-[50px] h-[50px] mx-5" />

                <img
                  src={require("./../../../../../Assets/Images/Phonological/Blending Module/t.png")}
                  className="option-btn-f w-[90px] h-[90px]"
                  alt=""
                />
              </div>
            ) : (
              <div className="option-btn-f-group w-full flex justify-center px-32 items-center">
                <img
                  src={require("./../../../../../Assets/Images/Phonological/Blending Module/p.png")}
                  className="option-btn-f w-[90px] h-[90px]"
                  alt=""
                />

                <Plus className="plus w-[50px] h-[50px] mx-5" />

                <img
                  src={require("./../../../../../Assets/Images/Phonological/Blending Module/a.png")}
                  className="option-btn-f w-[90px] h-[90px]"
                  alt=""
                />

                <Plus className="plus w-[50px] h-[50px] mx-5" />

                <img
                  src={require("./../../../../../Assets/Images/Phonological/Blending Module/n.png")}
                  className="option-btn-f w-[90px] h-[90px]"
                  alt=""
                />
              </div>
            )}
            <div className="option-btn-group w-full flex justify-center px-32 items-center mt-10">
              <button onClick={handleFanChange}>
                <img
                  src={
                    selectedFan
                      ? require("./../../../../../Assets/Images/Phonological/Blending Module/fan-Filled.png")
                      : require("./../../../../../Assets/Images/Phonological/Blending Module/fan.png")
                  }
                  className="option-btn w-[173px] h-[62px] mr-10"
                  alt=""
                />
              </button>

              <button onClick={handlePanChange}>
                <img
                  src={
                    selectedPan
                      ? require("./../../../../../Assets/Images/Phonological/Blending Module/pan-Filled.png")
                      : require("./../../../../../Assets/Images/Phonological/Blending Module/pan.png")
                  }
                  className="option-btn w-[173px] h-[62px] mr-10"
                />
              </button>

              <button onClick={handleCatChange}>
                <img
                  src={
                    selectedCat
                      ? require("./../../../../../Assets/Images/Phonological/Blending Module/cat-option-Filled.png")
                      : require("./../../../../../Assets/Images/Phonological/Blending Module/cat-option.png")
                  }
                  className="option-btn w-[173px] h-[62px]"
                  alt=""
                />
              </button>
            </div>
          </div>
          {currentQuestion < 1 ? (
            <button
              disabled={
                (!selectedFan && !selectedPan && !selectedCat) ||
                btnTempDisabled
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
              className="play-btn w-[138px] h-[138px] flex justify-center items-center mr-10"
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
                className="play-btn w-[138px] h-[138px] mr-10"
                alt=""
              />
            </button>
          )}

          <button
            className={`submit px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold disabled:opacity-0`}
            style={{
              borderRadius: 20,
              backgroundColor: Colors.Pompelmo,
            }}
            onClick={handleSubmit}
            disabled={
              currentQuestion < 1 ||
              (!selectedFan && !selectedPan && !selectedCat) ||
              playing ||
              btnTempDisabled
            }
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
                navigate("/phonological-path/blending");
              }}
            >
              <X size={46} color={Colors.White} className="icon" />
            </button>

            {finalScore < 2 ? (
              <img
                src={require("./../../../../../Assets/Images/AssesmentPage/fail.png")}
                alt="fail"
                className="w-[416px] h-[60px] my-3"
              />
            ) : (
              <img
                src={require("./../../../../../Assets/Images/AssesmentPage/success.png")}
                alt="success"
                className="w-[416px] h-[60px] my-3"
              />
            )}
            <img
              src={require("./../../../../../Assets/Images/Phonological/Blending Module/Cat 2.png")}
              alt="Owl"
              className="w-[143px] h-[143px] my-3"
            />
            {finalScore === 0 ? (
              <p
                className="successTitle text-[24px] font-[Nunito] my-1"
                style={{ color: Colors.Black, fontWeight: "bolder" }}
              >
                You will get it next time. Score({finalScore})
              </p>
            ) : finalScore === 1 ? (
              <p
                className="successTitle text-[24px] font-[Nunito] my-1"
                style={{ color: Colors.Black, fontWeight: "bolder" }}
              >
                You will get it next time. Score({finalScore})
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
                  navigate("/phonological-path/blending");
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

export default BlendingQuiz;
