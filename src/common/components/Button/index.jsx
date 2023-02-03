import React from "react";
import { Button as CoreButton } from "antd";
import "./style/index.scss";

const Button = ({
  children,
  className,
  type,
  onClick,
  htmlType,
  style,
  isLoading,
}) => {
  return (
    <CoreButton
      className={`button button-${type} ${className}`}
      onClick={onClick}
      htmlType={htmlType}
      style={{ ...style }}
    >
      {isLoading ? <div className="button-loader"></div> : children}
    </CoreButton>
  );
};

export default Button;
