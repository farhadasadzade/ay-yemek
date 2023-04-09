import React from "react";
import i18n from "i18next";
import { Col, Row } from "antd";
import { isEmpty, lowerCase, map } from "lodash";
import { useMount, useUpdateEffect, useUnmount } from "ahooks";
import { Button } from "common/components";
import { api } from "common/api/api";
import emptyResult from "assets/images/emptyResult.png";

const monthNames = {
  az: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ],
  en: [
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  ],
  ru: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
};

const EmptyResult = () => {
  const { t } = i18n;

  return (
    <>
      <Row className="mb-4" justify="center">
        <img src={emptyResult} alt="" />
      </Row>
      <Row className="mb-3" justify="center">
        <h2 className="empty__result-title">Aktiv Sifarişiniz Tapılmadı</h2>
      </Row>
      <Row className="mb-5" justify="center">
        <p className="empty__result-text">
          Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
          ullamcorper .
        </p>
      </Row>
      <Row className="mb-3" justify="center">
        <Button type="primary">{t("chooseTomorrowsMenu")} </Button>
      </Row>
      <Row justify="center">
        <p className="empty__result-not">*{t("orderNotification")}</p>
      </Row>
    </>
  );
};

const ActiveOrders = () => {
  const { t } = i18n;
  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = localStorage.getItem("userToken");

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [activeOrders, setActiveOrders] = React.useState([]);
  const [deliveryDay, setDeliveryDay] = React.useState("");
  const [deliveryMonth, setDeliveryMonth] = React.useState("");

  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();

  useMount(() => {
    getUserData({ language, userToken: `Bearer ${userToken}` });

    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";
  });

  useUpdateEffect(() => {
    if (!userDataState.isFetching && userDataState.isSuccess) {
      setActiveOrders(userDataState.data?.data?.activeDailyOrders);

      const date =
        userDataState.data?.data?.activeDailyOrders?.[0]?.delivery_at?.split(
          " "
        )?.[0];

      if (date?.split("-")?.[2]?.[0] === "0") {
        setDeliveryDay(date?.split("-")?.[2]?.[1]);
      } else {
        setDeliveryDay(date?.split("-")?.[2]);
      }

      if (date?.split("-")?.[1]?.[0] === "0") {
        setDeliveryMonth(
          monthNames[language]?.[date?.split("-")?.[1]?.[1] - 1]
        );
      } else {
        setDeliveryMonth(monthNames[language]?.[date?.split("-")?.[1]] - 1);
      }
    }
  }, [userDataState.isFetching]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <div className="profile__main">
      {!isEmpty(activeOrders) ? (
        <>
          <Row>
            <h1 className="profile__main-title">{t("choosenMeals")}</h1>
          </Row>
          <Row className="mb-5">
            <h2 className="profile__main-subtitle">
              {t("activeOrderStatus", {
                date: `${deliveryDay} ${deliveryMonth}`,
              })}
            </h2>
          </Row>
          <Row className="mb-4" wrap>
            {map(activeOrders?.[0]?.meals, (meal) => (
              <Col span={windowWidth > 700 ? 12 : 24}>
                <div className="choosen__meal">
                  <h3 className="choosen__meal-title">
                    {meal?.mealType?.name}
                  </h3>
                  <Row className="mb-3" align="middle" justify="space-between">
                    <p className="choosen__meal-name">{meal?.name}</p>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
          <Row className="px-3 mb-4" justify="start" align="middle">
            <h2 className="payment__price me-4">{t("totalPayment")}</h2>
            <h2 className="payment__price pe-2">
              {activeOrders?.[0]?.package?.price}
            </h2>
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.14408 0.890734L5.14408 1.78148L4.83595 1.83286C4.14265 1.95277 3.32097 2.29965 2.60628 2.77071C2.20827 3.03194 1.32668 3.91411 1.06562 4.31238C0.599144 5.01897 0.312411 5.69559 0.132668 6.50069C0.0470756 6.87754 0.0385164 7.07025 0.021398 8.59478L0 10.2778H0.85592H1.71612L1.73324 8.65902C1.74608 7.18587 1.75892 7.01458 1.84023 6.70196C2.16976 5.44293 2.97004 4.44941 4.10414 3.87985C4.37803 3.74282 4.7632 3.59722 5.02853 3.53726L5.14408 3.51157V6.03819L5.14408 8.56481H6L6.85592 8.56481L6.85592 6.03391C6.85592 3.6486 6.8602 3.50728 6.93295 3.5287C6.97147 3.54154 7.08702 3.57152 7.18545 3.59722C7.50642 3.67858 7.98145 3.90127 8.34522 4.1368C9.22682 4.71064 9.87732 5.63136 10.1598 6.70196C10.2411 7.01458 10.2539 7.18587 10.2668 8.65902L10.2839 10.2778H11.1441H12L11.9786 8.59478C11.9615 7.07025 11.9529 6.87754 11.8673 6.50069C11.5977 5.27592 11.1013 4.37661 10.2154 3.49016C9.48359 2.75786 8.82454 2.33819 7.9087 2.03414C7.66904 1.95277 7.33524 1.86284 7.16405 1.83286L6.85592 1.78148L6.85592 0.890734V-6.67572e-06H6L5.14408 -6.67572e-06V0.890734Z"
                fill="#F75C03"
              />
            </svg>
          </Row>
        </>
      ) : (
        <EmptyResult />
      )}
    </div>
  );
};

export default ActiveOrders;
