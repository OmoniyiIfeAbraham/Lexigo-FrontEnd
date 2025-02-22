import React from "react";
import { Colors } from "../../../Utils/Colors";
import { ChevronDown } from "lucide-react";

const FormInput = ({ label, type, input, handleChange, name, options }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <label className="font-[Nunito]" style={{ fontSize: 16 }}>
        {label}
      </label>
      {type !== "select" ? (
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
      ) : (
        <div className="relative w-full mt-2">
          {/* Dropdown container */}
          <div className="relative">
            <select
              style={{
                backgroundColor: Colors.White,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: Colors.Black,
                borderRadius: 25,
                height: 40,
                appearance: "none", // Hide default dropdown arrow
                paddingRight: "2.5rem", // Space for the icon
              }}
              className="w-full px-4 pr-10 cursor-pointer outline-none"
              name={name}
              value={input}
              onChange={handleChange}
            >
              {options?.map((item, index) => (
                <option
                  key={index}
                  className="font-[Nunito]"
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

            {/* Dropdown icon */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown
                size={20}
                className="text-white rounded-full p-1"
                style={{ backgroundColor: Colors.Primary }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormInput;
