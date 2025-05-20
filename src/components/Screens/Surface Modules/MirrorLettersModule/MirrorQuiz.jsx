import { ChevronLeft, ChevronRight, Menu, Pause, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../Config/Config";
import Notify from "../../../Notification/Notify";
import Swal from "sweetalert2";
import "./MirrorQuizStyle.css";

const questions = [
  {
    question: "Select the letters p’s ",
  },
  {
    question: "Select the letters q’s ",
  },
];

const MirrorQuiz = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectP1, setSelectP1] = useState(false);
  const [selectP2, setSelectP2] = useState(false);
  const [selectQ1, setSelectQ1] = useState(false);
  const [selectQ2, setSelectQ2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [btnTempDisabled, setBtnTempDisabled] = useState(false);

  // Function to play audio
  const playSound = () => {
    setPlaying(true);
    const audio = new Audio(
      require(selectP1 || selectP2
        ? "./../../../../Assets/Audio/Surface/p.mp3"
        : "./../../../../Assets/Audio/Surface/q.mp3")
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
      (currentQuestion === 0 && selectP1 && selectP2) ||
      (currentQuestion === 1 && selectQ1 && selectQ2)
    ) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;

      setScore(newScore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      await axios.get(
        `${BaseUrl}/api/surface/quiz/progress/add?level=${currentQuestion}&score=${newScore}`,
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
      setSelectP1(false);
      setSelectP2(false);
      setSelectQ1(false);
      setSelectQ2(false);
    }
  };

  const handleSubmit = async () => {
    const Data = await localStorage.getItem("Profile");
    const parsedData = JSON.parse(Data);

    let newScore = 0;

    if (
      (currentQuestion === 0 && selectP1 && selectP2) ||
      (currentQuestion === 1 && selectQ1 && selectQ2)
    ) {
      console.log(`Question ${currentQuestion + 1}: ✅ Correct`);
      newScore += 1;
      setScore(newScore);
    } else {
      console.log(`Question ${currentQuestion + 1}: ❌ Incorrect`);
    }

    try {
      const response = await axios.get(
        `${BaseUrl}/api/surface/quiz/progress/add?level=${currentQuestion}&score=${newScore}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${parsedData.Auth}`,
          },
        }
      );
      console.log("Final Progress Saved");
      setFinalScore(response.data.Data.Score);
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
      setSelectP1(false);
      setSelectP2(false);
      setSelectQ1(false);
      setSelectQ2(false);
      setScore(0);
    }
  };

  const handleSelectP1 = () => {
    setSelectP1(!selectP1);
    // setSelectP2(false);
    setSelectQ1(false);
    setSelectQ2(false);
  };
  const handleSelectP2 = () => {
    setSelectP2(!selectP2);
    // setSelectP1(false);
    setSelectQ1(false);
    setSelectQ2(false);
  };
  const handleSelectQ1 = () => {
    setSelectQ1(!selectQ1);
    setSelectP2(false);
    setSelectP1(false);
    // setSelectQ2(false);
  };
  const handleSelectQ2 = () => {
    setSelectQ2(!selectQ2);
    setSelectP2(false);
    // setSelectQ1(false);
    setSelectP1(false);
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

      let url = `${BaseUrl}/api/surface/quiz/start`;

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
          setShowPopup(true);
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
          src={require("./../../../../Assets/Images/Surface/Mirror Letters/Background.png")}
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
              navigate("/surface-path/mirror");
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
              Select the letters{" "}
              <b style={{ color: Colors.Pompelmo }} className="text-[32px]">
                {currentQuestion === 0 ? "p’s" : "q’s"}
              </b>
            </h2>
            <div className="option-btn-group w-full flex justify-between px-32">
              {currentQuestion === 0 ? (
                <>
                  <button onClick={handleSelectP1}>
                    <img
                      src={
                        selectP1
                          ? require("./../../../../Assets/Images/Surface/Mirror Letters/p-n.png")
                          : require("./../../../../Assets/Images/Surface/Mirror Letters/p-n-r.png")
                      }
                      className="option-btn w-[161px] h-[161px]"
                      style={selectP1 ? { zIndex: 10 } : null}
                      alt=""
                    />
                  </button>
                  <button onClick={handleSelectQ1}>
                    <img
                      src={
                        selectQ1
                          ? require("./../../../../Assets/Images/Surface/Mirror Letters/q-n.png")
                          : require("./../../../../Assets/Images/Surface/Mirror Letters/q-n-r.png")
                      }
                      className="option-btn w-[161px] h-[161px]"
                      style={selectQ1 ? { zIndex: 10 } : null}
                    />
                  </button>
                  <button onClick={handleSelectP2}>
                    <img
                      src={
                        selectP2
                          ? require("./../../../../Assets/Images/Surface/Mirror Letters/p-n.png")
                          : require("./../../../../Assets/Images/Surface/Mirror Letters/p-n-r.png")
                      }
                      className="option-btn w-[161px] h-[161px]"
                      style={selectP2 ? { zIndex: 10 } : null}
                      alt=""
                    />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleSelectQ1}>
                    <img
                      src={
                        selectQ1
                          ? require("./../../../../Assets/Images/Surface/Mirror Letters/q-n.png")
                          : require("./../../../../Assets/Images/Surface/Mirror Letters/q-n-r.png")
                      }
                      className="option-btn w-[161px] h-[161px]"
                      style={selectQ1 ? { zIndex: 10 } : null}
                      alt=""
                    />
                  </button>
                  <button onClick={handleSelectQ2}>
                    <img
                      src={
                        selectQ2
                          ? require("./../../../../Assets/Images/Surface/Mirror Letters/q-n.png")
                          : require("./../../../../Assets/Images/Surface/Mirror Letters/q-n-r.png")
                      }
                      className="option-btn w-[161px] h-[161px]"
                      style={selectQ2 ? { zIndex: 10 } : null}
                      alt=""
                    />
                  </button>
                  <button onClick={handleSelectP1}>
                    <img
                      src={
                        selectP1
                          ? require("./../../../../Assets/Images/Surface/Mirror Letters/p-n.png")
                          : require("./../../../../Assets/Images/Surface/Mirror Letters/p-n-r.png")
                      }
                      className="option-btn w-[161px] h-[161px]"
                      style={selectP1 ? { zIndex: 10 } : null}
                      alt=""
                    />
                  </button>
                </>
              )}
            </div>
          </div>
          {currentQuestion < 1 ? (
            <button
              disabled={!selectP1 && !selectP2 && !selectQ1 && !selectQ2}
              onClick={handleNext}
              diabled={btnTempDisabled}
              className="disabled:opacity-50"
            >
              <ChevronRight
                className="right w-[125px] h-[125px]"
                style={{
                  color: Colors.Black,
                  opacity: btnTempDisabled ? 0.5 : 1,
                }}
              />
            </button>
          ) : (
            <ChevronRight
              className="right w-[125px] h-[125px]"
              style={{ color: Colors.Black, opacity: 0.5 }}
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
            Done
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
            <button
              onClick={playSound}
              disabled={!selectP1 && !selectP2 && !selectQ1 && !selectQ2}
              className="disabled:opacity-50"
            >
              <img
                src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Play.png")}
                className="play-btn w-[138px] h-[138px] mr-10"
                alt=""
              />
            </button>
          )}

          <button
            className={`px-10 py-5 bg-blue-500 text-white text-lg font-[Nunito] font-bold disabled:opacity-0`}
            style={{
              borderRadius: 20,
              backgroundColor: Colors.Pompelmo,
            }}
            onClick={handleSubmit}
            disabled={
              btnTempDisabled ||
              currentQuestion < 1 ||
              (!selectP1 && !selectP2 && !selectQ1 && !selectQ2)
            }
          >
            Done
          </button>
        </div>
      </div>

      {(selectP1 || selectP2 || selectQ1 || selectQ2) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-9"></div>
      )}

      {/* bottom popup */}
      <div
        className="bottom-pop absolute bg-white p-8 shadow-lg w-104 text-start bottom-20 left-40 z-15"
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
          {currentQuestion === 0 ? "You can do it" : "Almost there"}
        </p>

        {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
        <img
          src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
          alt="Owl"
          className="absolute -bottom-12 -left-20 w-20 h-20"
        />
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
              src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/star.png")}
              alt="Star"
              className="w-[104px] h-[104px]"
              style={{
                justifySelf: "center",
              }}
            />
            {btnTempDisabled ? (
              <p
                className="text-lg font-semibold font-[Nunito]"
                style={{ color: Colors.Black }}
              >
                You have completed this quiz previously. <br /> Reset the
                progress on your profile to take the quiz again.
              </p>
            ) : (
              <p
                className="text-lg font-semibold font-[Nunito]"
                style={{ color: Colors.Black }}
              >
                Well done young scholar, you have <br /> finished your very
                first lesson. Its time to <br /> find out what you know. Lets
                go!!! 😁
              </p>
            )}

            {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
            <img
              src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
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
                navigate("/surface-path/mirror");
              }}
            >
              <X size={46} color={Colors.White} className="icon" />
            </button>

            {finalScore !== 2 ? (
              <img
                src={require("./../../../../Assets/Images/AssesmentPage/fail.png")}
                alt="fail"
                className="w-[416px] h-[60px] my-3"
              />
            ) : (
              <img
                src={require("./../../../../Assets/Images/AssesmentPage/success.png")}
                alt="success"
                className="w-[416px] h-[60px] my-3"
              />
            )}
            <img
              src={require("./../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Owl.png")}
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
                  navigate("/surface-path/mirror");
                }}
              >
                Back to Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MirrorQuiz;
