import React from "react";
import i18n from "i18next";
import { useParams, useHistory } from "react-router";
import moment from "moment";
import { isEmpty, map, lowerCase, values } from "lodash";
import { useMemoizedFn, useMount, useReactive, useUpdateEffect } from "ahooks";
import { Row, Col } from "antd";
import { api } from "common/api/api";
import { trashBin } from "assets/icons";
import { Button, RenderIf, Toast, Input } from "common/components";
import { calendar } from "assets/icons";
import { Map } from "modules";
import { TimepickerUI } from "timepicker-ui";
import Swal from "sweetalert2";

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

const hours = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 0,
];

const ChoosenMeals = ({
  selectedMeals,
  handleDeleteMeal,
  isTitleHidden,
  selectedPackageId,
  orderId,
}) => {
  const { t } = i18n;
  const { id: categoryId } = useParams();
  const history = useHistory();

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
    localStorage.getItem("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const state = useReactive({
    choosenMeals: [],
  });

  const tmRef = React.useRef(null);

  const [address, setAddress] = React.useState("");
  const [isAddressDenied, setAddressDenied] = React.useState(true);
  const [addressError, setAddressError] = React.useState(false);
  const [timePickerValue, setTimePickerValue] = React.useState("12:00");

  const [getMealTypes, mealTypesState] = api.useLazyGetMealTypesQuery();
  const [orderDaily, orderState] = api.useDailyOrderMutation();
  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();
  const { data: deliveryTimes } = api.useGetDeliveryTimesQuery({
    language,
    userToken: `Bearer ${userToken}`,
  });

  const handleTimepicker = useMemoizedFn((e) => {
    setTimePickerValue(`${e.detail.hour}:${e.detail.minutes} ${e.detail.type}`);
  });

  const getPosition = useMemoizedFn((pos, address) => {
    setAddress({ pos, address });

    if (!isEmpty(pos)) {
      setAddressError(false);
    }
  });

  const getIsAddressDenied = useMemoizedFn((denied) => {
    setAddressDenied(denied);
  });

  const handleOrder = useMemoizedFn(() => {
    orderDaily({
      language,
      userToken: `Bearer ${userToken}`,
      body: {
        package_id: selectedPackageId,
        order_status_id: `${orderId}`,
        meals: values(selectedMeals)?.map((meal) => meal?.id),
        address: address?.address,
        latitude: address?.pos?.lat,
        longitude: address?.pos?.lng,
        note: "Tez çatdırın",
        delivery_at: `${moment()?.add(1, "day")?.format("YYYY-MM-DD")} ${
          timePickerValue?.split(" ")?.[0]
        }`,
      },
    });
  });

  useUpdateEffect(() => {
    if (!orderState.isLoading) {
      if (orderState.isSuccess) {
        Swal.fire({
          icon: "success",
          title: orderState.data?.message,
        }).then(() => {
          history.push("/profile/active-orders");
        });
      }

      if (orderState.error?.status === 302) {
        Toast.fire({
          icon: "warning",
          title: orderState.error?.data?.message,
        });
      }
    }
  }, [orderState.isLoading]);

  useMount(() => {
    getMealTypes({ categoryId, language, userToken: `Bearer ${userToken}` });
    getUserData({ language, userToken: `Bearer ${userToken}` });
  });

  useUpdateEffect(() => {
    if (!userDataState.isFetching && userDataState.isSuccess) {
      setAddress({
        address: userDataState.data?.data?.address,
        pos: {
          lng: Number(userDataState.data?.data?.longitude),
          lat: Number(userDataState.data?.data?.latitude),
        },
      });
    }
  }, [userDataState.isFetching]);

  useUpdateEffect(() => {
    if (!mealTypesState.isFetching && mealTypesState.isSuccess) {
      state.choosenMeals = map(mealTypesState.data?.data, (mealType) => ({
        mealTypeId: mealType?.id,
        mealTypeName: mealType?.name,
      }));
    }
  }, [mealTypesState.isFetching]);

  React.useEffect(() => {
    const tm = tmRef.current;

    const newPicker = new TimepickerUI(tm, {
      disabledTime: {
        minutes: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38,
          39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
          56, 57, 58, 59,
        ],
        hours: hours?.filter(
          (num) =>
            !deliveryTimes?.data
              ?.map((data) => Number(data?.split(":")?.[0]))
              ?.includes(num)
        ),
      },
      clockType: "24h",
      cancelLabel: t("cancel"),
      okLabel: t("submit"),
      timeLabel: t("selectTime"),
    });
    newPicker.create();

    tm.addEventListener("accept", handleTimepicker);

    return () => {
      tm.removeEventListener("accept", handleTimepicker);
    };
  }, [handleTimepicker, t, deliveryTimes?.data]);

  return (
    <>
      <div className="choosen">
        <RenderIf condition={!isTitleHidden}>
          <h2 className="choosen__title">{t("choosenMeals")}</h2>
        </RenderIf>
        {map(state.choosenMeals, (meal) => (
          <div className="choosen__meal">
            <h3 className="choosen__meal-title">{meal?.mealTypeName}</h3>
            <Row className="mb-3" align="middle" justify="space-between">
              <p className="choosen__meal-name">
                {isEmpty(selectedMeals[meal?.mealTypeId]?.name)
                  ? t("choose")
                  : selectedMeals[meal?.mealTypeId]?.name}
              </p>
              <img
                onMouseOver={(e) => (e.target.style.scale = "1.1")}
                onMouseLeave={(e) => (e.target.style.scale = "1")}
                style={{ cursor: "pointer" }}
                src={trashBin}
                alt="delete"
                onClick={() => handleDeleteMeal(meal?.mealTypeId)}
              />
            </Row>
          </div>
        ))}
      </div>
      <div className="deliver__form pt-5">
        <div className="deliver__form-top mb-3">
          <Row wrap={false} align="middle">
            <img className="me-3" src={calendar} alt="calendar" />
            <p className="deliver__form-top-text">
              {`Seçdiyiniz menyu ${moment()?.add(1, "day")?.format("DD")} ${
                monthNames[language]?.[moment()?.add(1, "day")?.month()]
              } tarixi üçün keçərlidir`}
            </p>
          </Row>
        </div>
        <Row className="mb-3">
          <Col span={24}>
            <label className="deliver__form-label" htmlFor="deliverTime">
              {t("chooseDeliverTime")}
              <div className="timepicker-ui" ref={tmRef}>
                <input
                  type="test"
                  className="timepicker-ui-input"
                  defaultValue={timePickerValue}
                />
              </div>
            </label>
          </Col>
        </Row>
        <Map
          getPosition={getPosition}
          getIsAddressDenied={getIsAddressDenied}
          status={addressError}
          defaultValue={{
            address: userDataState.data?.data?.address,
            position: {
              lng: Number(userDataState.data?.data?.longitude),
              lat: Number(userDataState.data?.data?.latitude),
            },
          }}
        />
        <Row className="mb-4">
          <Col span={24}>
            <label className="deliver__form-label" htmlFor="deliverTime">
              {t("additionalNote")}
              <Input type="textarea" />
            </label>
          </Col>
        </Row>
        <Button
          onClick={handleOrder}
          type="primary"
          style={{ width: "100%" }}
          disabled={isEmpty(selectedMeals)}
        >
          {t("submitMenu")}
        </Button>
      </div>
    </>
  );
};

export default ChoosenMeals;
