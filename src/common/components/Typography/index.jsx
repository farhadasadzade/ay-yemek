import React from "react";
import { Typography as CoreTypography } from "antd";
import "./style/index.scss";

const Typography = ({ children, className, size, weight, color }) => {
  return (
    <CoreTypography
      style={{ fontSize: size, fontWeight: weight, color }}
      className={`typography ${className}`}
    >
      {children}
    </CoreTypography>
  );
};

export default Typography;
