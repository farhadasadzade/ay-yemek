import React from "react";
import { Link, useLocation } from "react-router-dom";
import i18n from "i18next";
import { map, isEmpty } from "lodash";
import { Row } from "antd";
import {
  useToggle,
  useMount,
  useUpdateEffect,
  useUnmount,
  useMemoizedFn,
} from "ahooks";
import { logo } from "assets/images";
import { chevronDownBlue, menuBar, user } from "assets/icons";
import { Typography, Button, RenderIf } from "common/components";
import MobileMenu from "./MobileMenu";
import { headerLinks } from "./data";
import "./style/index.scss";

const Header = () => {
  const { t } = i18n;
  const location = useLocation();
  const isUserLogined = !isEmpty(localStorage.getItem("user"));

  const [
    isMobileMenuVisible,
    { toggle: toggleMobileMenu, set: setMobileMenu },
  ] = useToggle();
  const [isUserMenuVisible, { toggle: toggleUserMenu }] = useToggle();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isLogoutLoading, setLogoutLoading] = React.useState(false);

  const logout = useMemoizedFn(() => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      setLogoutLoading(false);
    }, 1000);
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    document.body.style.overflowY = "scroll";
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  useUpdateEffect(() => {
    if (windowWidth > 1300) setMobileMenu(false);
  }, [windowWidth]);

  useUpdateEffect(() => {
    if (isMobileMenuVisible) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "scroll";
  }, [isMobileMenuVisible]);

  useUpdateEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__links">
        {map(headerLinks, ({ link, title }) => (
          <Link to={`${link}`} key={title}>
            <Typography
              className={`header__link ${
                location?.pathname === link && "header__link-active"
              }`}
            >
              {t(`${title}`)}
            </Typography>
          </Link>
        ))}
      </div>
      <div className="header__links">
        <RenderIf condition={!isUserLogined}>
          <Link to="/login">
            <Typography className="header__link">{t("login")}</Typography>
          </Link>
          <Link to="/register">
            <Button type="primary">{t("register")}</Button>
          </Link>
        </RenderIf>
        <RenderIf condition={isUserLogined}>
          <Row onClick={toggleUserMenu} className="header__user" align="middle">
            <RenderIf condition={!isLogoutLoading}>
              <>
                <img className="me-2" src={user} alt="user-icon" />
                <p className="header__user-name me-2">
                  Valiyeva Fidan{" "}
                  <img
                    className="ms-2"
                    src={chevronDownBlue}
                    alt="chevron-down"
                  />
                </p>
              </>
            </RenderIf>
            <RenderIf condition={isLogoutLoading}>
              <div className="button-loader"></div>
            </RenderIf>
            <RenderIf condition={isUserMenuVisible}>
              <div className="header__user-menu">
                <p
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#000000",
                    padding: "0 16px 13px",
                    cursor: "pointer",
                  }}
                >
                  {t("myProfileInfo")}
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "10px",
                    lineHeight: "13px",
                    color: "#D81A1A",
                    padding: "3px 16px 0",
                    borderTop: "0.5px solid rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                  }}
                  onClick={logout}
                >
                  {t("logout")}
                </p>
              </div>
            </RenderIf>
          </Row>
        </RenderIf>
        <Button type="secondary" className="header__button-lang mx-3">
          Az
        </Button>
      </div>
      <Button
        className="header__menu-btn"
        type="secondary"
        onClick={toggleMobileMenu}
      >
        <img src={menuBar} alt="menuBtn" />
      </Button>
      <MobileMenu
        visible={isMobileMenuVisible}
        toggleMobileMenu={toggleMobileMenu}
      />
    </header>
  );
};

export default Header;
