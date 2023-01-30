import React from "react";
import i18n from "i18next";
import { map } from "lodash";
import { HomeTitle } from "components";
import Carousel from "react-elastic-carousel";
import ReviewComment from "./ReviewComment";
import { comments } from "./data";
import "./style/index.scss";

const Review = () => {
  const { t } = i18n;

  return (
    <div className="home__review">
      <HomeTitle
        title={t("theyChooseUs")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <div className="carousel">
        <Carousel
          itemsToShow={2}
          enableSwipe={false}
          enableMouseSwipe={false}
          pagination={false}
        >
          {map(comments, (comment, index) => (
            <ReviewComment key={index} {...comment} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Review;
