import React from "react";
import i18n from "i18next";
import { useMount, useUnmount } from "ahooks";
import { Row } from "antd";
import { HomeTitle } from "components";
import { howWorks, howWorks1, howWorks2, howWorks3 } from "assets/images";
import { RenderIf } from "common/components";
import "./style/index.scss";

const HowWorks = () => {
  const { t } = i18n;

  const [windowWidth, setWindowWidth] = React.useState(0);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <div className="howworks">
        <HomeTitle
          title={t("howWorks")}
          subtitle="Lorem Ipsum is simply dummy text of the printing"
        />
      </div>
      <RenderIf condition={windowWidth > 1000 || windowWidth === 0}>
        <img className="howworks__img" src={howWorks} alt="how-works" />
      </RenderIf>
      <RenderIf condition={windowWidth <= 1000 && windowWidth !== 0}>
        <Row align="middle" style={{ flexDirection: "column" }}>
          <img className="mb-5" src={howWorks1} alt="how-works" />
          <img className="mb-5" src={howWorks2} alt="how-works" />
          <img
            style={{ width: "100%" }}
            className="mb-5 pb-5"
            src={howWorks3}
            alt="how-works"
          />
        </Row>
      </RenderIf>
    </>
  );
};

export default HowWorks;
