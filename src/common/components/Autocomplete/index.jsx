import React from "react";
import { AutoComplete, Row } from "antd";
import "./style/index.scss";

const Autocomplete = ({
  onChange,
  dataSource,
  onSelect,
  placeholder,
  label,
  isRequired,
  value,
  status,
}) => {
  return (
    <label className="coreinput-label">
      <Row className="coreinput-label mb-2">
        {label}{" "}
        <span style={{ color: "#D0011A" }}>{isRequired ? "*" : ""}</span>
      </Row>
      <AutoComplete
        className="autocomplete"
        options={dataSource}
        allowClear
        onChange={onChange}
        onSelect={onSelect}
        style={{ width: "100%" }}
        placeholder={placeholder}
        value={value}
        status={status}
      />
    </label>
  );
};

export default Autocomplete;
