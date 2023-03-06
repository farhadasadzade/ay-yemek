import React from "react";
import i18n from "i18next";
import { useMemoizedFn } from "ahooks";
import { isEmpty } from "lodash";
import { Col, Row, TimePicker } from "antd";
import { calendar } from "assets/icons";
import { Input } from "common/components";
import { Map } from "modules";

const DeliverForm = () => {
  const { t } = i18n;

  const [address, setAddress] = React.useState("");
  const [isAddressDenied, setAddressDenied] = React.useState(true);
  const [addressError, setAddressError] = React.useState(false);

  const getPosition = useMemoizedFn((pos) => {
    setAddress(pos);

    if (!isEmpty(pos)) {
      setAddressError(false);
    }
  });

  const getIsAddressDenied = useMemoizedFn((denied) => {
    setAddressDenied(denied);
  });

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
