import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router";
import { useMount, useUnmount } from "ahooks";
import { isEmpty } from "lodash";
import i18n from "i18next";
import { Row } from "antd";
import { Footer, Header } from "modules";
import { RenderIf } from "common/components";
import UserInfo from "./UserInfo";
import Navbar from "./Navbar";
import "./style/index.scss";

const Profile = ({ match: { url } }) => {
  const { t } = i18n;
  const history = useHistory();

  const [windowWidth, setWindowWidth] = React.useState(0);

  useMount(() => {
    if (isEmpty(localStorage.getItem("userToken"))) {
      history.push("/home");
    }

    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <>
      <Header />
      <div className="profile">
        <h1 className="profile__title">{t("myProfileInfo")}</h1>
        <Row justify="space-between" gutter={12}>
          <RenderIf condition={windowWidth > 1300}>
            <Navbar url={url} />
          </RenderIf>

          <Switch>
            <Route path={`${url}/user`} render={() => <UserInfo />} />
            <Route path={`${url}/active-orders`} render={() => <></>} />
            <Route path={`${url}/change-password`} render={() => <></>} />
            <Route path={`${url}/payments`} render={() => <></>} />
            <Redirect to={`${url}/user`} />
          </Switch>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
