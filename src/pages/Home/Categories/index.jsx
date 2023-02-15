import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import i18n from "i18next";
import { useMount, useUnmount, useUpdateEffect } from "ahooks";
import { map } from "lodash";
import { Row } from "antd";
import { HomeTitle, CarouselArrows, CategoryLoader } from "components";
import { RenderIf } from "common/components";
import { category } from "assets/images";
import { apiMeals } from "common/api/apiMeals";
import Category from "./Category";
import "./style/index.scss";

const Categories = () => {
  const { t } = i18n;

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const [getCategories, categoriesState] = apiMeals.useLazyGetCategoryQuery();

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getCategories();
  });

  useUpdateEffect(() => {
    if (!categoriesState.isFetching && categoriesState.isSuccess) {
      setCategories(categoriesState.data?.data);
    }
  }, [categoriesState.isFetching]);

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
          <Link to="/home/categories" className="home__categories-link">
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
            {categoriesState.isFetching
              ? map(Array(3).fill(0), () => <CategoryLoader />)
              : map(categories, ({ id, name, description }, index) => {
                  if (index < 5) {
                    return (
                      <Category
                        key={id}
                        id={id}
                        image={category}
                        title={name}
                        titleColor={description}
                        text={description}
                      />
                    );
                  }
                  return null;
                })}
          </Carousel>
        </RenderIf>
        <RenderIf condition={windowWidth <= 1000 && windowWidth !== 0}>
          <Row align="middle" style={{ flexDirection: "column" }}>
            {map(categories, ({ id, name, description }) => (
              <Category
                key={id}
                image={category}
                title={name}
                titleColor={description}
                text={description}
              />
            ))}
          </Row>
        </RenderIf>
      </div>
    </div>
  );
};

export default Categories;
