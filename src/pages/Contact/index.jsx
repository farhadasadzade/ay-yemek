import React from "react";
import { useForm } from "react-hook-form";
import { isEmpty, trim, lowerCase } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from "i18next";
import { Col, Row } from "antd";
import { api } from "common/api/api";
import { useMemoizedFn, useMount, useUnmount, useUpdateEffect } from "ahooks";
import { BlockContainer } from "components";
import { Button, Input, Toast } from "common/components";
import { mail, phone } from "assets/icons";
import ContactBlock from "./ContactBlock";
import "./style/index.scss";
import { Helmet } from "react-helmet";

const Contact = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    message: yup.string().required(),
  });

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = localStorage.getItem("userToken");

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = i18n;

  const [sendEmail, sentEmailState] = api.useContactMutation();
  const [getSettings, settingsState] = api.useLazyGetSettingsQuery();

  const [windowWidth, setWindowWidth] = React.useState(0);

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);
  });

  const handleSendEmail = useMemoizedFn(() => {
    const { fullName, email, message } = methods.getValues();

    sendEmail({
      language,
      userToken,
      body: {
        fullname: fullName,
        email,
        message,
      },
    });
  });

  const getSettingsByKey = useMemoizedFn((key) => {
    return settingsState.data?.data
      ?.filter((setting) => setting?.key === key)
      ?.map((filteredSetting) => filteredSetting?.value);
  });

  React.useEffect(() => {
    methods.register("fullName");
    methods.register("email");
    methods.register("message");
  }, [methods]);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getSettings({
      language,
      userToken,
    });
  });

  useUpdateEffect(() => {
    if (!sentEmailState.isLoading && sentEmailState.isSuccess) {
      Toast.fire({
        icon: "success",
        title: sentEmailState.data?.message,
      });
    }
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <BlockContainer title={t("contact")} subtitle={t("contactWith")}>
      <Helmet>
        <meta name="description" content="Contact Ay yemek" />
      </Helmet>
      <Row className="contact__info mb-4" gutter={windowWidth > 1000 ? 100 : 0}>
        <Col span={windowWidth > 1000 ? 12 : 24}>
          <ContactBlock
            icon={mail}
            name={t("email")}
            texts={getSettingsByKey("email")}
          />
        </Col>
        <Col span={windowWidth > 1000 ? 12 : 24}>
          <ContactBlock
            icon={phone}
            name={t("phone")}
            texts={getSettingsByKey("phone")}
          />
        </Col>
      </Row>
      <form onSubmit={methods.handleSubmit(handleSendEmail)}>
        <Row className="mb-4" gutter={windowWidth > 1000 ? 100 : 0}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              label={t("nameSurname")}
              isRequired
              placeholder="valiyeva fidan"
              name="fullName"
              onChange={(e) => handleChangeInput(e, "fullName")}
              error={!isEmpty(methods.formState.errors.fullName)}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              label={t("email")}
              isRequired
              placeholder="valiyevaafidann@gmail.com"
              name="email"
              onChange={(e) => handleChangeInput(e, "email")}
              error={!isEmpty(methods.formState.errors.email)}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col span={24}>
            <Input
              label={t("yourMessage")}
              type="textarea"
              isRequired
              rows={5}
              onChange={(e) => handleChangeInput(e, "message")}
              name="message"
              error={!isEmpty(methods.formState.errors.message)}
              placeholder={`${t("yourMessage")}`}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Button htmlType="submit" className="contact__button" type="primary">
            {t("send")}
          </Button>
        </Row>
      </form>
    </BlockContainer>
  );
};

export default Contact;
