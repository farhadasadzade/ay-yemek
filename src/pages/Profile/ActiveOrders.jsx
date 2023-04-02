import { Row } from "antd";
import React from "react";
import { Typography } from "common/components";
import emptyResult from "assets/images/emptyResult.png";

const EmptyResult = () => {
  return (
    <>
      <Row className="mb-4" justify="center">
        <img src={emptyResult} alt="" />
      </Row>
      <Row className="mb-3" justify="center">
        <h2 className="empty__result-title">Aktiv Sifarişiniz Tapılmadı</h2>
      </Row>
      <Row justify="center">
        <p className="empty__result-text">
          Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
          ullamcorper .
        </p>
      </Row>
    </>
  );
};

const ActiveOrders = () => {
  return (
    <div className="profile__main">
      <EmptyResult />
    </div>
  );
};

export default ActiveOrders;
