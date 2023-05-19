import React from "react";
import { Link, useHistory } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Cookies from "js-cookie";
import i18n from "i18next";
import { useMount, useUnmount, useUpdateEffect, useMemoizedFn } from "ahooks";
import { map, lowerCase } from "lodash";
import { Row } from "antd";
import { HomeTitle, CarouselArrows, CategoryLoader } from "components";
import { RenderIf } from "common/components";
import { api } from "common/api/api";
import { Helmet } from "react-helmet";
import Category from "./Category";
import "./style/index.scss";

const Categories = () => {
  const { t } = i18n;
  const history = useHistory();

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
  Cookies.get("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const [getCategories, categoriesState] = api.useLazyGetCategoriesQuery();

  const handleClickOnCategory = useMemoizedFn((id) => {
    history.push(`/home/category/${id}`);
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getCategories({ language, userToken: `Bearer ${userToken}` });
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
      <Helmet>
        <meta name="description" content="Home Categories Ay yemek" />
      </Helmet>
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
              ? map(Array(3).fill(0), (_, index) => (
                  <CategoryLoader key={index} />
                ))
              : map(
                  categories,
                  ({ id, name, description, image, color }, index) => {
                    if (index < 5) {
                      return (
                        <Category
                          key={id}
                          id={id}
                          title={name}
                          text={description}
                          imageURL={image}
                          color={color}
                          onClick={() => handleClickOnCategory(id)}
                        />
                      );
                    }
                    return null;
                  }
                )}
          </Carousel>
        </RenderIf>
        <RenderIf condition={windowWidth <= 1000 && windowWidth !== 0}>
          <Row align="middle" style={{ flexDirection: "column" }}>
            {map(categories, ({ id, name, description, image }) => (
              <Category
                key={id}
                id={id}
                title={name}
                titleColor={description}
                text={description}
                imageURL={image}
                onClick={() => handleClickOnCategory(id)}
              />
            ))}
          </Row>
        </RenderIf>
      </div>
    </div>
  );
};

export default Categories;
