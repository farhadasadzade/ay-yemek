import React from "react";
import Carousel from "react-elastic-carousel";
import i18n from "i18next";
import { map } from "lodash";
import { useMount, useUnmount, useUpdateEffect } from "ahooks";
import { HomeTitle, CarouselArrows } from "components";
import { favoriteFoods } from "./data";
import "./style/index.scss";
import { RenderIf } from "common/components";

const FavoriteFoods = () => {
  const { t } = i18n;

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(5);

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
      <div className="home__favorite">
        <HomeTitle
          title={t("favoriteFoods")}
          subtitle="Lorem Ipsum is simply dummy text of the printing "
        />
        <div className="carousel">
          <Carousel
            itemsToShow={itemsToShow}
            pagination={false}
            renderArrow={(props) =>
              itemsToShow !== 5 ? <CarouselArrows {...props} /> : <></>
            }
            enableSwipe={false}
            enableMouseSwipe={false}
          >
            {map(favoriteFoods, ({ title, image }) => (
              <div key={title} className="home__favorite-food">
                <div className="home__favorite-img">
                  <img src={image} alt="food" />
                </div>
                <p className="home__favorite-title">{t(`${title}`)}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </RenderIf>
  );
};

export default FavoriteFoods;
