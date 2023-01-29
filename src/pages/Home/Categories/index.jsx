import React from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { useMount, useUnmount } from "ahooks";
import { map } from "lodash";
import { Row } from "antd";
import Carousel from "react-elastic-carousel";
import { RenderIf } from "common/components";
import { HomeTitle, CarouselArrows } from "components";
import { category } from "assets/images";
import Category from "./Category";
import { categories } from "./data";
import "./style/index.scss";

const Categories = () => {
  const { t } = i18n;

  const [windowWidth, setWindowWidth] = React.useState(0);

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
    <div className="home__categories">
      <HomeTitle
        title={t("category")}
        subtitle="Lorem Ipsum is simply dummy text of the printing"
      />
      <div className="carousel">
        <RenderIf condition={windowWidth > 1000 || windowWidth === 0}>
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
        </RenderIf>
        <RenderIf condition={windowWidth <= 1000 && windowWidth !== 0}>
          <Row align="middle" style={{ flexDirection: "column" }}>
            {map(categories, ({ title, titleColor }) => (
              <Category
                key={title}
                image={category}
                title={t(`${title}`)}
                titleColor={titleColor}
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem "
              />
            ))}
          </Row>
        </RenderIf>
      </div>
    </div>
  );
};

export default Categories;
