import React from "react";

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
    ></div>
  );
};

export default VowelA;
