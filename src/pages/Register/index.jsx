import React from "react";
import { useHistory } from "react-router-dom";
import i18n from "i18next";
import { logo } from "assets/images";
import { Col, Row } from "antd";
import { Input, Button } from "common/components";
import "./style/index.scss";

const BackArrow = () => (
  <svg
    width="17"
    height="14"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.19329 7.2119L15.2744 7.2119"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.87244 1.55653L1.19305 7.21151L6.87244 12.8674"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Register = () => {
  const { t } = i18n;
  const history = useHistory();

  return (
    <div className="register">
      <div className="register__form">
        <img className="mb-4" src={logo} alt="logo" />
        <button
          className="register__form-back mb-5"
          onClick={() => history.goBack()}
        >
          <BackArrow />
        </button>
        <h1 className="mb-3">{t("register")}</h1>
        <form>
          <Row className="mb-3" gutter={32}>
            <Col span={12}>
              <Input
                name="name"
                placeholder="Your Name"
                isRequired
                label={t("name")}
              />
            </Col>
            <Col span={12}>
              <Input
                name="surname"
                placeholder="Your Surname"
                isRequired
                label={t("surname")}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Input type="datepicker" label={t("birthDate")} isRequired />
          </Row>
          <Row className="mb-3">
            <Input type="password" label={t("password")} isRequired />
          </Row>
          <Row className="mb-3">
            <Input type="email" label={t("email")} isRequired />
          </Row>
          <Row className="mb-3">
            <Input type="phone" label={t("phone")} isRequired />
          </Row>
          <Row className="mb-3">
            <Input type="text" label={t("address")} isRequired />
          </Row>
          <Row className="mt-5">
            <Button style={{ width: "100%" }} type="primary">
              {t("registerNow")}
            </Button>
          </Row>
        </form>
      </div>
      <div className="register__back">
        <h1>{t("registerTitle")}</h1>
        <p>{t("registerText")}</p>
      </div>
    </div>
  );
};

export default Register;
