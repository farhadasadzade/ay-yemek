import React from "react";
import Carousel from "react-elastic-carousel";
import i18n from "i18next";
import { map, lowerCase } from "lodash";
import { useMount, useUnmount, useUpdateEffect } from "ahooks";
import { HomeTitle, CarouselArrows } from "components";
import { api } from "common/api/api";
import { favoriteFoods } from "./data";
import "./style/index.scss";
import { RenderIf } from "common/components";
import { Helmet } from "react-helmet";

const FavoriteFoods = () => {
  const { t } = i18n;

  const userToken =
    localStorage.getItem("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;
  const language = lowerCase(localStorage.getItem("lang"));

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(5);

  const { data: favoriteMeals } = api.useGetFavoriteMealsQuery({
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
    if (windowWidth < 1200) {
      setItemsToShow(3);
    } else if (windowWidth < 1400) {
      setItemsToShow(4);
    }
    if (windowWidth >= 1400) {
      setItemsToShow(5);
    } else if (windowWidth >= 1200) {
      setItemsToShow(4);
    }
  }, [windowWidth]);

  return (
    <RenderIf condition={windowWidth > 1000}>
      <Helmet>
        <meta name="description" content="Home Favorite Food Ay yemek" />
      </Helmet>
      <div className="home__favorite">
        <HomeTitle
          title={t("favoriteFoods")}
          subtitle="Lorem Ipsum is simply dummy text of the printing "
        />
        <div className="carousel">
          <Carousel
            itemsToShow={itemsToShow}
            pagination={false}
            renderArrow={(props) => <CarouselArrows {...props} />}
            enableSwipe={false}
            enableMouseSwipe={false}
          >
            {map(favoriteMeals?.data, ({ id, name, image }) => (
              <div key={id} className="home__favorite-food">
                <div className="home__favorite-img">
                  <img src={image} alt="food" />
                </div>
                <p className="home__favorite-title">{name}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </RenderIf>
  );
};

export default FavoriteFoods;
