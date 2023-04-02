import React from "react";
import i18n from "i18next";
import { useParams } from "react-router";
import { Row } from "antd";
import {
  useMemoizedFn,
  useReactive,
  useMount,
  useUnmount,
  useUpdateEffect,
} from "ahooks";
import { map, lowerCase, omit } from "lodash";
import { Button, RenderIf } from "common/components";
import { BlockContainer, FilterTagLoader, PacketLoader } from "components";
import ChoosenMeals from "./ChoosenMeals";
import DeliverForm from "./DeliverForm";
import PacketBlock from "./PacketBlock";
import PricesMobile from "./PricesMobile";
import { api } from "common/api/api";
import "./style/index.scss";

const FoodChoosing = ({ selectedPackageId, orderId }) => {
  const { t } = i18n;

  const { id: categoryId } = useParams();
  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
    localStorage.getItem("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const state = useReactive({
    activeFilter: 1,
    isPricesActive: false,
  });

  const [getMealTypes, mealTypesState] = api.useLazyGetMealTypesQuery();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [meals, setMeals] = React.useState([]);
  const [selectedMeals, setSelectedMeals] = React.useState({});
  const [mealTypes, setMealTypes] = React.useState([]);

  const handleSelectFilter = useMemoizedFn((type) => {
    state.activeFilter = type;
  });

  const handlePrices = useMemoizedFn(() => {
    state.isPricesActive = true;

    setTimeout(() => window.scrollTo(0, 0), 200);
  });

  const onClosePrices = useMemoizedFn(() => {
    state.isPricesActive = false;
  });

  const handleSelectMeal = useMemoizedFn((meal) => {
    setSelectedMeals({ ...selectedMeals, [meal?.typeId]: meal });
  });

  const handleDeleteMeal = useMemoizedFn((mealTypeId) => {
    setSelectedMeals(omit(selectedMeals, mealTypeId));
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getMealTypes({ categoryId, language, userToken: `Bearer ${userToken}` });
  });

  useUpdateEffect(() => {
    if (windowWidth > 700) {
      state.isPricesActive = false;
    }
  }, [windowWidth]);

  useUpdateEffect(() => {
    if (!mealTypesState.isFetching && mealTypesState.isSuccess) {
      const mealTypes = mealTypesState.data?.data?.map((mealType) => ({
        name: mealType?.name,
        id: mealType?.id,
      }));

      state.activeFilter = mealTypes?.[0]?.id;

      setMealTypes(mealTypes);
    }
  }, [mealTypesState.isFetching]);

  useUpdateEffect(() => {
    if (!mealTypesState.isFetching && mealTypesState.isSuccess) {
      const meals = mealTypesState.data?.data?.find(
        (mealType) => Number(mealType?.id) === Number(state.activeFilter)
      )?.meals;

      setMeals(meals);
    }
  }, [mealTypesState.isFetching, state.activeFilter, mealTypesState.data]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <div className="packet__page">
      <BlockContainer
        title={
          mealTypesState.data?.data?.[0]?.meals?.find(
            (meal) => Number(meal?.category?.id) === Number(categoryId)
          )?.category?.name
        }
        titleColor={
          mealTypesState.data?.data?.[0]?.meals?.find(
            (meal) => Number(meal?.category?.id) === Number(categoryId)
          )?.category?.color
        }
        subtitle="Lorem ipsum dolor sit amet lorem ipsum dolor sit "
      >
        <div className="packets">
          <div className="packets__list">
            <div className="packets__filter">
              {mealTypesState.isFetching
                ? map(Array(4).fill(0), () => <FilterTagLoader />)
                : map(mealTypes, ({ name, id }) => (
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
            <RenderIf condition={windowWidth <= 1200}>
              <DeliverForm />
            </RenderIf>
            <div className="packets__foods">
              <RenderIf condition={windowWidth <= 1200}>
                <Row className="my-3" justify="center">
                  <Button
                    onClick={handlePrices}
                    type="primary"
                    style={{ width: "100%" }}
                  >
                    {t("choosenFoods")}
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
              {mealTypesState.isFetching
                ? map(Array(5).fill(0), (_, index) => (
                    <PacketLoader key={index} />
                  ))
                : map(meals, (packet) => (
                    <PacketBlock
                      handleSelectMeal={handleSelectMeal}
                      typeId={state.activeFilter}
                      {...packet}
                    />
                  ))}
            </div>
          </div>
          <div className="packets__prices">
            <ChoosenMeals
              selectedMeals={selectedMeals}
              handleDeleteMeal={handleDeleteMeal}
              selectedPackageId={selectedPackageId}
              orderId={orderId}
            />
          </div>
        </div>
      </BlockContainer>
      <RenderIf condition={state.isPricesActive}>
        <PricesMobile
          selectedMeals={selectedMeals}
          handleDeleteMeal={handleDeleteMeal}
          onClose={onClosePrices}
        />
      </RenderIf>
    </div>
  );
};

export default FoodChoosing;
