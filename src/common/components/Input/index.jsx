import React from "react";
import { Input as CoreInput } from "antd";
import "./style/index.scss";

const { TextArea } = CoreInput;

const Input = ({ type, placeholder, error }) => {
  switch (type) {
    case "textarea":
      return (
        <TextArea className={`coreinput ${error ? "coreinput-error" : ""}`} />
      );
    default:
      return (
        <CoreInput
          className={`coreinput ${error ? "coreinput-error" : ""}`}
          type={type}
          placeholder={placeholder}
        />
      );
  }
};

export default Input;
