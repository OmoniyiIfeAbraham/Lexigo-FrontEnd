import React, { useState } from "react";
import AuthNavComp from "../Components/AuthComp/AuthNavComp";
import FormTitle from "./../Components/Form/FormTitle";
import FormInput from "./../Components/Form/FormInput";
import { Colors } from "./../../Utils/Colors";
import { Link, useNavigate } from "react-router-dom";
import "./SignInStyle.css";
import Notify from "../../Notification/Notify";
import Swal from "sweetalert2";
import { BaseUrl } from "../../Config/Config";
import axios from "axios";

const SendResetLink = () => {
  const [inputs, setInputs] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      let url = `${BaseUrl}/api/register/forgot-password`;
      let formData = new FormData();
      formData.append("email", inputs.email);

      let response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.Error === false) {
        Notify({
          title: "Success",
          message: "Password Reset Link sent to your email.",
          Type: "success",
        });
        await localStorage.setItem("ResetEmail", response.data.Email);
        await localStorage.setItem("Resettoken", response.data.ID);
        setInputs({ email: "" });
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
      Notify({
        title: "Error",
        message: errorMessage,
        Type: "danger",
      });
    } finally {
      Swal.close();
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-start h-screen">
      {/* Left Section (Image) */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
        <img
          src={require("./../../../Assets/Images/Auth/Group 2076.png")}
          alt="Logo"
          className="image h-full"
        />
        {/* Navbar */}
        <AuthNavComp />
      </div>

      {/* Right Section (Form) */}
      <div className="right-section w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-6">
        {/* Title */}
        <FormTitle
          title="Hello Friend!"
          subTitle="Enter Email to Continue..."
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <FormInput
            label="Email"
            type="email"
            name="email"
            input={inputs.email}
            handleChange={handleChange}
          />
          <button
            type="submit"
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
          >
            Update
          </button>
        </form>

        {/* Sign-up Link */}
        <div className="flex flex-row mt-10">
          <p className="font-[Nunito]">Already have an account?</p>
          <Link to="/auth/signin">
            <p className="font-[Nunito] font-bold ml-1">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SendResetLink;
