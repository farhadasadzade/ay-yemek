import React from "react";
import moment from "moment";
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
              onChange={onChange}
              placeholder={["05.09.1999", "05.09.1999"]}
              format="DD/MM/YYYY"
              showToday={false}
              superNextIcon={<></>}
              superPrevIcon={<></>}
              onCalendarChange={onSelect}
              disabledDate={(current) => {
                let customDate = moment().format("YYYY-MM-DD");
                return current && current < moment(customDate, "YYYY-MM-DD");
              }}
              value={value}
              activePickerIndex={0}
              open={open}
              onOpenChange={onOpenChange}
              hideDisabledOptions
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
