import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import Cookies from "js-cookie";
import { useMemoizedFn, useMount, useUnmount, useUpdateEffect } from "ahooks";
import { isEmpty, lowerCase, trim } from "lodash";
import { Row, Col } from "antd";
import { Input, Button, Toast } from "common/components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from "i18next";
import { api } from "common/api/api";

const ChangePassword = ({ phone }) => {
  const { t } = i18n;
  const language = lowerCase(localStorage.getItem("lang"));
  const history = useHistory();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(8, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number"),
    password_confirmation: yup
      .string()
      .required()
      .min(8, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number"),
    otp: yup.number().required(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [resetPassword, resetState] = api.useResetPasswordMutation();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [inputValues, setInputValues] = React.useState({
    password: "",
  });

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);

    setInputValues({ ...inputValues, [name]: e.target.value });
  });

  const handleSubmitForgotPassword = useMemoizedFn(() => {
    const { otp, password } = methods.getValues();

    resetPassword({
      language,
      body: {
        phone,
        otp_code: otp,
        password,
      },
    });
  });

  React.useEffect(() => {
    methods.register("otp");
    methods.register("password");
    methods.register("password_confirmation");
  }, [methods]);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  useUpdateEffect(() => {
    if (!resetState.isLoading && resetState.isSuccess) {
      Cookies.set("userToken", resetState.data?.data);
      history.push("/home");

      Toast.fire({
        icon: "success",
        title: resetState.data?.message,
      });
    }
  }, [resetState.isLoading]);

  return (
    <>
      <Row justify="center">
        <Col span={windowWidth > 1000 ? 8 : 22}>
          <form onSubmit={methods.handleSubmit(handleSubmitForgotPassword)}>
            <Row className="mb-3">
              <Input
                type="number"
                label="OTP"
                isRequired
                placeholder={t("verifyOTP")}
                onChange={(e) => handleChangeInput(e, "otp")}
                error={!isEmpty(methods.formState.errors.otp)}
              />
            </Row>
            <Row className="mb-3" justify="center">
              <Input
                label={t("newPassword")}
                type="password"
                onChange={(e) => handleChangeInput(e, "password")}
                name="password"
                error={!isEmpty(methods.formState.errors.password)}
                inputValue={inputValues?.password}
              />
            </Row>
            <Row justify="start" className="mb-3">
              <PasswordChecklist
                rules={["minLength", "number", "capital"]}
                minLength={8}
                value={inputValues?.password}
                messages={{
                  capital: t("passwordCapital"),
                  number: t("passwordNumber"),
                  minLength: t("passwordMinLength"),
                }}
              />
            </Row>
            <Row className="mb-3" justify="center">
              <Input
                label={t("newPasswordAgain")}
                type="password"
                onChange={(e) => handleChangeInput(e, "password_confirmation")}
                name="password_confirmation"
                error={!isEmpty(methods.formState.errors.password_confirmation)}
                inputValue={inputValues?.password_confirmation}
              />
            </Row>
            <Row className="mt-5 mb-5">
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                type="primary"
                isLoading={false}
              >
                {t("forgotPasswordTitle")}
              </Button>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
