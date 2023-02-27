import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import i18n from "i18next";
import {
  useMemoizedFn,
  useReactive,
  useMount,
  useUnmount,
  useUpdateEffect,
} from "ahooks";
import { map } from "lodash";
import { BlockContainer } from "components";
import PacketBlock from "./PacketBlock";
import PriceBlock from "./PriceBlock";
import PricesMobile from "./PricesMobile";
import { Row } from "antd";
import { Button, RenderIf } from "common/components";
import { apiMeals } from "common/api/apiMeals";
import { PacketLoader, FilterTagLoader, PriceBlockLoader } from "components";
import { FoodChoosing } from "pages";
import "./style/index.scss";

const Packets = () => {
  const { t } = i18n;
  const { id: categoryId } = useParams();
  const isPaymentSuccess = useSelector(
    (state) => state.category.selectedPackage?.isPaymentSuccess
  );

  const state = useReactive({
    activeFilter: 1,
    isPricesActive: false,
  });

  const [getMeals, mealsState] = apiMeals.useGetMealsMutation();
  const [getMealTypes, mealTypesState] = apiMeals.useLazyGetMealTypesQuery();
  const [getPackages, packagesState] =
    apiMeals.useGetPackagesByCategoryMutation();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [meals, setMeals] = React.useState([]);

  const handleSelectFilter = useMemoizedFn((id) => {
    state.activeFilter = id;
  });

  const handlePrices = useMemoizedFn(() => {
    state.isPricesActive = true;

    setTimeout(() => window.scrollTo(0, 0), 200);
  });

  const onClosePrices = useMemoizedFn(() => {
    state.isPricesActive = false;
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getMeals({ category_id: categoryId });
    getMealTypes();
    getPackages({ category_id: categoryId });
  });

  useUpdateEffect(() => {
    if (windowWidth > 700) {
      state.isPricesActive = false;
    }
  }, [windowWidth]);

  useUpdateEffect(() => {
    if (!mealsState.isLoading && mealsState.isSuccess) {
      setMeals(mealsState.data?.data);
    }
  }, [mealsState.isLoading]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return !isPaymentSuccess ? (
    <div className="packet__page">
      <BlockContainer
        title={mealsState.data?.data[0]?.category_name}
        subtitle="Lorem ipsum dolor sit amet lorem ipsum dolor sit "
      >
        <div className="packets">
          <div className="packets__list">
            <div className="packets__filter">
              {mealTypesState.isFetching
                ? map(Array(4).fill(0), () => <FilterTagLoader />)
                : map(mealTypesState.data?.data, ({ name, id }) => (
                    <div
                      key={id}
                      className={`packets__filter-tag ${
                        state.activeFilter === id
                          ? "packets__filter-tag-active"
                          : ""
                      }`}
                      onClick={() => handleSelectFilter(id)}
                    >
                      {name}
                    </div>
                  ))}
            </div>
            <div className="packets__foods">
              <RenderIf condition={windowWidth <= 1200}>
                <Row className="my-3" justify="center">
                  <Button
                    onClick={handlePrices}
                    type="primary"
                    style={{ width: "100%" }}
                  >
                    {t("checkPackets")}
                    <svg
                      style={{ rotate: "180deg" }}
                      width="25"
                      height="18"
                      viewBox="0 0 25 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ms-2"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.63859 0.448937C8.17098 -0.142103 7.40593 -0.150659 6.92982 0.429826L0.778299 7.92983C0.546968 8.21187 0.416655 8.59749 0.416655 9C0.416655 9.40251 0.546968 9.78813 0.778299 10.0702L6.92982 17.5702C7.40593 18.1507 8.17098 18.1421 8.63859 17.5511C9.1062 16.96 9.09931 16.0103 8.6232 15.4298L4.57974 10.5L23.375 10.5C24.0423 10.5 24.5833 9.82843 24.5833 9C24.5833 8.17157 24.0423 7.5 23.375 7.5L4.57974 7.5L8.6232 2.57017C9.09931 1.98969 9.1062 1.03998 8.63859 0.448937Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </Button>
                </Row>
              </RenderIf>
              {mealsState.isLoading
                ? map(Array(5).fill(0), () => <PacketLoader />)
                : map(meals, (packet) => {
                    if (state.activeFilter === Number(packet.meal_type_id)) {
                      return <PacketBlock {...packet} />;
                    }
                    return null;
                  })}
            </div>
          </div>
          <div className="packets__prices">
            {packagesState.isLoading
              ? map(Array(4).fill(0), () => <PriceBlockLoader />)
              : map(packagesState.data?.data, (price) => (
                  <PriceBlock {...price} />
                ))}
          </div>
        </div>
      </BlockContainer>
      <RenderIf condition={state.isPricesActive}>
        <PricesMobile data={packagesState.data?.data} onClose={onClosePrices} />
      </RenderIf>
    </div>
  ) : (
    <FoodChoosing />
  );
};

export default Packets;
