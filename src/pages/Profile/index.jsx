import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router";
import { useMount } from "ahooks";
import { isEmpty } from "lodash";
import i18n from "i18next";
import { Row } from "antd";
import { Footer, Header } from "modules";
import Navbar from "./Navbar";
import "./style/index.scss";

const Profile = ({ match: { url } }) => {
  const { t } = i18n;
  const history = useHistory();

  useMount(() => {
    if (isEmpty(localStorage.getItem("user"))) {
      history.push("/home");
    }
  });

  return (
    <>
      <Header />
      <div className="profile">
        <h1 className="profile__title">{t("myProfileInfo")}</h1>
        <Row justify="space-between" gutter={12}>
          <Navbar url={url} />
          <>
            <Switch>
              <Route path={`${url}/user`} render={() => <></>} />
              <Route path={`${url}/active-orders`} render={() => <></>} />
              <Route path={`${url}/change-password`} render={() => <></>} />
              <Route path={`${url}/payments`} render={() => <></>} />
              <Redirect to={`${url}/user`} />
            </Switch>
          </>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
