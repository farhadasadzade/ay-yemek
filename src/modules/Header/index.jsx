import React from "react";
import { Link, useLocation } from "react-router-dom";
import i18n from "i18next";
import { map } from "lodash";
import { useToggle, useMount, useUpdateEffect, useUnmount } from "ahooks";
import { logo } from "assets/images";
import { menuBar } from "assets/icons";
import { Typography, Button } from "common/components";
import MobileMenu from "./MobileMenu";
import { headerLinks } from "./data";
import "./style/index.scss";

const Header = () => {
  const { t } = i18n;
  const location = useLocation();
  const [
    isMobileMenuVisible,
    { toggle: toggleMobileMenu, set: setMobileMenu },
  ] = useToggle();
  const [windowWidth, setWindowWidth] = React.useState(0);

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );
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
        <Link to="/login">
          <Typography className="header__link">{t("login")}</Typography>
        </Link>
        <Link to="/register">
          <Button type="primary">{t("register")}</Button>
        </Link>
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
