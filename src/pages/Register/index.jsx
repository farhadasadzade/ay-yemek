import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import moment from "moment/moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, trim } from "lodash";
import { useMount, useUnmount, useMemoizedFn, useUpdateEffect } from "ahooks";
import i18n from "i18next";
import { logo } from "assets/images";
import { Col, Row } from "antd";
import { Input, Button, RenderIf, Toast } from "common/components";
import { Footer, Header } from "modules";
import { apiAuth } from "common/api/apiAuth";
import "./style/index.scss";

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

const PHONE_REGEX =
  "(?:12|51|50|55|70|77)[^w]{0,2}[2-9][0-9]{2}[^w]{0,2}[0-9]{2}[^w]{0,2}[0-9]{2}";

const Register = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    surname: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password too short")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number"),
    birthDate: yup.string().required(),
    phone: yup
      .string()
      .required()
      .matches(PHONE_REGEX, "Phone number is not valid")
      .min(9)
      .max(9),
    address: yup.string().required(),
  });

  const { t } = i18n;
  const history = useHistory();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [register, registerState] = apiAuth.useRegisterMutation();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [birthDate, setBirthDate] = React.useState(null);

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);
  });

  const handleSumbitRegistration = useMemoizedFn(() => {
    const { name, surname, password, email, phone, address } =
      methods.getValues();

    register({
      name,
      surname,
      email,
      password,
      phone: `994${phone}`,
      address,
      bdate: birthDate,
    });
  });

  const handleSelectBirthDate = useMemoizedFn((val) => {
    const day = val.$d.getDate();
    const month = val.$d.getMonth() + 1;
    const year = val.$d.getFullYear();

    setBirthDate(`${day}${month}${year}`);
    methods.setValue("birthDate", val);
  });

  React.useEffect(() => {
    methods.register("name");
    methods.register("surname");
    methods.register("email");
    methods.register("password");
    methods.register("phone");
    methods.register("address");
  }, [methods]);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
  });

  useUpdateEffect(() => {
    if (!registerState.isLoading) {
      if (registerState.isSuccess) {
        Toast.fire({
          icon: "success",
          title: t("registrationSuccess"),
        });

        setTimeout(() => {
          localStorage.setItem("user", registerState.data?.token);
          history.push("/home");
        }, 1000);
      }

      if (registerState.isError) {
        Toast.fire({
          icon: "error",
          title: t("emailIsUsedAlready"),
        });
      }
    }
  }, [registerState.isLoading]);

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
            <h1>{t("register")}</h1>
          </Row>
          <RenderIf condition={windowWidth < 1000}>
            <Row className="mb-3">
              <p>Lorem Ipsum is simply dummy text of the printing</p>
            </Row>
          </RenderIf>
          <form onSubmit={methods.handleSubmit(handleSumbitRegistration)}>
            <RenderIf condition={windowWidth >= 1000}>
              <Row className="mb-3" gutter={32}>
                <Col span={12}>
                  <Input
                    name="name"
                    placeholder={t("enterYourName")}
                    isRequired
                    label={t("name")}
                    onChange={(e) => handleChangeInput(e, "name")}
                    error={!isEmpty(methods.formState.errors.name)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="surname"
                    placeholder={t("enterYourSurname")}
                    isRequired
                    label={t("surname")}
                    onChange={(e) => handleChangeInput(e, "surname")}
                    error={!isEmpty(methods.formState.errors.surname)}
                  />
                </Col>
              </Row>
            </RenderIf>
            <RenderIf condition={windowWidth < 1000}>
              <Row className="mb-3">
                <Input
                  name="name"
                  placeholder={t("enterYourName")}
                  isRequired
                  label={t("name")}
                  onChange={(e) => handleChangeInput(e, "name")}
                  error={!isEmpty(methods.formState.errors.name)}
                />
              </Row>
              <Row className="mb-3">
                <Input
                  name="surname"
                  placeholder={t("enterYourSurname")}
                  isRequired
                  label={t("surname")}
                  onChange={(e) => handleChangeInput(e, "surname")}
                  error={!isEmpty(methods.formState.errors.surname)}
                />
              </Row>
            </RenderIf>
            <Row className="mb-3">
              <Input
                type="datepicker"
                name="birthDate"
                isRequired
                label={t("birthDate")}
                onSelect={handleSelectBirthDate}
                error={!isEmpty(methods.formState.errors.birthDate)}
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current >= moment(customDate, "YYYY-MM-DD");
                }}
              />
            </Row>
            <Row className="mb-3">
              <Input
                type="password"
                label={t("password")}
                isRequired
                placeholder={t("enterYourPassword")}
                onChange={(e) => handleChangeInput(e, "password")}
                error={!isEmpty(methods.formState.errors.password)}
              />
            </Row>
            <Row className="mb-3">
              <Input
                type="email"
                label={t("email")}
                isRequired
                placeholder={t("enterYourEmail")}
                onChange={(e) => handleChangeInput(e, "email")}
                error={!isEmpty(methods.formState.errors.email)}
              />
            </Row>
            <Row className="mb-3">
              <Input
                type="phone"
                label={t("phone")}
                isRequired
                placeholder={t("enterYourPhone")}
                onChange={(e) => handleChangeInput(e, "phone")}
                error={!isEmpty(methods.formState.errors.phone)}
                prefix="+994"
              />
            </Row>
            <Row className="mb-3">
              <Input
                type="text"
                label={t("address")}
                isRequired
                placeholder={t("enterYourAddress")}
                onChange={(e) => handleChangeInput(e, "address")}
                error={!isEmpty(methods.formState.errors.address)}
              />
            </Row>
            <Row className="mt-5">
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                type="primary"
                isLoading={registerState.isLoading}
              >
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
      <RenderIf condition={windowWidth < 1000}>
        <Footer />
      </RenderIf>
    </>
  );
};

export default Register;
