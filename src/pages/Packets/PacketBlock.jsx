import React from "react";
import { Row } from "antd";
import { info, kkal } from "assets/icons";

const PacketBlock = ({ img, text, calValue, packetName, packetType }) => {
  return (
    <div className="packets__foods-block">
      <div className="packets__foods-img">
        <img src={img} alt="packet" />
      </div>
      <div className="packets__foods-about">
        <Row justify="space-between" align="middle">
          <h2 className="packets__foods-title">{packetName}</h2>
          <Row align="middle">
            <p className="packets__foods-type">{packetType}</p>
            <img src={info} alt="type" className="packets__foods-info" />
          </Row>
        </Row>
        <Row>
          <p className="packets__foods-text">{text}</p>
        </Row>
        <Row justify="end" align="middle">
          <p className="packets__foods-kkal">{calValue}</p>
          <img src={kkal} alt="kkal" />
        </Row>
      </div>
    </div>
  );
};

export default PacketBlock;
