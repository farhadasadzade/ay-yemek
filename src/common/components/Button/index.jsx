import React from "react";
import { Button as CoreButton } from "antd";
import "./style/index.scss";

const Button = ({ children, className, type, onClick, htmlType }) => {
  return (
    <CoreButton
      className={`button button-${type} ${className}`}
      onClick={onClick}
      htmlType={htmlType}
    >
      {children}
    </CoreButton>
  );
};

export default Button;
