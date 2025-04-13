import React, { useState } from "react";
import AuthNavComp from "../Components/AuthComp/AuthNavComp";
import FormTitle from "./../Components/Form/FormTitle";
import FormInput from "./../Components/Form/FormInput";
import { Colors } from "./../../Utils/Colors";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpStyle.css";
import Swal from "sweetalert2";
import { BaseUrl } from "../../Config/Config";
import axios from "axios";
import Notify from "../../Notification/Notify";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    type: "",
  });

  const navigate = useNavigate();

  const options = [
    { label: "I'm not sure", value: "" },
    { label: "Phonological Dyslexia", value: "Phonological Dyslexia" },
    { label: "Surface Dyslexia", value: "Surface Dyslexia" },
  ];

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
      let url = `${BaseUrl}/api/register`;
      let formData = new FormData();
      formData.append("Password", inputs.password);
      formData.append("Name", inputs.name);
      formData.append("Email", inputs.email);
      formData.append("Type", inputs.type);

      let response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.Error === false) {
        Notify({
          title: "Success",
          message: "Registeration successful",
          Type: "success",
        });
        navigate("/auth/signin");
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
          subTitle="Create Your Lexigo account."
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <FormInput
            label="Child's Name"
            type="text"
            name="name"
            input={inputs.name}
            handleChange={handleChange}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            input={inputs.email}
            handleChange={handleChange}
          />
          <FormInput
            label="Dyslexia Type"
            type="select"
            name="type"
            input={inputs.type}
            handleChange={handleChange}
            options={options}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            input={inputs.password}
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
            onClick={() => {}}
          >
            Sign up
          </button>
        </form>

        {/* Forgot Password Link */}
        <Link
          to="/coming-soon"
          className="flex items-start w-full max-w-md mt-4"
        >
          <p className="font-[Nunito]">Forgot Password?</p>
        </Link>

        {/* Sign-up Link */}
        <div className="flex flex-row mt-10">
          <p className="font-[Nunito]">Have an account?</p>
          <Link to="/auth/signin">
            <p className="font-[Nunito] font-bold ml-1">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
