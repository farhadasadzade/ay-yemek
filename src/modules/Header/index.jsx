import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import i18n from "i18next";
import { map, isEmpty, lowerCase } from "lodash";
import { Row, Dropdown } from "antd";
import {
  useToggle,
  useMount,
  useUpdateEffect,
  useUnmount,
  useMemoizedFn,
} from "ahooks";
import { logo } from "assets/images";
import { chevronDownBlue, menuBar, user, exit } from "assets/icons";
import { Typography, Button, RenderIf } from "common/components";
import MobileMenu from "./MobileMenu";
import { headerLinks } from "./data";
import "./style/index.scss";
import MobileUserMenu from "./MobileUserMenu";

const Header = () => {
  const { t, changeLanguage } = i18n;
  const location = useLocation();
  const isUserLogined = !isEmpty(localStorage.getItem("user"));
  const history = useHistory();

  const [
    isMobileMenuVisible,
    { toggle: toggleMobileMenu, set: setMobileMenu },
  ] = useToggle();
  const [
    isMobileUserMenuVisible,
    { toggle: toggleMobileUserMenu, set: setMobileUserMenu },
  ] = useToggle();
  const [isUserMenuVisible, { toggle: toggleUserMenu }] = useToggle();

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isLogoutLoading, setLogoutLoading] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(
    localStorage.getItem("lang")
  );
  const [isLogoutModalVisible, setLogoutModalVisible] = React.useState(false);

  const logout = useMemoizedFn(() => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      setLogoutLoading(false);
    }, 1000);
  });

  const handleSelectLang = useMemoizedFn((lang) => {
    localStorage.setItem("lang", lang);
    setSelectedLang(lang);
    window.location.reload(true);
    changeLanguage(lowerCase(lang));
  });

  const handleLogout = useMemoizedFn(() => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      setLogoutLoading(false);
      setLogoutModalVisible(false);
      toggleMobileUserMenu();
      history.push("/home");
    }, 500);
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";

    if (isEmpty(localStorage.getItem("lang"))) {
      localStorage.setItem("lang", "AZ");
    }

    setSelectedLang(localStorage.getItem("lang"));
    changeLanguage(lowerCase(localStorage.getItem("lang")));
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  useUpdateEffect(() => {
    if (windowWidth > 1300) {
      setMobileMenu(false);
      setMobileUserMenu(false);
    }
  }, [windowWidth]);

  useUpdateEffect(() => {
    if (isMobileMenuVisible || isMobileUserMenuVisible) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "scroll";
  }, [isMobileMenuVisible, isMobileUserMenuVisible]);

  useUpdateEffect(() => {
    setMobileMenu(false);
    setMobileUserMenu(false);
  }, [location.pathname]);

  const languageItems = [
    {
      key: 0,
      label: "AZ",
      onClick: () => handleSelectLang("AZ"),
    },
    {
      key: 1,
      label: "EN",
      onClick: () => handleSelectLang("EN"),
    },
    {
      key: 2,
      label: "RU",
      onClick: () => handleSelectLang("RU"),
    },
  ];

  return (
    <header className="header">
      <Link to="/home">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>
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
                  onClick={() => history.push("/profile")}
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
        <Dropdown
          trigger={["click"]}
          menu={{
            items: languageItems,
            defaultValue: "AZ",
          }}
        >
          <div className="header__button-lang">
            <Button type="secondary">{selectedLang}</Button>
          </div>
        </Dropdown>
      </div>
      <RenderIf condition={windowWidth <= 1300}>
        <div style={{ display: "flex" }}>
          <RenderIf condition={isUserLogined}>
            <Button
              className="header__menu-btn me-3"
              type="secondary"
              onClick={toggleMobileUserMenu}
            >
              <img src={user} alt="userBtn" />
            </Button>
          </RenderIf>
          <Button
            className="header__menu-btn"
            type="secondary"
            onClick={toggleMobileMenu}
          >
            <img src={menuBar} alt="menuBtn" />
          </Button>
        </div>
      </RenderIf>
      <MobileMenu
        visible={isMobileMenuVisible}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileUserMenu
        visible={isMobileUserMenuVisible}
        toggleMobileUserMenu={toggleMobileUserMenu}
        isLogoutModalVisible={isLogoutModalVisible}
        setLogoutModalVisible={setLogoutModalVisible}
      />
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
    </header>
  );
};

export default Header;
