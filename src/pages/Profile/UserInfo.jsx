import React from "react";
import i18n from "i18next";
import { useMount, useUnmount } from "ahooks";
import { lowerCase } from "lodash";
import { Col, Row, Form } from "antd";
import { api } from "common/api/api";
import { Button, Input } from "common/components";
import { plusOrange } from "assets/icons";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { t } = i18n;
  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = localStorage.getItem("userToken");

  const [windowWidth, setWindowWidth] = React.useState(0);

  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";

    getUserData({
      language,
      userToken: `Bearer ${userToken}`,
    });
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <div className="profile__main">
      <Row>
        <h1 className="profile__main-title">{t("choosenCategory")}</h1>
      </Row>
      <Row className="mb-3" align="middle" justify="space-between" wrap>
        <h2 className="profile__main-name">
          Ekonom (10 gunluk){" "}
          <span>etibarlidir 17 Yanvar 2023 - 27 Yanvar 2023</span>
        </h2>
        <Button type="secondary">{t("updatePackage")}</Button>
      </Row>
      <Link to="/home/categories">
        <button className="profile__main-addPacket">
          <Row align="middle">
            <img className="me-2" src={plusOrange} alt="plus" />
            {t("addNewPackage")}
          </Row>
        </button>
      </Link>
      <Form>
        <Row className="mb-3" gutter={24}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="name"
              type="text"
              label={t("name")}
              disabled
              inputValue={userDataState.data?.data?.name}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="surname"
              type="text"
              label={t("surname")}
              disabled
              inputValue={userDataState.data?.data?.surname}
            />
          </Col>
        </Row>
        <Row className="mb-3" gutter={24}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="password"
              type="password"
              label={t("password")}
              disabled
              inputValue={99999999}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="email"
              type="email"
              label={t("email")}
              disabled
              inputValue={userDataState.data?.data?.email}
            />
          </Col>
        </Row>
        <Row className="mb-3" gutter={24}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="birthDate"
              type="text"
              label={t("birthDate")}
              disabled
              inputValue={userDataState.data?.data?.birthdate}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="address"
              type="text"
              label={t("address")}
              disabled
              inputValue={userDataState.data?.data?.address}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserInfo;
