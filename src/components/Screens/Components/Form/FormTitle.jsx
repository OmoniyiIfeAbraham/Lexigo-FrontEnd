import React from "react";
import { Colors } from "../../../Utils/Colors";

const FormTitle = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col items-center">
      <h1
        className="font-[Nunito] text-3xl font-bold"
        style={{ color: Colors.Black }}
      >
        {title}
      </h1>
      <h3
        className="font-[Nunito] text-xl font-bold"
        style={{ color: Colors.Black }}
      >
        {subTitle}
      </h3>
    </div>
  );
};

export default FormTitle;
