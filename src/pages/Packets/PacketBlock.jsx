import React from "react";
import { Row } from "antd";
import { info, kkal } from "assets/icons";
import { hexToRgbA } from "common/helpers";

const PacketBlock = ({
  image,
  ingredient,
  calValue,
  name,
  category,
  calorie,
}) => {
  const backgroundColor = hexToRgbA(category?.color);

  return (
    <div className="packets__foods-block" style={{ backgroundColor }}>
      <div className="packets__foods-img">
        <img src={image} alt="packet" />
      </div>
      <div className="packets__foods-about">
        <Row justify="space-between" align="middle">
          <h2 className="packets__foods-title">{name}</h2>
          <Row align="middle">
            <p
              className="packets__foods-type"
              style={{ color: category?.color }}
            >
              {category?.name}
            </p>
            <img src={info} alt="type" className="packets__foods-info" />
          </Row>
        </Row>
        <Row>
          <p className="packets__foods-text">{ingredient}</p>
        </Row>
        <Row justify="end" align="middle">
          <p className="packets__foods-kkal">{calorie}</p>
          <img src={kkal} alt="kkal" />
        </Row>
      </div>
    </div>
  );
};

export default PacketBlock;
