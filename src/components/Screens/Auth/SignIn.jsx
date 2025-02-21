import React from "react";
import AuthNavComp from "../Components/AuthComp/AuthNavComp";
import FormTitle from "./../Components/Form/FormTitle";
import FormInput from "./../Components/Form/FormInput";
import { Colors } from "./../../Utils/Colors";
import { Link } from "react-router-dom";

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
      <div className="bg-red w-[50%] h-full flex flex-col items-center justify-center">
        {/* title */}
        <FormTitle title="Hello Friend!" subTitle="Login to Learn and Play" />
        {/* form */}
        <form className="w-[75%] h-full">
          <FormInput label="Email" type="email" />
          <FormInput label="Password" type="password" />
          <button
            className="px-4 py-2 transition font-[Nunito] mt-5 w-full"
            style={{
              color: Colors.White,
              backgroundColor: Colors.Primary,
              fontWeight: "bold",
              borderRadius: 25,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: Colors.Black,
            }}
            onClick={() => {}}
          >
            SignIn
          </button>
        </form>
        {/* forget password link */}
        <Link></Link>
      </div>
    </div>
  );
};

export default SignIn;
