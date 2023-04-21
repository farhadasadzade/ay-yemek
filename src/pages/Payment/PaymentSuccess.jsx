import React from "react";
import { useHistory } from "react-router";
import { success } from "assets/icons";
import { lowerCase, isEmpty } from "lodash";
import { Row } from "antd";
import { RenderIf, Button } from "common/components";
import { api } from "common/api/api";
import i18n from "i18next";
import { useMount, useUnmount } from "ahooks";
import { Header, Footer } from "modules";

const PaymentSuccess = () => {
  const history = useHistory();
  const { t } = i18n;

  const selectedPackageId = localStorage.getItem("selectedPackageId");
  const language = lowerCase(localStorage.getItem("lang"));
  const userToken =
    localStorage.getItem("userToken") ||
    process.env.REACT_APP_DEFAULT_USER_TOKEN;

  const [windowWidth, setWindowWidth] = React.useState(0);

  const [getPackage, packageState] = api.useLazyGetPackageByIdQuery();

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);

    if (isEmpty(localStorage.getItem("selectedPackageId"))) {
      history.push(`/home`);
      return;
    }

    getPackage({
      userToken: `Bearer ${userToken}`,
      packageId: selectedPackageId,
      language,
    });
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <RenderIf condition={windowWidth < 1000}>
        <Header />
      </RenderIf>
      <div className="payment__success">
        <Row className="mb-5" justify="center">
          <img src={success} alt="success" />
        </Row>
        <Row className="mb-4" justify="center">
          <h2 className="payment__success-title">{t("paymentIsSuccess")}</h2>
        </Row>
        <Row className="mb-2" justify="center">
          <p className="payment__success-text">{t("willBeDelivered")}</p>
        </Row>
        <Row className="mb-5" justify="center">
          <p className="payment__success-thanks">{t("thanksForChoosingUs")}</p>
        </Row>
        <Row justify="center">
          <Button
            onClick={() => {
              history.push(
                `/home/category/${packageState.data?.data.category?.id}`
              );
              localStorage.removeItem("selectedPackageId");
            }}
            type="secondary"
          >
            {t("startChoosingFood")}
          </Button>
        </Row>
      </div>
      <RenderIf condition={windowWidth < 1000}>
        <Footer />
      </RenderIf>
    </>
  );
};

export default PaymentSuccess;
