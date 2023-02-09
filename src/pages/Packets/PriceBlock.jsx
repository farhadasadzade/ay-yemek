import React from "react";
import { Row } from "antd";
import { Button } from "common/components";
import { wallet, azn } from "assets/icons";

const PriceBlock = ({ name, price }) => {
  return (
    <div className="packets__prices-block">
      <div className="packets__prices-top">{name}</div>
      <Row justify="center" align="middle">
        <img className="me-2" src={wallet} alt="wallet" />
        <p className="packets__prices-price">
          QIYMET: {price} <img src={azn} alt="azn" />
        </p>
      </Row>
      <Row justify="center">
        <Button type="secondary">Paketi sec</Button>
      </Row>
    </div>
  );
};

export default PriceBlock;
