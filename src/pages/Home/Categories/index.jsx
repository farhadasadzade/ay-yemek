import React from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { map } from "lodash";
import Carousel from "react-elastic-carousel";
import { HomeTitle, CarouselArrows } from "components";
import { category } from "assets/images";
import Category from "./Category";
import { categories } from "./data";
import "./style/index.scss";

const Categories = () => {
  const { t } = i18n;

  return (
    <div className="home__categories">
      <HomeTitle
        title={t("category")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <div className="carousel">
        <Link to="/" className="home__categories-link">
          {t("seeAll")}
        </Link>
        <Carousel
          itemsToShow={3}
          pagination={false}
          renderArrow={(props) =>
            categories?.length > 3 ? <CarouselArrows {...props} /> : <></>
          }
          enableSwipe={false}
          enableMouseSwipe={false}
        >
          {map(categories, ({ title, titleColor }) => (
            <Category
              key={title}
              image={category}
              title={t(`${title}`)}
              titleColor={titleColor}
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem "
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
