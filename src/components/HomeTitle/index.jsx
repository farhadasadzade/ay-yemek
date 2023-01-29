import React from "react";
import { Typography } from "common/components";
import { Row } from "antd";
import "./style/index.scss";

const HomeTitle = ({ title, subtitle }) => {
  return (
    <Row align="middle" style={{ flexDirection: "column" }}>
      <Typography className="home__title">{title}</Typography>
      <Typography className="home__subtitle">{subtitle}</Typography>
    </Row>
  );
};

export default HomeTitle;
