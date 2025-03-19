import { Menu, X } from "lucide-react";
import React from "react";
import { Colors } from "../../../../Utils/Colors";

const VowelA = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${require("./../../../../../Assets/Images/Phonological/Alphabets Module/Vowels/Background-Text.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100vh", // Ensures full width while keeping height proportional
        backgroundPosition: "top center", // Aligns image to the top
      }}
      className="w-full min-h-screen relative"
    >
      <div className="content relative z-10 h-full p-14">
        {/* header */}
        <div className="flex w-full h-[75px] items-center justify-between">
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.BeastyBrown2 }}
            onClick={() => {}}
          >
            <X size={46} color={Colors.White} className="icon" />
          </button>
          <button
            className="navBtn w-[75px] h-[75px] flex justify-center items-center"
            style={{ backgroundColor: Colors.BeastyBrown2 }}
            onClick={() => {}}
          >
            <Menu size={46} color={Colors.White} className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VowelA;
