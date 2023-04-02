import React from "react";
import i18n from "i18next";
import { lowerCase, isEmpty, trim } from "lodash";
import { useMount, useUnmount } from "ahooks";
import { Input, Button, Toast } from "common/components";
import PasswordChecklist from "react-password-checklist";
import { api } from "common/api/api";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateEffect } from "ahooks";

const ChangePassword = () => {
  const { t } = i18n;

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
    old_password: yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = localStorage.getItem("userToken");

  const [inputValues, setInputValues] = React.useState({
    password: "",
  });
  const [windowWidth, setWindowWidth] = React.useState(0);

  const [changePassword, passwordState] = api.useChangePassowordMutation();

  const handleChangePassword = () => {
    changePassword({
      language,
      userToken: `Bearer ${userToken}`,
      body: {
        old_password: inputValues?.old_password,
        password: inputValues?.password,
        password_confirmation: inputValues?.password_confirmation,
      },
    });
  };

  const handleChangeInput = (e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);

    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  React.useEffect(() => {
    methods.register("old_password");
    methods.register("password");
    methods.register("password_confirmation");
  }, [methods]);

  useUpdateEffect(() => {
    if (!passwordState.isLoading && passwordState.isSuccess) {
      Toast.fire({
        icon: "success",
        title: passwordState.data?.message,
      });

      setInputValues({ password: "" });
      methods.reset();
    }
  }, [passwordState.isLoading]);

  useUpdateEffect(() => {
    if (!passwordState.isLoading && passwordState.isError) {
      Toast.fire({
        icon: "error",
        title: passwordState.error?.data?.message,
      });

      setInputValues({ password: "" });
      methods.reset();
    }
  }, [passwordState.isLoading]);

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

  return (
    <div className="profile__main">
      <form onSubmit={methods.handleSubmit(handleChangePassword)}>
        <Row className="mb-3" justify="center">
          <Col span={windowWidth > 1000 ? 12 : 22}>
            <Input
              label={t("oldPassword")}
              type="password"
              onChange={(e) => handleChangeInput(e, "old_password")}
              name="old_password"
              error={!isEmpty(methods.formState.errors.old_password)}
              inputValue={inputValues?.old_password}
            />
          </Col>
        </Row>
        <Row className="mb-3" justify="center">
          <Col span={windowWidth > 1000 ? 12 : 22}>
            <Input
              label={t("newPassword")}
              type="password"
              onChange={(e) => handleChangeInput(e, "password")}
              name="password"
              error={!isEmpty(methods.formState.errors.password)}
              inputValue={inputValues?.password}
            />
          </Col>
        </Row>
        <Row justify="center" className="mb-3">
          <Col span={windowWidth > 1000 ? 12 : 22}>
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
          </Col>
        </Row>
        <Row className="mb-3" justify="center">
          <Col span={windowWidth > 1000 ? 12 : 22}>
            <Input
              label={t("newPasswordAgain")}
              type="password"
              onChange={(e) => handleChangeInput(e, "password_confirmation")}
              name="password_confirmation"
              error={!isEmpty(methods.formState.errors.password_confirmation)}
              inputValue={inputValues?.password_confirmation}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Button htmlType="submit" type="primary">
            {t("save")}
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default ChangePassword;
