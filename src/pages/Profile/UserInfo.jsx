import React from "react";
import i18n from "i18next";
import { Row } from "antd";

const UserInfo = () => {
  const { t } = i18n;

  return (
    <div className="profile__main">
      <Row>
        <h1 className="profile__main-title">{t("choosenCategory")}</h1>
      </Row>
    </div>
  );
};

export default UserInfo;
