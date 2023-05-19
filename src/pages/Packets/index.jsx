import React from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import i18n from "i18next";
import {
  useMemoizedFn,
  useReactive,
  useMount,
  useUnmount,
  useUpdateEffect,
} from "ahooks";
import { map, lowerCase } from "lodash";
import { BlockContainer } from "components";
import PacketBlock from "./PacketBlock";
import PriceBlock from "./PriceBlock";
import PricesMobile from "./PricesMobile";
import { Row } from "antd";
import { Button, RenderIf } from "common/components";
import { api } from "common/api/api";
import { PacketLoader, FilterTagLoader, PriceBlockLoader } from "components";
import InfiniteScroll from "react-infinite-scroll-component";
import { FoodChoosing } from "pages";
import "./style/index.scss";
import { Helmet } from "react-helmet";

const Packets = () => {
  const { t } = i18n;
  const { id: categoryId } = useParams();

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
    Cookies.get("userToken") || process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const state = useReactive({
    activeFilter: undefined,
    isPricesActive: false,
  });

  const [getMealTypes, mealTypesState] = api.useLazyGetMealTypesQuery();
  const [getPackages, packagesState] = api.useLazyGetPackagesQuery();
  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [meals, setMeals] = React.useState([]);
  const [mealTypes, setMealTypes] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [isPaymentSuccess, setPaymentSuccess] = React.useState(false);
  const [selectedPackageId, setSelectedPackageId] = React.useState(undefined);
  const [orderId, setOrderId] = React.useState(undefined);

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

  const fetchItems = useMemoizedFn(() => {
    const meals = mealTypesState.data?.data?.find(
      (mealType) => Number(mealType?.id) === Number(state.activeFilter)
    )?.meals;

    setTimeout(() => {
      setMeals(meals?.slice(0, meals?.length + 5));
    }, 1000);
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    getMealTypes({ categoryId, language, userToken: `Bearer ${userToken}` });
    getPackages({ categoryId, language, userToken: `Bearer ${userToken}` });
    getUserData({ language, userToken: `Bearer ${userToken}` });
  });

  useUpdateEffect(() => {
    if (windowWidth > 700) {
      state.isPricesActive = false;
    }
  }, [windowWidth]);

  useUpdateEffect(() => {
    if (!userDataState.isFetching && userDataState.isSuccess) {
      const packages = userDataState.data?.data?.packageOrders?.map(
        (order) => order?.package
      );
      const categoryIds = packages?.map((pack) => pack?.category?.id);

      const selectedPackageId = packages?.find(
        (pack) => pack?.category?.id === Number(categoryId)
      )?.id;

      setOrderId(
        userDataState.data?.data?.packageOrders?.find(
          (order) => order?.package?.id === Number(selectedPackageId)
        )?.id
      );

      if (selectedPackageId) {
        setSelectedPackageId(selectedPackageId);
      }

      if (categoryIds?.includes(Number(categoryId))) {
        setPaymentSuccess(true);
      }
    }
  }, [userDataState.isFetching]);

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

      setMeals(meals?.slice(0, 5));
    }
  }, [mealTypesState.isFetching, state.activeFilter, mealTypesState.data]);

  useUpdateEffect(() => {
    if (!packagesState.isFetching && packagesState.isSuccess) {
      setPackages(packagesState.data?.data);
    }
  }, [packagesState.isFetching]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return !isPaymentSuccess ? (
    <div className="packet__page">
      <Helmet>
        <meta name="description" content="Packets Ay yemek" />
      </Helmet>
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
        subtitle="Lorem ipsum dolor sit amet lorem ipsum dolor sit"
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
              <InfiniteScroll
                dataLength={
                  mealTypesState.data?.data?.find(
                    (mealType) =>
                      Number(mealType?.id) === Number(state.activeFilter)
                  )?.meals?.length ?? 0
                }
                next={fetchItems}
                hasMore={
                  mealTypesState.data?.data?.find(
                    (mealType) =>
                      Number(mealType?.id) === Number(state.activeFilter)
                  )?.meals?.length > meals?.length
                }
                loader={<div className="button-loader"></div>}
              >
                {mealTypesState.isFetching
                  ? map(Array(5).fill(0), (_, index) => (
                      <PacketLoader key={index} />
                    ))
                  : map(meals, (packet) => (
                      <PacketBlock key={packet?.id} {...packet} />
                    ))}
              </InfiniteScroll>
            </div>
          </div>
          <div className="packets__prices">
            {packagesState.isFetching
              ? map(Array(4).fill(0), () => <PriceBlockLoader />)
              : map(packages, (price) => (
                  <PriceBlock price={price?.id} {...price} />
                ))}
          </div>
        </div>
      </BlockContainer>
      <RenderIf condition={state.isPricesActive}>
        <PricesMobile data={packages} onClose={onClosePrices} />
      </RenderIf>
    </div>
  ) : (
    <FoodChoosing selectedPackageId={selectedPackageId} orderId={orderId} />
  );
};

export default Packets;
