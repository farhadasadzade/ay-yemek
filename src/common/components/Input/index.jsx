import React from "react";
import { includes } from "lodash";
import { Input as CoreInput, DatePicker } from "antd";
import "./style/index.scss";

const { TextArea } = CoreInput;

const { RangePicker } = DatePicker;

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
  value,
  open,
  onOpenChange,
  maxLength,
  ref,
  disabledDates,
  defaultPickerValue,
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
              placeholder="2000-01-01"
              format="YYYY-MM-DD"
              showToday={false}
              superNextIcon={<></>}
              superPrevIcon={<></>}
              onSelect={onSelect}
              disabledDate={disabledDate}
              value={defaultPickerValue}
            />
          </label>
        </>
      );
    case "rangeDatepicker":
      return (
        <>
          <label className="coreinput-label" htmlFor={name}>
            {label}{" "}
            <span style={{ color: "#D0011A" }}>{isRequired ? "*" : ""}</span>
            <RangePicker
              className={`coreinput ${error ? "coreinput-error" : ""}`}
              name={name}
              id={name}
              placeholder={["05.09.1999", "05.09.1999"]}
              format="DD/MM/YYYY"
              showToday={false}
              superNextIcon={<></>}
              superPrevIcon={<></>}
              disabledDate={(current) =>
                includes(
                  disabledDates.map((date) => date.format("YYYY-MM-DD")),
                  current.format("YYYY-MM-DD")
                ) ||
                current.format("YYYY-MM-DD") < value[0].format("YYYY-MM-DD") ||
                current.format("YYYY-MM-DD") > value[1].format("YYYY-MM-DD")
              }
              value={value}
              open={open}
              onOpenChange={onOpenChange}
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
              maxLength={maxLength}
              ref={ref}
            />
          </label>
        </>
      );
  }
};

export default Input;
