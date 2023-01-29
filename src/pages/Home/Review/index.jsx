import React from "react";
import i18n from "i18next";
import { HomeTitle } from "components";
import ReviewComment from "./ReviewComment";
import "./style/index.scss";

const Review = () => {
  const { t } = i18n;

  return (
    <div className="home__review">
      <HomeTitle
        title={t("theyChooseUs")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <ReviewComment />
    </div>
  );
};

export default Review;
