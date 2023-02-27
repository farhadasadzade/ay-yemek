import React from "react";
import i18n from "i18next";
import { Row } from "antd";
import { info, kkal } from "assets/icons";

const PacketBlock = ({
  handleSelectMeal,
  img_url,
  description,
  id,
  name,
  category_name,
  meal_type_id,
}) => {
  const { t } = i18n;

  return (
    <div className="packets__foods-block">
      <div className="packets__foods-img">
        <img
          src={`${process.env.REACT_APP_BASE_IMG_URL}${img_url}`}
          alt="packet"
        />
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
        <Row justify="space-between">
          <Row
            onClick={() => handleSelectMeal({ id, name, meal_type_id })}
            style={{ cursor: "pointer" }}
            align="middle"
          >
            <button className="packets__foods-btn me-2">+</button>
            <p className="packets__foods-btn-text me-2">{t("add")}</p>
          </Row>
          <Row justify="end" align="middle">
            <p className="packets__foods-kkal">{500}</p>
            <img src={kkal} alt="kkal" />
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default PacketBlock;
