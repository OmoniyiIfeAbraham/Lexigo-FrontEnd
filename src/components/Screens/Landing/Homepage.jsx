import React from "react";
import "./HomePage.css"; // Import the CSS file for the HomePage component

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img
            src={require("./../../../Assets/Images/Logo.png")}
            alt="Logo"
            className="logo-image"
          />
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#assessment">Take Assessment</a>
          <button className="btn btn-play-nav">Let's Play</button>
        </div>
      </nav>

      {/* Image Container */}
      <div className="image-container">
        <img
          src={require("./../../../Assets/Images/Landing.png")}
          alt="Landing"
          className="landing-image"
        />
      </div>
    </div>
  );
};

export default HomePage;
