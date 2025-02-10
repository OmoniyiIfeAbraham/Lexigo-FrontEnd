import React from "react";
import { Colors } from "../../Utils/Colors";
import { Link, useNavigate } from "react-router-dom";
import NavComp from "../Components/LandingComp/NavComp";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col">
      {/* Navigation Bar */}
      <NavComp />

      {/* Image Section */}
      <div className="flex-grow relative mx-12" style={{ marginTop: "25px" }}>
        <img
          src={require("./../../../Assets/Images/Landing/LandingImg.png")}
          alt="Banner"
          className="w-full h-[calc(100vh-120px)] md:object-fit rounded-lg"
        />
        {/* Overlay Text and Buttons */}
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start bg-black bg-opacity-0 p-6 rounded-lg">
          <h1
            className="font-[Nunito] text-xl md:text-2xl font-bold mb-2 text-center"
            style={{ color: Colors.Black }}
          >
            Your Kid Friendly
          </h1>
          <h1
            className="font-[Nunito] text-3xl md:text-4xl font-bold mb-2 text-center"
            style={{ color: Colors.Black }}
          >
            Dyslexic App
          </h1>
          <p
            className="font-[Nunito] mb-4 text-center"
            style={{ color: Colors.Black }}
          >
            Learn and Play with Lexigo, unlock fun lessons, and <br /> explore
            the world of words with your animal friends!
          </p>
          <div className="flex space-x-4">
            <button
              className="font-[Nunito] px-4 py-2 rounded-lg transition"
              style={{ borderColor: Colors.Black, borderWidth: 1 }}
            >
              Take Assessment
            </button>
            <button
              className="px-4 py-2 rounded-lg transition font-[Nunito]"
              style={{
                color: Colors.White,
                backgroundColor: Colors.Primary,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/auth/signin")}
            >
              Let's Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// import React from "react";
// import "./HomePage.css"; // Import the CSS file for the HomePage component

// const HomePage = () => {
//   return (
//     <div className="homepage">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <img
//             src={require("./../../../Assets/Images/Logo.png")}
//             alt="Logo"
//             className="logo-image"
//           />
//         </div>
//         <div className="nav-links">
//           <a href="#home">Home</a>
//           <a href="#assessment">Take Assessment</a>
//           <button className="btn btn-play-nav">Let's Play</button>
//         </div>
//       </nav>

//       {/* Image Container */}
//       <div className="image-container">
//         <img
//           src={require("./../../../Assets/Images/Landing.png")}
//           alt="Landing"
//           className="landing-image"
//         />
//       </div>
//     </div>
//   );
// };

// export default HomePage;
