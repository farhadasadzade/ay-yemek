import React from "react";
import i18n from "i18next";
import { filter, lowerCase } from "lodash";
import { useMount, useUnmount, useMemoizedFn, useUpdateEffect } from "ahooks";
import { Row } from "antd";
import { RenderIf } from "common/components";
import { HomeTitle } from "components";
import { chevronDown } from "assets/icons";
import { api } from "common/api/api";
import Accordion from "./Accordion";
import "./style/index.scss";

const FAQ = () => {
  const { t } = i18n;

  const language = lowerCase(localStorage.getItem("lang"));

  const [faqNumber, setFaqNumber] = React.useState(4);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [faqs, setFaqs] = React.useState([]);

  const [getFaqs, faqsState] = api.useLazyGetFaqsQuery();

  const handleLoadMore = useMemoizedFn(() => {
    setFaqNumber(faqs?.length);
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getFaqs(language);
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  useUpdateEffect(() => {
    if (!faqsState.isFetching && faqsState.isSuccess) {
      setFaqs(faqsState.data?.data);
    }
  }, [faqsState.isFetching]);

  return (
    <div className="home__faq">
      <HomeTitle
        title={t("faq")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <Row justify="center" className="mt-5 pt-5">
        <Accordion items={filter(faqs, (_, index) => index < faqNumber)} />
      </Row>
      <RenderIf condition={windowWidth > 1000 && faqs?.length < 4}>
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
