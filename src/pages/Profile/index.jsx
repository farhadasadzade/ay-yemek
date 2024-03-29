import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router";
import Cookies from "js-cookie";
import { useMount, useUnmount, useUpdateEffect } from "ahooks";
import { isEmpty, lowerCase } from "lodash";
import i18n from "i18next";
import { Row } from "antd";
import { Footer, Header } from "modules";
import { RenderIf, Button } from "common/components";
import { exit } from "assets/icons";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import ActiveOrders from "./ActiveOrders";
import Navbar from "./Navbar";
import { api } from "common/api/api";
import "./style/index.scss";
import Payments from "./Payments";
import { Helmet } from "react-helmet";

const Profile = ({ match: { url } }) => {
  const { t } = i18n;
  const history = useHistory();
  const userToken = Cookies.get("userToken");
  const language = lowerCase(localStorage.getItem("lang"));

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isLogoutModalVisible, setLogoutModalVisible] = React.useState(false);

  const [logout, logoutState] = api.useLogoutMutation();

  useMount(() => {
    if (isEmpty(Cookies.get("userToken"))) {
      history.push("/home");
    }

    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";
  });

  useUpdateEffect(() => {
    if (!logoutState.isLoading && logoutState.isSuccess) {
      Cookies.remove("userToken");
      setLogoutModalVisible(false);
      history.push("/home");
    }
  }, [logoutState.isLoading]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <Header />
      <Helmet>
        <meta name="description" content="Profile Ay yemek" />
      </Helmet>
      <div className="profile">
        <h1 className="profile__title">{t("myProfileInfo")}</h1>
        <Row justify="space-between" gutter={12}>
          <RenderIf condition={windowWidth > 1300}>
            <Navbar
              url={url}
              isLogoutModalVisible={isLogoutModalVisible}
              setLogoutModalVisible={setLogoutModalVisible}
            />
          </RenderIf>

          <Switch>
            <Route path={`${url}/user`} render={() => <UserInfo />} />
            <Route
              path={`${url}/active-orders`}
              render={() => <ActiveOrders />}
            />
            <Route
              path={`${url}/change-password`}
              render={() => <ChangePassword />}
            />
            <Route path={`${url}/payments`} render={() => <Payments />} />
            <Redirect to={`${url}/user`} />
          </Switch>
        </Row>
      </div>
      <Footer />
      <RenderIf condition={isLogoutModalVisible}>
        <div className="modal">
          <div className="modal__block">
            <h1 className="modal__block-title">{t("doYouWantLogout")}</h1>
            <Row wrap align="middle" justify="center">
              <Button
                onClick={() => setLogoutModalVisible(false)}
                type="secondary"
              >
                {t("no")}
              </Button>
              <Button
                isLoading={logoutState.isLoading}
                onClick={() =>
                  logout({ language, userToken: `Bearer ${userToken}` })
                }
                type="primary"
              >
                {t("yes")}
              </Button>
            </Row>
            <img
              onClick={() => setLogoutModalVisible(false)}
              className="modal__block-exit"
              src={exit}
              alt="exit"
            />
          </div>
        </div>
      </RenderIf>
    </>
  );
};

export default Profile;
