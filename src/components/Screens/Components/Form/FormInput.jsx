import React from "react";
import { Colors } from "../../../Utils/Colors";

const FormInput = ({ label, type, input, handleChange, name }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <label className="font-[Nunito]" style={{ fontSize: 16 }}>
        {label}
      </label>
      <input
        style={{
          backgroundColor: Colors.White,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Colors.Black,
          borderRadius: 25,
          height: 40,
          outline: "none",
        }}
        className="w-full px-5 mt-2"
        type={type}
        name={name}
        value={input}
        onChange={handleChange}
        onFocus={(e) => (e.target.style.borderColor = Colors.Primary)} // Change border color when active
        onBlur={(e) => (e.target.style.borderColor = Colors.Black)} // Reset border color when inactive
      />
    </div>
  );
};

export default FormInput;
