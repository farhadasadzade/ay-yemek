import React from "react";
import i18n from "i18next";
import { logo } from "assets/images";
import "./style/index.scss";
import { Col, Row } from "antd";
import { Input } from "common/components";

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

  return (
    <div className="register">
      <div className="register__form">
        <img className="mb-4" src={logo} alt="logo" />
        <button className="register__form-back mb-5">
          <BackArrow />
        </button>
        <h1 className="mb-3">{t("register")}</h1>
        <form>
          <Row gutter={32}>
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
          <Row>
            <Input type="datepicker" />
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
