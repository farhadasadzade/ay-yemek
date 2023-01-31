import React from "react";
import i18n from "i18next";
import { BlockContainer } from "components";
import { Input } from "common/components";
import "./style/index.scss";

const Contact = () => {
  const { t } = i18n;

  return (
    <BlockContainer title={t("contact")} subtitle={t("contactWith")}>
      <Input />
    </BlockContainer>
  );
};

export default Contact;
