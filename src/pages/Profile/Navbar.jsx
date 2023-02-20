import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useMemoizedFn, useUpdateEffect } from "ahooks";
import { map } from "lodash";
import i18n from "i18next";
import { Row } from "antd";
import { RenderIf, Button } from "common/components";
import { exit, logout } from "assets/icons";
import { navbarItems } from "./data";

const Navbar = ({ url }) => {
  const { t } = i18n;
  const { pathname } = useLocation();
  const history = useHistory();

  const [isLogoutModalVisible, setLogoutModalVisible] = React.useState(false);
  const [isLogoutLoading, setLogoutLoading] = React.useState(false);

  const handleLogout = useMemoizedFn(() => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.clear("user");
      setLogoutLoading(false);
      setLogoutModalVisible(false);
      history.push("/home");
    }, 500);
  });

  useUpdateEffect(() => {
    if (isLogoutModalVisible) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [isLogoutModalVisible]);

  return (
    <>
      <div className="profile__nav">
        {map(navbarItems, ({ link, icon, title, color }) => (
          <Link key={title} to={`${url}/${link}`}>
            <div
              className={`profile__nav-item mb-3 ${
                pathname === `${url}/${link}` ? "profile__nav-item-active" : ""
              }`}
            >
              <Row align="middle">
                <img className="profile__nav-icon me-3" src={icon} alt="icon" />
                <p style={{ color }} className="profile__nav-text">
                  {t(title)}
                </p>
              </Row>
            </div>
          </Link>
        ))}
        <div
          onClick={() => setLogoutModalVisible(true)}
          className="profile__nav-item mt-5"
        >
          <Row align="middle">
            <img className="profile__nav-icon me-3" src={logout} alt="icon" />
            <p className="profile__nav-text">{t("logout")}</p>
          </Row>
        </div>
      </div>

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
                isLoading={isLogoutLoading}
                onClick={handleLogout}
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

export default Navbar;
