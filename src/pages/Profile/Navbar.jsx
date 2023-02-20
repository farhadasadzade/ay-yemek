import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { map } from "lodash";
import i18n from "i18next";
import { Row } from "antd";
import { RenderIf, Button } from "common/components";
import { logout } from "assets/icons";
import { navbarItems } from "./data";

const Navbar = ({ url }) => {
  const { t } = i18n;
  const { pathname } = useLocation();

  const [isLogoutModalVisible, setLogoutModalVisible] = React.useState(false);

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
            <Row>
              <Button
                onClick={() => setLogoutModalVisible(false)}
                type="secondary"
              >
                {t("no")}
              </Button>
              <Button type="primary">{t("yes")}</Button>
            </Row>
          </div>
        </div>
      </RenderIf>
    </>
  );
};

export default Navbar;
