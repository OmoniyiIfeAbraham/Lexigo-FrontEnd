import { ChevronLeft } from "lucide-react";
import React from "react";
import { Colors } from "../../Utils/Colors";
import { useNavigate } from "react-router-dom";
import "./PathStyle.css";

const Path = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-screen h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${require("./../../../Assets/Images/Phonological/background.png")})`,
      }}
    >
      {/* Blur Overlay */}
      {/* <div className="absolute inset-0 backdrop-blur-md bg-black/10"></div> */}

      {/* Content */}
      <div className="content relative z-10 h-full p-14">
        {/* header */}
        <div className="flex w-full h-[75px] items-center justify-between">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Secondary }}
            onClick={() => {
              navigate("/home");
            }}
          >
            <ChevronLeft size={46} color={Colors.White} />
          </button>
          <h1 className="title text-[48px] font-[Nunito]">Phonological Path</h1>
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.Secondary, opacity: 0 }}
          >
            <ChevronLeft size={46} color={Colors.White} />
          </button>
        </div>
        {/* popup */}
        <div className="w-full py-3 flex justify-center items-center">
          {/* Dog Image */}
          <img
            src={require("./../../../Assets/Images/HomePage/Lexigo dog 2.png")}
            alt="Dog"
            className="dog-img w-20 h-20 mr-5"
          />
          <div className="popup bg-white p-8 shadow-lg relative w-[50%] text-start">
            <p
              className="title-sub text-[24px] font-[Nunito]"
              style={{ color: Colors.Black }}
            >
              hi, I’m your friendly dog! 🐾 let’s have fun learning sounds and
              letters together!
            </p>
          </div>
        </div>
        {/* buttons */}
        <div className="buttons flex w-full justify-between">
          {/* Alphabets Image with Text Overlay */}
          <button className="btn relative w-[40%] mx-auto mt-8">
            <img
              src={require("./../../../Assets/Images/Phonological/one.png")}
              alt="Alphabets"
              className="w-full h-[300.75px]"
            />
            <div className="absolute inset-0 flex flex-col items-start py-10 px-5 h-full w-[50%]">
              <p
                className="alphabet text-[48px] font-[Nunito]"
                style={{ color: Colors.Black }}
              >
                alphabets
              </p>
              <p
                className="button-txt text-[24px] font-[Nunito] text-left"
                style={{ color: Colors.Black }}
              >
                learn the sounds of your vowels and consonants
              </p>
            </div>
          </button>
          {/* Blending Image with Text Overlay */}
          <button className="btn relative w-[40%] mx-auto mt-8">
            <img
              src={require("./../../../Assets/Images/Phonological/two.png")}
              alt="Blending"
              className="w-full h-[300.75px]"
            />
            <div className="absolute inset-0 flex flex-col items-start py-10 px-5 h-full w-[50%]">
              <p
                className="alphabet text-[48px] font-[Nunito]"
                style={{ color: Colors.Black }}
              >
                blending
              </p>
              <p
                className="button-txt text-[24px] font-[Nunito] text-left"
                style={{ color: Colors.Black }}
              >
                learn how to blend letters with sounds and pictures
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Path;
