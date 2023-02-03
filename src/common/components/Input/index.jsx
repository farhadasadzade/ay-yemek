import React from "react";
import { Input as CoreInput, DatePicker } from "antd";
import "./style/index.scss";

const { TextArea } = CoreInput;

const Input = ({
  type,
  placeholder,
  error,
  name,
  label,
  isRequired,
  onChange,
  onSelect,
  rows,
  prefix,
  disabledDate,
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
              prefix={prefix}
            />
          </label>
        </>
      );
    case "datepicker":
      return (
        <>
          <label className="coreinput-label" htmlFor={name}>
            {label}{" "}
            <span style={{ color: "#D0011A" }}>{isRequired ? "*" : ""}</span>
            <DatePicker
              className={`coreinput ${error ? "coreinput-error" : ""}`}
              name={name}
              id={name}
              onChange={onChange}
              placeholder="05.09.1999"
              format="DD.MM.YYYY"
              showToday={false}
              superNextIcon={<></>}
              superPrevIcon={<></>}
              onSelect={onSelect}
              disabledDate={disabledDate}
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
              prefix={prefix}
            />
          </label>
        </>
      );
  }
};

export default Input;
