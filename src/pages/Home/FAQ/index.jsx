import React from "react";
import i18n from "i18next";
import { filter } from "lodash";
import { useMount, useUnmount, useMemoizedFn } from "ahooks";
import { Row } from "antd";
import { RenderIf } from "common/components";
import { HomeTitle } from "components";
import { chevronDown } from "assets/icons";
import Accordion from "./Accordion";
import { faqs } from "./data";
import "./style/index.scss";

const FAQ = () => {
  const { t } = i18n;

  const [faqNumber, setFaqNumber] = React.useState(4);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const handleLoadMore = useMemoizedFn(() => {
    setFaqNumber(faqs.length);
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <div className="home__faq">
      <HomeTitle
        title={t("faq")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <Row justify="center" className="mt-5 pt-5">
        <Accordion items={filter(faqs, (_, index) => index < faqNumber)} />
      </Row>
      <RenderIf condition={windowWidth > 1000 && faqNumber !== faqs.length}>
        <Row
          justify="end"
          className="pt-3"
          style={{ maxWidth: "937px", margin: "auto" }}
        >
          <button className="home__faq-more" onClick={handleLoadMore}>
            {t("uploadMore")}
            <img className="ps-2" src={chevronDown} alt="chevron-down" />
          </button>
        </Row>
      </RenderIf>
    </div>
  );
};

export default FAQ;
