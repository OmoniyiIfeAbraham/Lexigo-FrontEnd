import React, { useEffect, useState } from "react";
import { Colors } from "../../Utils/Colors";
import { Link, useNavigate } from "react-router-dom";
import NavComp from "../Components/LandingComp/NavComp";
import "./HomePage.css";
import Swal from "sweetalert2";
import { BaseUrl } from "../../Config/Config";
import axios from "axios";
import Notify from "../../Notification/Notify";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
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

      let url = `${BaseUrl}/api/profile/view`;

      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData?.Auth}`,
        },
      });

      if (response.data.Error === false) {
        Notify({
          title: "Success",
          message: "Login successful",
          Type: "success",
        });
        navigate("/home");
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
      if (
        errorMessage === "Unauthorized, please log in again" ||
        errorMessage === "Invalid or expired token"
      ) {
        console.log("");
      } else {
        Notify({
          title: "Error",
          message: errorMessage,
          Type: "danger",
        });
      }
    } finally {
      Swal.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation Bar */}
      <NavComp />

      {/* Image Section */}
      <div
        className="image-div flex-grow relative mx-6 h-full"
        // style={{ backgroundColor: "red" }}
      >
        <img
          src={require("./../../../Assets/Images/Landing/LandingImg.png")}
          alt="Banner"
          className="image h-[calc(100vh-90px)] object-cover rounded-lg"
          style={{ width: "100%" }}
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
              onClick={() => navigate("/coming-soon")}
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
