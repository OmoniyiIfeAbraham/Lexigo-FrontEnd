import React from "react";
import "./HomePage.css"; // Import the CSS file for the HomePage component

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Lexigo</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#assessment">Take Assessment</a>
          <a href="#play">Let's Play</a>
        </div>
      </nav>

      {/* Main Content */}
      {/* <div className="content">
        <h1>Your Kid Friendly Dyslexic App</h1>
        <p>
          Learn and Play with Lexigo, unlock fun lessons, and explore the world
          of words with your animal friends!
        </p>
        <div className="buttons">
          <button className="btn btn-assessment">Take Assessment</button>
          <button className="btn btn-play">Let's Play</button>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
