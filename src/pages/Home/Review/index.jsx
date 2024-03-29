import React from "react";
import Cookies from "js-cookie";
import i18n from "i18next";
import { map, lowerCase } from "lodash";
import { Row } from "antd";
import { useMount, useUnmount, useUpdateEffect } from "ahooks";
import { HomeTitle } from "components";
import Carousel from "react-elastic-carousel";
import CarouselArrows from "./CarouselArrows";
import { CarouselArrows as MobileCarouselArrows } from "components";
import { api } from "common/api/api";
import CarouselPagination from "./CarouselPagination";
import ReviewComment from "./ReviewComment";
import "./style/index.scss";
import { RenderIf } from "common/components";
import { Helmet } from "react-helmet";

const Review = () => {
  const { t } = i18n;

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
    Cookies.get("userToken") || process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const [itemsToShow, setItemsToShow] = React.useState(2);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const { data: rewiews } = api.useGetReviewsQuery({
    language,
    userToken: `Bearer ${userToken}`,
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

  useUpdateEffect(() => {
    if (windowWidth < 1400) {
      setItemsToShow(1);
      return;
    }
    setItemsToShow(2);
  }, [windowWidth]);

  return (
    <div className="home__review">
      <Helmet>
        <meta name="description" content="Home Review Ay yemek" />
      </Helmet>
      <HomeTitle
        title={t("theyChooseUs")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <RenderIf condition={windowWidth > 1000}>
        <Row justify="center">
          <div className="home__review-border mt-5 pb-4"></div>
        </Row>
      </RenderIf>
      <Row
        style={{ display: "block" }}
        className={windowWidth <= 1000 ? "pt-5 mt-2" : ""}
      >
        <div className="carousel">
          <Carousel
            itemsToShow={itemsToShow}
            enableSwipe={false}
            enableMouseSwipe={false}
            pagination={windowWidth > 1000}
            renderArrow={(props) =>
              windowWidth > 1000 ? (
                <CarouselArrows {...props} />
              ) : (
                <MobileCarouselArrows {...props} />
              )
            }
            renderPagination={(props) => <CarouselPagination {...props} />}
            itemPadding={[0, 20]}
            itemPosition={windowWidth <= 1000 ? "START" : "CENTER"}
          >
            {map(rewiews?.data, (comment) => (
              <ReviewComment key={comment?.id} {...comment} />
            ))}
          </Carousel>
        </div>
      </Row>
    </div>
  );
};

export default Review;
