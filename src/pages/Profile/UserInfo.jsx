import React from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import Cookies from "js-cookie";
import i18n from "i18next";
import { useMount, useUnmount, useMemoizedFn, useUpdateEffect } from "ahooks";
import { lowerCase } from "lodash";
import { Col, Row, Form } from "antd";
import { api } from "common/api/api";
import { Button, Input, Toast } from "common/components";
import { plusOrange } from "assets/icons";
import { Link } from "react-router-dom";
import { Map } from "modules";

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
  const userToken = Cookies.get("userToken");
  const history = useHistory();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [isAddressDenied, setAddressDenied] = React.useState(true);
  const [addressError, setAddressError] = React.useState(false);

  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();
  const [updateUserData, updateState] = api.useUpdateProfileMutation();

  const handleUpdatePackage = useMemoizedFn((id) => {
    localStorage.setItem("selectedPackageId", id);
    history.push("/payment");
  });

  const getPosition = useMemoizedFn((pos, address) => {
    setAddress({ pos, address });

    if (!isEmpty(pos)) {
      setAddressError(false);
    }
    return { pos, address };
  });

  const getIsAddressDenied = useMemoizedFn((denied) => {
    setAddressDenied(denied);
  });

  const handleUpdate = useMemoizedFn(() => {
    updateUserData({
      language,
      userToken: `Bearer ${userToken}`,
      body: {
        address: address?.address,
        latitude: address?.pos?.lat,
        longitude: address?.pos?.lng,
      },
    });
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

  useUpdateEffect(() => {
    if (!updateState.isLoading) {
      if (updateState.isSuccess) {
        Toast.fire({
          icon: "success",
          title: updateState.data?.message,
        });
      }

      if (updateState.isError) {
        Toast.fire({
          icon: "error",
          title: updateState.error?.data?.message,
        });
      }
    }
  }, [updateState.isLoading]);

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
            <Map
              getPosition={getPosition}
              getIsAddressDenied={getIsAddressDenied}
              status={addressError}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={windowWidth > 1000 ? 12 : 24}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              isLoading={updateState.isLoading}
              onClick={handleUpdate}
              disabled={isEmpty(address)}
            >
              {t("updateProfile")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserInfo;
