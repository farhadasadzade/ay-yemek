import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { useCreation } from "ahooks";
import { lowerCase, map } from "lodash";
import { Typography, Button } from "common/components";
import { api } from "common/api/api";
import "../style/index.scss";

const Intro = () => {
  const userToken =
    localStorage.getItem("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;
  const language = lowerCase(localStorage.getItem("lang"));

  const { data: sliderItems } = api.useGetSlidersQuery({
    language,
    userToken: `Bearer ${userToken}`,
  });

  const carousel = useCreation(
    () => (
      <Carousel
        itemsToShow={1}
        pagination={sliderItems?.data?.length > 1}
        renderArrow={() => <></>}
        enableSwipe={true}
        enableMouseSwipe={true}
        enableAutoPlay
        itemPadding={[0, 0, 0, 0]}
      >
        {map(
          sliderItems?.data,
          ({ title, description, button_text, slug, image, id }) => (
            <div key={id} className="intro">
              <div
                className="intro__info"
                style={{ backgroundImage: `url(${image})` }}
              >
                <Typography
                  className="intro__info-title"
                  size={40}
                  weight={600}
                >
                  {title}
                </Typography>
                <Typography
                  className="intro__info-subtitle mt-3 mb-5"
                  size={18}
                  weight={400}
                >
                  {description}
                </Typography>
                <Link to={`home/${slug}`}>
                  <Button type="secondary">{button_text}</Button>
                </Link>
              </div>
            </div>
          )
        )}
      </Carousel>
    ),
    [sliderItems?.data]
  );

  return carousel;
};

export default Intro;
