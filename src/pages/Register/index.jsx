import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import * as yup from "yup";
import moment from "moment/moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, trim, lowerCase } from "lodash";
import Swal from "sweetalert2";
import {
  useMount,
  useUnmount,
  useMemoizedFn,
  useUpdateEffect,
  useToggle,
} from "ahooks";
import i18n from "i18next";
import { logo } from "assets/images";
import { Checkbox, Col, Row } from "antd";
import { Input, Button, RenderIf, Toast } from "common/components";
import Rules from "./Rules";
import { Footer, Header, Map } from "modules";
import OTP from "./OTP";
import "./style/index.scss";
import { api } from "common/api/api";

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
    rule: yup
      .boolean()
      .required("The terms and conditions must be accepted.")
      .oneOf([true], "The terms and conditions must be accepted."),
  });

  const language = lowerCase(localStorage.getItem("lang"));

  const { t } = i18n;
  const history = useHistory();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [isRuleModalVisible, { toggle: toggleRuleModal }] = useToggle();

  const [register, registerState] = api.useRegisterMutation();

  const [phoneState, setPhoneState] = React.useState("");
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [birthDate, setBirthDate] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isAddressDenied, setAddressDenied] = React.useState(true);
  const [addressError, setAddressError] = React.useState(false);
  const [isRegistrationSuccess, setRegistrationSuccess] = React.useState(false);

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);

    if (name === "password") {
      setPassword(trim(e.target.value));
    }
  });

  const handleChangeRule = useMemoizedFn((val) => {
    methods.setValue("rule", val);
    methods.clearErrors("rule");
  });

  const getPosition = useMemoizedFn((pos, address) => {
    setAddress({ pos, address });

    if (!isEmpty(pos)) {
      setAddressError(false);
    }
    return { pos, address };
  });

  const getIsAddressDenied = useMemoizedFn((denied) => {
    setAddressDenied(denied);
  });

  const handleSumbitRegistration = useMemoizedFn(() => {
    const { name, surname, password, email, phone } = methods.getValues();

    if (isAddressDenied) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("mapPolygonError"),
      });

      return;
    }

    setPhoneState(`+994${phone}`);

    register({
      body: {
        name,
        surname,
        email,
        password,
        phone: `+994${phone}`,
        address: address?.address,
        birthdate: birthDate,
        latitude: address?.pos?.lat,
        longitude: address?.pos?.lng,
      },
      language,
    });
  });

  const handleSelectBirthDate = useMemoizedFn((val) => {
    const day =
      val.$d.getDate() < 9 ? `0${val.$d.getDate()}` : val.$d.getDate();
    const month =
      val.$d.getMonth() < 9
        ? `0${val.$d.getMonth() + 1}`
        : val.$d.getMonth() + 1;
    const year = val.$d.getFullYear();

    setBirthDate(`${year}-${month}-${day}`);
    methods.setValue("birthDate", val);
  });

  React.useEffect(() => {
    methods.register("name");
    methods.register("surname");
    methods.register("email");
    methods.register("password");
    methods.register("phone");
    methods.register("rule");
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
        setRegistrationSuccess(true);
      }

      if (registerState.error?.status === 302) {
        setRegistrationSuccess(true);

        return;
      }

      if (registerState.error?.status === 401) {
        Toast.fire({
          icon: "error",
          title: t("emailIsUsedAlready"),
        });

        return;
      }

      if (registerState.isError) {
        Toast.fire({
          icon: "error",
          title: t("anErrorOccurred"),
        });
      }
    }
  }, [registerState.isLoading]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <>
        <RenderIf condition={windowWidth < 1000}>
          <Header />
        </RenderIf>
        {isRegistrationSuccess ? (
          <OTP phone={phoneState} />
        ) : (
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
                      return (
                        current && current >= moment().subtract(16, "years")
                      );
                    }}
                  />
                </Row>
                <Row className="mb-2">
                  <Input
                    type="password"
                    label={t("password")}
                    isRequired
                    placeholder={t("enterYourPassword")}
                    onChange={(e) => handleChangeInput(e, "password")}
                    error={!isEmpty(methods.formState.errors.password)}
                    maxLength={15}
                  />
                </Row>
                <Row className="mb-3">
                  <PasswordChecklist
                    rules={["minLength", "number", "capital"]}
                    minLength={8}
                    value={password}
                    messages={{
                      capital: t("passwordCapital"),
                      number: t("passwordNumber"),
                      minLength: t("passwordMinLength"),
                    }}
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
                    label={`${t("phone")} (+994XXXXXXXXX)`}
                    isRequired
                    placeholder={t("enterYourPhone")}
                    onChange={(e) => handleChangeInput(e, "phone")}
                    error={!isEmpty(methods.formState.errors.phone)}
                    prefix="+994"
                  />
                </Row>
                <Map
                  getPosition={getPosition}
                  getIsAddressDenied={getIsAddressDenied}
                  status={addressError}
                />
                <Row className="my-3" align="middle">
                  <Checkbox
                    name="rule"
                    className={`me-2 ${
                      !isEmpty(methods.formState.errors.rule)
                        ? "error-checkbox"
                        : ""
                    }`}
                    defaultChecked={false}
                    onChange={(e) => handleChangeRule(e.target.checked)}
                  />
                  {language === "az" ? (
                    <p>
                      <span
                        onClick={toggleRuleModal}
                        style={{ color: "#f75c03", cursor: "pointer" }}
                      >
                        {t("rules")}
                      </span>{" "}
                      {t("agree")}
                    </p>
                  ) : (
                    <p>
                      {t("agree")}{" "}
                      <span
                        onClick={toggleRuleModal}
                        style={{ color: "#f75c03", cursor: "pointer" }}
                      >
                        {t("rules")}
                      </span>
                    </p>
                  )}
                </Row>
                <Row className="mt-5">
                  <Button
                    htmlType="submit"
                    style={{ width: "100%" }}
                    type="primary"
                    isLoading={registerState.isLoading}
                    onClick={() => {
                      if (isEmpty(address)) {
                        setAddressError(true);
                        return;
                      }
                      setAddressError(false);
                    }}
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
        )}
        <RenderIf condition={windowWidth < 1000}>
          <Footer />
        </RenderIf>
      </>
      <Rules visible={isRuleModalVisible} toggleRuleModal={toggleRuleModal} />
    </>
  );
};

export default Register;
