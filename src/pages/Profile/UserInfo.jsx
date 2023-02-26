import React from "react";
import i18n from "i18next";
import { Col, Row } from "antd";
import { Button, Input } from "common/components";
import { plusOrange } from "assets/icons";

const UserInfo = () => {
  const { t } = i18n;

  return (
    <div className="profile__main">
      <Row>
        <h1 className="profile__main-title">{t("choosenCategory")}</h1>
      </Row>
      <Row className="mb-3" align="middle" justify="space-between">
        <h2 className="profile__main-name">
          Ekonom (10 gunluk){" "}
          <span>etibarlidir 17 Yanvar 2023 - 27 Yanvar 2023</span>
        </h2>
        <Button type="secondary">{t("updatePackage")}</Button>
      </Row>
      <button className="profile__main-addPacket">
        <Row align="middle">
          <img className="me-2" src={plusOrange} alt="plus" />
          {t("addNewPackage")}
        </Row>
      </button>
      <Row className="mb-3" gutter={24}>
        <Col span={12}>
          <Input type="text" label={t("name")} />
        </Col>
        <Col span={12}>
          <Input type="text" label={t("surname")} />
        </Col>
      </Row>
      <Row className="mb-3" gutter={24}>
        <Col span={12}>
          <Input type="password" label={t("password")} />
        </Col>
        <Col span={12}>
          <Input type="email" label={t("email")} />
        </Col>
      </Row>
      <Row className="mb-3" gutter={24}>
        <Col span={12}>
          <Input type="datepicker" label={t("birthDate")} />
        </Col>
        <Col span={12}>
          <Input type="text" label={t("address")} />
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
