import React from "react";
import { Row } from "antd";
import { info, kkal } from "assets/icons";
import { BASE_IMG_URL } from "shared/constants/url";

const PacketBlock = ({
  img_url,
  description,
  calValue,
  name,
  category_name,
}) => {
  return (
    <div className="packets__foods-block">
      <div className="packets__foods-img">
        <img src={`${BASE_IMG_URL}${img_url}`} alt="packet" />
      </div>
      <div className="packets__foods-about">
        <Row justify="space-between" align="middle">
          <h2 className="packets__foods-title">{name}</h2>
          <Row align="middle">
            <p className="packets__foods-type">{category_name}</p>
            <img src={info} alt="type" className="packets__foods-info" />
          </Row>
        </Row>
        <Row>
          <p className="packets__foods-text">{description}</p>
        </Row>
        <Row justify="end" align="middle">
          <p className="packets__foods-kkal">{500}</p>
          <img src={kkal} alt="kkal" />
        </Row>
      </div>
    </div>
  );
};

export default PacketBlock;
