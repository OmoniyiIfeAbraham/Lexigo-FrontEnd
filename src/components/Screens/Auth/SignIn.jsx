import React from "react";
import AuthNavComp from "../Components/AuthComp/AuthNavComp";
import FormTitle from "./../Components/Form/FormTitle";
import { Colors } from "./../../Utils/Colors";

const SignIn = () => {
  return (
    <div className="flex flex-row items-center justify-start">
      {/* Left Section */}
      <div className="relative w-[50%]">
        <img
          src={require("./../../../Assets/Images/Auth/Group 2076.png")}
          alt="Logo"
          className="h-screen"
        />

        {/* Navbar */}
        <AuthNavComp />
      </div>
      {/* Right Section */}
      <div>
        {/* title */}
        <FormTitle title="Hello Friend!" subTitle="Login to Learn and Play" />
        {/* form */}
        <form style={{ backgroundColor: "red" }} className="w-[50%] h-full">
          <div>
            <label>Email</label>
            <input
              style={{
                backgroundColor: Colors.White,
                borderWidth: 1,
                borderColor: Colors.Black,
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
