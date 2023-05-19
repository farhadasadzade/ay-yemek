import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
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
import { api } from "common/api/api";
import MobileMenu from "./MobileMenu";
import { headerLinks } from "./data";
import "./style/index.scss";
import MobileUserMenu from "./MobileUserMenu";

const Header = () => {
  const { t, changeLanguage } = i18n;
  const location = useLocation();
  const userToken = Cookies.get("userToken");
  const history = useHistory();
  const language = lowerCase(localStorage.getItem("lang"));

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
  const [userName, setUserName] = React.useState(undefined);
  const [isUserLogined, setUserLogined] = React.useState(false);

  const [logout, logoutState] = api.useLogoutMutation();
  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();

  useUpdateEffect(() => {
    setUserLogined(!isEmpty(Cookies.get("userToken")));
  }, [userName, userDataState.isFetching, localStorage]);

  const handleSelectLang = useMemoizedFn((lang) => {
    localStorage.setItem("lang", lang);
    setSelectedLang(lang);
    window.location.reload(true);
    changeLanguage(lowerCase(lang));
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

    if (!isEmpty(userToken)) {
      getUserData({
        language,
        userToken: `Bearer ${userToken}`,
      });
    }
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

  useUpdateEffect(() => {
    if (!logoutState.isLoading && logoutState.isSuccess) {
      Cookies.remove("userToken");
      setLogoutLoading(false);
      setLogoutModalVisible(false);
      setMobileUserMenu(false);
      setUserLogined(false);
      history.push("/home");
    }
  }, [logoutState.isLoading]);

  useUpdateEffect(() => {
    if (!userDataState.isFetching && userDataState.isError) {
      Cookies.remove("userToken");
      setUserName(undefined);
      setUserLogined(false);
    }
  }, [userDataState.isFetching]);

  useUpdateEffect(() => {
    if (!userDataState.isFetching && userDataState.isSuccess) {
      setUserName(
        userDataState.data?.data?.name + " " + userDataState.data?.data?.surname
      );
    }
  }, [userDataState.isFetching]);

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
            <RenderIf
              condition={
                !logoutState.isLoading &&
                !userDataState.isFetching &&
                Boolean(userName)
              }
            >
              <>
                <img className="me-2" src={user} alt="user-icon" />
                <p className="header__user-name me-2">
                  {userName}{" "}
                  <img
                    className="ms-2"
                    src={chevronDownBlue}
                    alt="chevron-down"
                  />
                </p>
              </>
            </RenderIf>
            <RenderIf
              condition={logoutState.isLoading || userDataState.isFetching}
            >
              <div className="button-loader"></div>
            </RenderIf>
            <RenderIf condition={isUserMenuVisible}>
              <div className="header__user-menu">
                <p onClick={() => history.push("/profile")}>
                  {t("myProfileInfo")}
                </p>
                <p onClick={() => setLogoutModalVisible(true)}>{t("logout")}</p>
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
        userName={userName}
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
    </header>
  );
};

export default Header;
