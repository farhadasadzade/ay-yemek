import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMount, useUnmount, useMemoizedFn, useUpdateEffect } from "ahooks";
import { isEmpty, trim, lowerCase } from "lodash";
import { Toast } from "common/components";
import i18n from "i18next";
import { logo } from "assets/images";
import { api } from "common/api/api";
import { Row } from "antd";
import { Input, Button, RenderIf } from "common/components";
import OTP from "../Register/OTP";
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

const PHONE_REGEX =
  "(?:12|51|50|55|70|77)[^w]{0,2}[2-9][0-9]{2}[^w]{0,2}[0-9]{2}[^w]{0,2}[0-9]{2}";

const Login = () => {
  const schema = yup.object().shape({
    phone: yup
      .string()
      .required()
      .matches(PHONE_REGEX, "Phone number is not valid")
      .min(9)
      .max(9),
    password: yup.string().required(),
  });

  const { t } = i18n;
  const language = lowerCase(localStorage.getItem("lang"));
  const history = useHistory();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [login, loginState] = api.useLoginMutation();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isVerifyRequired, setVerifyRequired] = React.useState(false);
  const [phoneState, setPhoneState] = React.useState("");

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);
  });

  const handleSumbitLogin = useMemoizedFn(() => {
    const { password, phone } = methods.getValues();

    setPhoneState(`+994${phone}`);

    login({
      body: {
        phone: `+994${phone}`,
        password,
      },
      language,
    });
  });

  React.useEffect(() => {
    methods.register("email");
    methods.register("phone");
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
        localStorage.setItem("userToken", loginState.data?.data);

        setTimeout(() => history.push("/home"), 1000);
      }

      if (loginState.isError) {
        Toast.fire({
          icon: "error",
          title: t("emailOrPassIncorrect"),
        });
      }

      if (loginState.status === 302) {
        setVerifyRequired(true);

        Toast.fire({
          icon: "warning",
          title: t("verifyYourAccount"),
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
      {isVerifyRequired ? (
        <OTP phone={phoneState} />
      ) : (
        <div className="register">
          <div className="register__form">
            <RenderIf condition={windowWidth >= 1000}>
              <Link to="/home">
                <img className="mb-4" src={logo} alt="logo" />
              </Link>
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
                  type="phone"
                  label={`${t("phone")} (+994XXXXXXXXX)`}
                  isRequired
                  placeholder={t("enterYourPhone")}
                  onChange={(e) => handleChangeInput(e, "phone")}
                  error={!isEmpty(methods.formState.errors.phone)}
                  prefix="+994"
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
      )}
      <RenderIf condition={windowWidth < 1000}>
        <Footer />
      </RenderIf>
    </>
  );
};

export default Login;
