import React from "react";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import i18n from "i18next";
import { useMemoizedFn, useMount, useUnmount, useUpdateEffect } from "ahooks";
import { Col, Row, Checkbox } from "antd";
import { Input, RenderIf, Button } from "common/components";
import { Header, Footer } from "modules";
import { logo } from "assets/images";

const BackArrow = ({ stroke, className }) => (
  <svg
    width="17"
    height="14"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.19329 7.2119L15.2744 7.2119"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.87244 1.55653L1.19305 7.21151L6.87244 12.8674"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function addBusinessDays(originalDate, numDaysToAdd) {
  const Sunday = 0;
  const Saturday = 6;
  let daysRemaining = numDaysToAdd;

  let newDate = originalDate.clone();

  while (daysRemaining > 1) {
    newDate = newDate.add(1, "days");
    if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
      daysRemaining--;
    }
  }

  return newDate;
}

const Payment = () => {
  const { t } = i18n;
  const history = useHistory();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [dates, setDates] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [isIncludingWeekend, setIncludingWeekend] = React.useState(true);

  const handleSelectDate = useMemoizedFn((value) => {
    setOpen(false);

    if (isEmpty(value)) {
      setDates(undefined);
      return;
    }

    if (isIncludingWeekend) {
      const secondDate = dayjs(value[0].add(10, "days"));

      setDates([value[0], secondDate]);
      return;
    }
    setDates([value[0], addBusinessDays(value[0], 10)]);
  });

  const onOpenChange = (open) => {
    setOpen(open);
  };

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
  });

  useUpdateEffect(() => {
    if (!isEmpty(dates)) {
      if (isIncludingWeekend) {
        const secondDate = dayjs(dates[0].add(10, "days"));

        setDates([dates[0], secondDate]);
        return;
      }
      setDates([dates[0], addBusinessDays(dates[0], 10)]);
    }
  }, [isIncludingWeekend]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <RenderIf condition={windowWidth < 1000}>
        <Header />
      </RenderIf>
      <div className="register">
        <div className="register__form">
          <RenderIf condition={windowWidth >= 1000}>
            <img className="mb-4" src={logo} alt="logo" />
          </RenderIf>
          <RenderIf condition={windowWidth >= 1000}>
            <button
              className="register__form-back mb-5"
              onClick={() => history.goBack()}
            >
              <BackArrow stroke="black" />
            </button>
          </RenderIf>
          <Row align="middle" className="mb-5">
            <RenderIf condition={windowWidth < 1000}>
              <BackArrow className="me-3" stroke="#006DB8" />
            </RenderIf>
            <h1>{t("payment")}</h1>
          </Row>
          <Row className="mb-4">
            <p>{t("selectedPacket")}</p>
          </Row>
          <Row className="mb-5">
            <div className="payment__selected">EKONOM 10 günlük menyu</div>
          </Row>
          <Row className="mb-2">
            <Col span={18}>
              <Input
                type="rangeDatepicker"
                label={t("menuDates")}
                onSelect={handleSelectDate}
                value={dates}
                open={open}
                onOpenChange={onOpenChange}
              />
            </Col>
          </Row>
          <Row className="mb-5 pb-5" align="middle">
            <Checkbox
              className="me-2"
              onChange={(e) => setIncludingWeekend(e.target.checked)}
              defaultChecked
            />
            <p className="payment__checkbox">{t("includesWeekend")}</p>
          </Row>
          <hr className="mt-5 pt-5 mb-0" />
          <Row className="px-3 mb-4" justify="space-between" align="middle">
            <h2 className="payment__price">{t("totalPayment")}</h2>
            <Row align="middle">
              <h2 className="payment__price pe-2">50</h2>
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
          </Row>
          <Row>
            <Col span={24}>
              <Button style={{ width: "100%" }} type="primary">
                {t("pay")}
              </Button>
            </Col>
          </Row>
        </div>
        <div className="register__back">
          <h1>{t("registerTitle")}</h1>
          <p>{t("registerText")}</p>
        </div>
      </div>
      <RenderIf condition={windowWidth < 1000}>
        <Footer />
      </RenderIf>
    </>
  );
};

export default Payment;
