import React from "react";
import i18n from "i18next";
import { Row } from "antd";
import { BlockContainer } from "components";
import { about1, about2 } from "assets/images";
import "./style/index.scss";

const About = () => {
  const { t } = i18n;

  return (
    <BlockContainer
      title={t("about")}
      subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit interdum ullamcorper ."
    >
      <div className="about">
        <Row className="about__images">
          <div
            className="about__img"
            style={{ backgroundImage: `url(${about1})` }}
          ></div>
          <div
            className="about__img"
            style={{ backgroundImage: `url(${about2})` }}
          ></div>
        </Row>
        <Row className="about__description">
          <div className="about__description-title">
            <h2>{t("whatWeDo")}</h2>
          </div>
          <div className="about__description-text">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using.
            </p>
            <br />
            <p>
              Content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy.
            </p>
          </div>
        </Row>
      </div>
    </BlockContainer>
  );
};

export default About;
