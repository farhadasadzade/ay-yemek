import React from "react";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from "i18next";
import { Col, Row } from "antd";
import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import { BlockContainer } from "components";
import { Button, Input } from "common/components";
import { mail, phone } from "assets/icons";
import ContactBlock from "./ContactBlock";
import "./style/index.scss";

const Contact = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    message: yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = i18n;
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

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, e.target.value);
    methods.clearErrors(name);
  });

  React.useEffect(() => {
    methods.register("fullName");
    methods.register("email");
    methods.register("message");
  }, [methods]);

  return (
    <BlockContainer title={t("contact")} subtitle={t("contactWith")}>
      <Row className="contact__info mb-4" gutter={windowWidth > 1000 ? 100 : 0}>
        <Col span={windowWidth > 1000 ? 12 : 24}>
          <ContactBlock
            icon={mail}
            name={t("email")}
            texts={["info@ay-yemek.az"]}
          />
        </Col>
        <Col span={windowWidth > 1000 ? 12 : 24}>
          <ContactBlock
            icon={phone}
            name={t("phone")}
            texts={["+99412 409 40 94", "+99412 409 40 94"]}
          />
        </Col>
      </Row>
      <form onSubmit={methods.handleSubmit()}>
        <Row className="mb-4" gutter={windowWidth > 1000 ? 100 : 0}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              label={t("nameSurname")}
              isRequired
              placeholder="valiyeva fidan"
              name="fullName"
              methods={methods}
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
              methods={methods}
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
