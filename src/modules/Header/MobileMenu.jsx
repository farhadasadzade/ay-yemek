import React from "react";
import { Link, useLocation } from "react-router-dom";
import i18n from "i18next";
import { map, lowerCase, isEmpty } from "lodash";
import { useMemoizedFn } from "ahooks";
import { Row } from "antd";
import {
  exit,
  facebookBlack,
  instagramBlack,
  whatsappBlack,
} from "assets/icons";
import { Typography, Button, RenderIf } from "common/components";
import { headerLinks } from "./data";

const MobileMenu = ({ visible, toggleMobileMenu }) => {
  const { t, changeLanguage } = i18n;
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");
  const isUserLogined = !isEmpty(userToken);

  const handleSelectLang = useMemoizedFn((lang) => {
    localStorage.setItem("lang", lang);
    window.location.reload(true);
    changeLanguage(lowerCase(lang));
  });

  return (
    <div className={`mobile__menu ${visible ? "active" : ""}`}>
      <Row justify="end" className="pe-4 pt-5 mb-5">
        <button className="mobile__menu-exit" onClick={toggleMobileMenu}>
          <img src={exit} alt="exit" />
        </button>
      </Row>
      <Row
        align="middle"
        style={{ flexDirection: "column" }}
        className="pt-5 pb-5"
      >
        {map(headerLinks, ({ link, title }) => (
          <Link
            to={`${link}`}
            key={title}
            style={{ width: "fit-content" }}
            className="my-2"
          >
            <Typography
              className={`mobile__menu-link ${location?.pathname === link && "mobile__menu-link-active"
                }`}
              size={19}
            >
              {t(`${title}`)}
            </Typography>
          </Link>
        ))}
      </Row>
      <RenderIf condition={!isUserLogined}>
        <Row justify="center" className="pt-5 pb-3">
          <Link to="/login">
            <Typography className="mobile__menu-link" size={18}>
              {t("login")}
            </Typography>
          </Link>
        </Row>
        <Row justify="center">
          <Link to="/register">
            <Button type="primary">{t("register")}</Button>
          </Link>
        </Row>
      </RenderIf>
      <Row
        className="mb-3 pb-2 pt-3"
        justify="center"
        style={{ flexGrow: "1", alignItems: "end", flexWrap: 'nowrap', overflowX: 'hidden' }}
      >
        <Typography className="mobile__menu-text me-2" size={14}>
          {t("followUs")}
        </Typography>
        <Link to="facebook">
          <img
            className="mobile__menu-socials mx-2"
            src={facebookBlack}
            alt="whatsapp"
          />
        </Link>
        <Link to="whatsapp">
          <img
            className="mobile__menu-socials mx-2"
            src={whatsappBlack}
            alt="whatsapp"
          />
        </Link>
        <Link to="instagram">
          <img
            className="mobile__menu-socials mx-2"
            src={instagramBlack}
            alt="instagram"
          />
        </Link>
      </Row>
      <Row className="mb-5 pb-3" justify="center" style={{ flexWrap: 'nowrap', overflowX: 'hidden' }} >
        <button
          onClick={() => handleSelectLang("AZ")}
          className="mobile__menu-lang"
        >
          <Typography size={16} weight={700}>
            Az
          </Typography>
        </button>
        <button
          onClick={() => handleSelectLang("EN")}
          className="mobile__menu-lang"
        >
          <Typography size={16} weight={700}>
            En
          </Typography>
        </button>
        <button
          onClick={() => handleSelectLang("RU")}
          className="mobile__menu-lang"
        >
          <Typography size={16} weight={700}>
            Ru
          </Typography>
        </button>
      </Row>
    </div>
  );
};

export default MobileMenu;
