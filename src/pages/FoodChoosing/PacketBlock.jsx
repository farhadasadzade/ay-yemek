import React from "react";
import i18n from "i18next";
import { Row } from "antd";
import { info, kkal } from "assets/icons";
import { hexToRgbA } from "common/helpers";
import { useMemoizedFn } from "ahooks";
import Swal from "sweetalert2";
import moment from "moment";

const PacketBlock = ({
  image,
  ingredient,
  name,
  category,
  calorie,
  handleSelectMeal,
  id,
  typeId,
  isDisabledByStatus,
}) => {
  const { t } = i18n;

  const backgroundColor = hexToRgbA(category?.color);

  const handleAddMeal = useMemoizedFn(() => {
    if (
      moment()?.isBetween(moment("21:00", "hh:mm"), moment("24:00", "hh:mm"))
    ) {
      Swal.fire({
        icon: "warning",
        title: t("warningMessageByTime"),
      });
      return;
    }

    if (isDisabledByStatus) {
      Swal.fire({
        icon: "warning",
        title: t("warningMessageByStatus"),
      });
      return;
    }
    handleSelectMeal({ id, name, typeId });
  });

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
        <Row justify="space-between">
          <Row
            onClick={handleAddMeal}
            style={{ cursor: "pointer" }}
            align="middle"
          >
            <button className="packets__foods-btn me-2">+</button>
            <p className="packets__foods-btn-text me-2">{t("add")}</p>
          </Row>
          <Row justify="end" align="middle">
            <p className="packets__foods-kkal">{calorie}</p>
            <img src={kkal} alt="kkal" />
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default PacketBlock;
