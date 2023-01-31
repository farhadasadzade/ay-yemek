import React from "react";
import { Row } from "antd";
import "./style/index.scss";

const BlockContainer = ({ title, subtitle, children }) => {
  return (
    <div className="blockcontainer">
      <Row>
        <h1 className="blockcontainer__title">{title}</h1>
      </Row>
      <Row>
        <p className="blockcontainer__subtitle">{subtitle}</p>
      </Row>
      {children}
    </div>
  );
};

export default BlockContainer;
