import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  const targetDate = new Date("April 1, 2025 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeft(difference > 0 ? difference : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Convert timeLeft to days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="font-[Nunito] text-5xl font-bold mb-4 text-center">
        🚀 We Are Building Something Amazing!
      </h1>
      <p className="font-[Nunito] text-xl font-bold mb-4 text-center">
        Coming Soon!
      </p>
      {timeLeft > 0 ? (
        <div className="flex gap-4 text-4xl font-semibold mt-4">
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <span>{days}</span>
            <p className="font-[Nunito] text-sm text-gray-400">Days</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <span>{hours}</span>
            <p className="font-[Nunito] text-sm text-gray-400">Hours</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <span>{minutes}</span>
            <p className="font-[Nunito] text-sm text-gray-400">Minutes</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <span>{seconds}</span>
            <p className="font-[Nunito] text-sm text-gray-400">Seconds</p>
          </div>
        </div>
      ) : (
        <h2 className="font-[Nunito] text-4xl font-bold text-green-500 mt-4">
          🎉 We’re Live! 🎉
        </h2>
      )}
      <Link
        to="/"
        className="font-[Nunito] text-xl font-bold mb-4 text-center bg-blue-500 p-3 rounded-lg mt-5"
      >
        HomePage
      </Link>
    </div>
  );
};

export default ComingSoon;
