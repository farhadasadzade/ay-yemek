import React from "react";
import { Input as CoreInput } from "antd";
import "./style/index.scss";

const { TextArea } = CoreInput;

const Input = ({
  type,
  placeholder,
  error,
  name,
  label,
  isRequired,
  methods,
  onChange,
  rows,
}) => {
  switch (type) {
    case "textarea":
      return (
        <>
          <label className="coreinput-label" htmlFor={name}>
            {label}{" "}
            <span style={{ color: "#D0011A" }}>{isRequired ? "*" : ""}</span>
            <TextArea
              className={`coreinput ${error ? "coreinput-error" : ""}`}
              name={name}
              id={name}
              onChange={onChange}
              rows={rows}
              placeholder={placeholder}
            />
          </label>
        </>
      );
    default:
      return (
        <>
          <label className="coreinput-label" htmlFor={name}>
            {label}{" "}
            <span style={{ color: "#D0011A" }}>{isRequired ? "*" : ""}</span>
            <CoreInput
              className={`coreinput ${error ? "coreinput-error" : ""}`}
              type={type}
              placeholder={placeholder}
              name={name}
              id={name}
              onChange={onChange}
            />
          </label>
        </>
      );
  }
};

export default Input;
