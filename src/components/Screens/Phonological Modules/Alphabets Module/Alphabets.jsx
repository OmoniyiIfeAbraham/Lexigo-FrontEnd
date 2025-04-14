import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../Utils/Colors";
import { ChevronLeft } from "lucide-react";
import "./AlphabetsStyle.css";
import Swal from "sweetalert2";
import { BaseUrl } from "../../../Config/Config";
import axios from "axios";
import Notify from "../../../Notification/Notify";

const Alphabets = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [progress, setProgress] = useState(0);

  const ViewProgress = async () => {
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

      let url = `${BaseUrl}/api/phonological/module/alphabets/view`;

      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${parsedData.Auth}`,
        },
      });

      if (response.data.Error === false) {
        console.log("initial: ", response.data);
        setProgress(response.data.Data.Progress);
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
    }
  };

  useEffect(() => {
    ViewProgress();
  }, []);

  return (
    <div
      style={{
        backgroundColor: Colors.Cream,
        backgroundImage: `url(${require("./../../../../Assets/Images/Phonological/Alphabets Module/background.png")})`,
      }}
      className="w-screen h-screen relative bg-cover bg-center"
    >
      <div className="content relative z-10 h-full p-14">
        {/* header */}
        <div className="flex w-full h-[75px] items-center justify-between">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Primary }}
            onClick={() => {
              navigate("/phonological-path");
            }}
          >
            <ChevronLeft size={46} color={Colors.White} className="icon" />
          </button>
          <h1 className="title text-[48px] font-[Nunito]">Alphabets</h1>
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Secondary, opacity: 0 }}
          >
            <ChevronLeft size={46} color={Colors.White} className="icon" />
          </button>
        </div>
        {/* progress bar */}
        <div className="progress-container flex flex-row w-full justify-center items-center mt-5">
          <div
            className="progress-one w-[70px] h-[70px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Secondary }}
          >
            <h1
              className="progress-text text-[32px] font-[Nunito]"
              style={{ color: Colors.White }}
            >
              1
            </h1>
          </div>
          <img
            src={
              progress >= 1
                ? require("./../../../../Assets/Images/Phonological/Alphabets Module/Progress Bar-Filled.png")
                : require("./../../../../Assets/Images/Phonological/Alphabets Module/Progress Bar.png")
            }
            className="img w-[183px] h-[35px] mx-2"
          />
          <div
            className="progress-two w-[70px] h-[70px] flex justify-center items-center"
            style={{
              backgroundColor: progress >= 1 ? Colors.Secondary : Colors.Grey,
            }}
          >
            <h1
              className="progress-text text-[32px] font-[Nunito]"
              style={{ color: Colors.White }}
            >
              2
            </h1>
          </div>
          <img
            src={
              progress == 2
                ? require("./../../../../Assets/Images/Phonological/Alphabets Module/Progress Bar-Filled.png")
                : require("./../../../../Assets/Images/Phonological/Alphabets Module/Progress Bar.png")
            }
            className="img w-[183px] h-[35px] mx-2"
          />
          <div
            className="progress-trophy w-[70px] h-[70px] flex justify-center items-center"
            style={{
              backgroundColor: progress == 2 ? Colors.Secondary : Colors.Grey,
            }}
          >
            <img
              src={
                progress == 2
                  ? require("./../../../../Assets/Images/Phonological/Alphabets Module/Trophy-Filled.png")
                  : require("./../../../../Assets/Images/Phonological/Alphabets Module/Trophy.png")
              }
              className="img-trophy w-[43px] h-[44px]"
            />
          </div>
        </div>
        {/* buttons */}
        <div className="buttons flex w-full justify-between mt-2">
          {/* vowels Image with Text Overlay */}
          <button
            className="btn relative w-[40%] mx-auto mt-8"
            onClick={() => {
              navigate("/phonological-path/bd/vowelA");
            }}
          >
            <img
              src={require("./../../../../Assets/Images/Phonological/Alphabets Module/vowels.png")}
              alt="Vowels"
              className="w-[474px] h-[364px]"
            />
          </button>
          {/* Blending Image with Text Overlay */}
          <button className="btn relative w-[40%] mx-auto mt-8">
            <img
              src={require("./../../../../Assets/Images/Phonological/Alphabets Module/consonants.png")}
              alt="Consonants"
              className="w-[474px] h-[364px]"
            />
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
          <div className="popup bg-white p-8 shadow-lg relative w-104 text-start">
            <p
              className="text-lg font-semibold font-[Nunito]"
              style={{ color: Colors.Black }}
            >
              Pick a lesson to begin to learn and play. <br /> Do activities{" "}
              <br /> Do the quizzes <br /> Don’t forget to have fun 😁
            </p>

            {/* Dog Image (positioned outside but touching bottom-left border of popup) */}
            <img
              src={require("./../../../../Assets/Images/HomePage/Lexigo dog 2.png")}
              alt="Dog"
              className="absolute -bottom-12 -left-20 w-20 h-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Alphabets;
