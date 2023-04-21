import React from "react";
import i18n from "i18next";
import { Row } from "antd";
import ChoosenMeals from "./ChoosenMeals";

const PricesMobile = ({
  onClose,
  selectedMeals,
  handleDeleteMeal,
  selectedPackageId,
  orderId,
}) => {
  const { t } = i18n;

  return (
    <div className={`prices__mobile`}>
      <Row align="middle" onClick={onClose}>
        <svg
          style={{ cursor: "pointer" }}
          onClick={onClose}
          width="25"
          height="18"
          viewBox="0 0 25 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-3"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.63859 0.448937C8.17098 -0.142103 7.40593 -0.150659 6.92982 0.429826L0.778299 7.92983C0.546968 8.21187 0.416655 8.59749 0.416655 9C0.416655 9.40251 0.546968 9.78813 0.778299 10.0702L6.92982 17.5702C7.40593 18.1507 8.17098 18.1421 8.63859 17.5511C9.1062 16.96 9.09931 16.0103 8.6232 15.4298L4.57974 10.5L23.375 10.5C24.0423 10.5 24.5833 9.82843 24.5833 9C24.5833 8.17157 24.0423 7.5 23.375 7.5L4.57974 7.5L8.6232 2.57017C9.09931 1.98969 9.1062 1.03998 8.63859 0.448937Z"
            fill="#006DB8"
          />
        </svg>
        <p className="prices__mobile-back">{t("choosenMeals")}</p>
      </Row>
      <div>
        <ChoosenMeals
          isTitleHidden
          selectedMeals={selectedMeals}
          handleDeleteMeal={handleDeleteMeal}
          selectedPackageId={selectedPackageId}
          orderId={orderId}
        />
      </div>
    </div>
  );
};

export default PricesMobile;
