import React from "react";
import i18n from "i18next";
import { filter } from "lodash";
import { HomeTitle } from "components";
import { Row } from "antd";
import Accordion from "./Accordion";
import { faqs } from "./data";
import "./style/index.scss";

const FAQ = () => {
  const { t } = i18n;

  const [faqNumber, setFaqNumber] = React.useState(5);

  return (
    <div className="home__faq">
      <HomeTitle
        title={t("faq")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <Row justify="center" className="mt-5 pt-5">
        <Accordion items={filter(faqs, (_, index) => index < faqNumber)} />
      </Row>
      <Row justify="end">
        <p>{t("uploadMore")}</p>
      </Row>
    </div>
  );
};

export default FAQ;
