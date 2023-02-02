import React from "react";
import { useHistory } from "react-router-dom";
import { useMount, useUnmount } from "ahooks";
import i18n from "i18next";
import { logo } from "assets/images";
import { Row } from "antd";
import { Input, Button, RenderIf } from "common/components";
import { Footer, Header } from "modules";

const BackArrow = ({ stroke, className }) => (
  <svg
    width="17"
    height="14"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.19329 7.2119L15.2744 7.2119"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.87244 1.55653L1.19305 7.21151L6.87244 12.8674"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Login = () => {
  const { t } = i18n;
  const history = useHistory();

  const [windowWidth, setWindowWidth] = React.useState(0);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <RenderIf condition={windowWidth < 1000}>
        <Header />
      </RenderIf>
      <div className="register">
        <div className="register__form">
          <RenderIf condition={windowWidth >= 1000}>
            <img className="mb-4" src={logo} alt="logo" />
          </RenderIf>
          <RenderIf condition={windowWidth >= 1000}>
            <button
              className="register__form-back mb-5"
              onClick={() => history.goBack()}
            >
              <BackArrow stroke="black" />
            </button>
          </RenderIf>
          <Row align="middle" className="mb-3">
            <RenderIf condition={windowWidth < 1000}>
              <BackArrow className="me-3" stroke="#006DB8" />
            </RenderIf>
            <h1>{t("loginNow")}</h1>
          </Row>
          <RenderIf condition={windowWidth < 1000}>
            <Row className="mb-3">
              <p>Lorem Ipsum is simply dummy text of the printing</p>
            </Row>
          </RenderIf>
          <form>
            <Row className="mb-3">
              <Input
                type="email"
                label={t("email")}
                isRequired
                placeholder={t("enterYourEmail")}
              />
            </Row>
            <Row className="mb-3">
              <Input
                type="password"
                label={t("password")}
                isRequired
                placeholder={t("enterYourPassword")}
              />
            </Row>
            <Row className="mt-5">
              <Button style={{ width: "100%" }} type="primary">
                {t("loginNow")}
              </Button>
            </Row>
          </form>
        </div>
        <div className="register__back">
          <h1>{t("registerTitle")}</h1>
          <p>{t("registerText")}</p>
        </div>
      </div>
      <RenderIf condition={windowWidth < 1000}>
        <Footer />
      </RenderIf>
    </>
  );
};

export default Login;
