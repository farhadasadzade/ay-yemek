import React from "react";
import i18n from "i18next";
import moment from "moment";
import { useMemoizedFn, useUpdateEffect } from "ahooks";
import { isEmpty, lowerCase, values } from "lodash";
import { Col, Row, TimePicker } from "antd";
import { calendar } from "assets/icons";
import { Map } from "modules";
import { Input, Toast } from "common/components";
import { api } from "common/api/api";

const DeliverForm = ({ selectedMeals, selectedPackageId, orderId }) => {
  const { t } = i18n;

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
    localStorage.getItem("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const [address, setAddress] = React.useState("");
  const [isAddressDenied, setAddressDenied] = React.useState(true);
  const [addressError, setAddressError] = React.useState(false);
  const [time, setTime] = React.useState(undefined);

  const [orderDaily, orderState] = api.useDailyOrderMutation();

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
        delivery_at: `${moment()?.add(1, "day")?.format("YYYY-MM-DD")} ${time}`,
      },
    });
  });

  const handleChangeTime = useMemoizedFn((value) => {
    const time = value.$d?.getHours();

    if (time?.length === 1) {
      setTime(`0${time}`);
    } else {
      setTime(time);
    }
  });

  useUpdateEffect(() => {
    if (!orderState.isLoading && orderState.isSuccess) {
      Toast.fire({
        icon: "success",
        title: t("foodChoosingSuccess"),
      });
    }
  }, [orderState.isLoading]);

  return (
    <div className="deliver__form pt-5">
      <div className="deliver__form-top mb-3">
        <Row wrap={false} align="middle">
          <img className="me-3" src={calendar} alt="calendar" />
          <p className="deliver__form-top-text">
            Seçdiyiniz menyu 17 Yanvar tarixi üçün keçərlidir
          </p>
        </Row>
      </div>
      <Row className="mb-3">
        <Col span={24}>
          <label className="deliver__form-label" htmlFor="deliverTime">
            {t("chooseDeliverTime")}
            <TimePicker
              name="deliverTime"
              size="large"
              showNow={false}
              showMinute={false}
              showSecond={false}
              format="HH:mm"
              style={{ width: "100%", padding: "20px" }}
              onSelect={handleChangeTime}
            />
          </label>
        </Col>
      </Row>
      <Map
        getPosition={getPosition}
        getIsAddressDenied={getIsAddressDenied}
        status={addressError}
      />
      <Row>
        <Col span={24}>
          <label className="deliver__form-label" htmlFor="deliverTime">
            {t("additionalNote")}
            <Input type="textarea" />
          </label>
        </Col>
      </Row>
    </div>
  );
};

export default DeliverForm;
