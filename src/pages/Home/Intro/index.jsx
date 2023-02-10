import React from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { Typography, Button } from "common/components";
import { intro } from "assets/images";
import "../style/index.scss";

const Intro = () => {
  const { t } = i18n;

  return (
    <div className="intro">
      <div className="intro__info">
        <Typography className="intro__info-title" size={40} weight={600}>
          {t("introTitle")}
        </Typography>
        <Typography
          className="intro__info-subtitle mt-3 mb-5"
          size={18}
          weight={400}
        >
          {t("introSubtitle")}
        </Typography>
        <Link to="home/about">
          <Button type="secondary">{t("about")}</Button>
        </Link>
      </div>
      <div className="intro__image">
        <img src={intro} alt="intro" />
      </div>
    </div>
  );
};

export default Intro;
