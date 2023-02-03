import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMount, useUnmount, useMemoizedFn, useUpdateEffect } from "ahooks";
import { isEmpty, trim } from "lodash";
import { Toast } from "common/components";
import i18n from "i18next";
import { logo } from "assets/images";
import { apiAuth } from "common/api/apiAuth";
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

const linkStyle = {
  fontFamily: "Archivo",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "15px",
  textAlign: "center",
  color: "#00072D",
};

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { t } = i18n;
  const history = useHistory();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [login, loginState] = apiAuth.useLoginMutation();

  const [windowWidth, setWindowWidth] = React.useState(0);

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);
  });

  const handleSumbitLogin = useMemoizedFn(() => {
    const { password, email } = methods.getValues();

    login({
      email,
      password,
    });
  });

  React.useEffect(() => {
    methods.register("email");
    methods.register("password");
  }, [methods]);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
  });

  useUpdateEffect(() => {
    if (!loginState.isLoading) {
      if (loginState.isSuccess) {
        localStorage.setItem("user", loginState.data?.token);

        setTimeout(() => history.push("/home"), 1000);
      }

      if (loginState.isError) {
        Toast.fire({
          icon: "error",
          title: t("emailOrPassIncorrect"),
        });
      }
    }
  }, [loginState.isLoading]);

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
          <form onSubmit={methods.handleSubmit(handleSumbitLogin)}>
            <Row className="mb-3">
              <Input
                type="email"
                label={t("email")}
                name="email"
                isRequired
                placeholder={t("enterYourEmail")}
                onChange={(e) => handleChangeInput(e, "email")}
                error={!isEmpty(methods.formState.errors.email)}
              />
            </Row>
            <Row className="mb-3">
              <Input
                type="password"
                label={t("password")}
                name="password"
                isRequired
                placeholder={t("enterYourPassword")}
                onChange={(e) => handleChangeInput(e, "password")}
                error={!isEmpty(methods.formState.errors.password)}
              />
            </Row>
            <Row className="mt-5 mb-5">
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                type="primary"
                isLoading={loginState.isLoading}
              >
                {t("loginNow")}
              </Button>
            </Row>
          </form>
          <Row className="mt-5" justify="center" align="middle">
            <p className="me-2" style={linkStyle}>
              {t("dontHaveAccount")}
            </p>
            <Link style={{ ...linkStyle, color: "#F75C03" }} to="/register">
              {t("registerNow2")}
            </Link>
          </Row>
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
