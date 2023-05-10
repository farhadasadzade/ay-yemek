import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useMount, useUnmount, useMemoizedFn } from "ahooks";
import { lowerCase } from "lodash";
import { Col, Row, Form } from "antd";
import { api } from "common/api/api";
import { Button, Input } from "common/components";
import { plusOrange } from "assets/icons";
import { Link } from "react-router-dom";

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

const UserInfo = () => {
  const { t } = i18n;
  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = localStorage.getItem("userToken");
  const history = useHistory();

  const [windowWidth, setWindowWidth] = React.useState(0);

  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();

  const handleUpdatePackage = useMemoizedFn((id) => {
    localStorage.setItem("selectedPackageId", id);
    history.push("/payment");
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";

    getUserData({
      language,
      userToken: `Bearer ${userToken}`,
    });
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <div className="profile__main">
      <Row>
        <h1 className="profile__main-title">{t("choosenCategory")}</h1>
      </Row>
      {userDataState.data?.data?.packageOrders?.map((order) => {
        const startedDate = order?.started_date?.split("-");
        const endedDate = order?.ended_date?.split("-");

        const startedMonth =
          startedDate?.[1]?.[0] === "0"
            ? startedDate?.[1]?.[1]
            : startedDate?.[1];
        const endedMonth =
          endedDate?.[1]?.[0] === "0" ? endedDate?.[1]?.[1] : endedDate?.[1];

        return (
          <Row className="mb-3" align="middle" justify="space-between" wrap>
            <h2 className="profile__main-name">
              {order?.package?.category?.name} ({order?.package?.name}){" "}
              <span>
                etibarlidir {startedDate?.[2]}{" "}
                {monthNames[language]?.[startedMonth - 1]} {startedDate?.[0]} -{" "}
                {endedDate?.[2]} {monthNames[language]?.[endedMonth - 1]}{" "}
                {endedDate?.[0]}
              </span>
            </h2>
            <Button
              onClick={() => handleUpdatePackage(order?.package?.id)}
              type="secondary"
            >
              {t("updatePackage")}
            </Button>
          </Row>
        );
      })}
      <Link to="/home/categories">
        <button className="profile__main-addPacket">
          <Row align="middle">
            <img className="me-2" src={plusOrange} alt="plus" />
            {t("addNewPackage")}
          </Row>
        </button>
      </Link>
      <Form>
        <Row className="mb-3" gutter={24}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="name"
              type="text"
              label={t("name")}
              disabled
              inputValue={userDataState.data?.data?.name}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="surname"
              type="text"
              label={t("surname")}
              disabled
              inputValue={userDataState.data?.data?.surname}
            />
          </Col>
        </Row>
        <Row className="mb-3" gutter={24}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="customerNumber"
              type="text"
              label={t("customerNumber")}
              disabled
              inputValue={userDataState.data?.data?.customer_number}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="email"
              type="email"
              label={t("email")}
              disabled
              inputValue={userDataState.data?.data?.email}
            />
          </Col>
        </Row>
        <Row className="mb-3" gutter={24}>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="birthDate"
              type="text"
              label={t("birthDate")}
              disabled
              inputValue={userDataState.data?.data?.birthdate}
            />
          </Col>
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Input
              name="address"
              type="text"
              label={t("address")}
              disabled
              inputValue={userDataState.data?.data?.address}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserInfo;
