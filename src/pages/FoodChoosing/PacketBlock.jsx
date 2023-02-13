import React from "react";
import i18n from "i18next";
import { Row } from "antd";
import { info, kkal } from "assets/icons";

const PacketBlock = ({ img, text, calValue, packetName, packetType }) => {
  const { t } = i18n;

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
        <Row justify="space-between">
          <Row
            onClick={() => console.log()}
            style={{ cursor: "pointer" }}
            align="middle"
          >
            <button className="packets__foods-btn me-2">+</button>
            <p className="packets__foods-btn-text me-2">{t("add")}</p>
          </Row>
          <Row justify="end" align="middle">
            <p className="packets__foods-kkal">{calValue}</p>
            <img src={kkal} alt="kkal" />
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default PacketBlock;
