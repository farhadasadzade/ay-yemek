import React from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { Row } from "antd";
import { map } from "lodash";
import { logo } from "assets/images";
import { facebookOrange, instagramOrange, twitterOrange } from "assets/icons";
import Copyright from "./Copyright";
import { footerLinks } from "./data";
import "./style/index.scss";

const Footer = () => {
  const { t } = i18n;

  return (
    <>
      <div className="footer">
        <Row align="middle" style={{ flexDirection: "column" }}>
          <div className="footer__logo mb-3">
            <img src={logo} alt="footer-logo" />
          </div>
          <p className="footer__logo-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
          <Row justify="center" className="footer__links py-5 my-2">
            {map(footerLinks, ({ title, link }) => (
              <Link className="footer__link" to={link}>
                {t(`${title}`)}
              </Link>
            ))}
          </Row>
          <Row justify="center">
            <Link to="facebook">
              <img
                className="footer__social"
                src={facebookOrange}
                alt="social"
              />
            </Link>
            <Link to="twitter">
              <img
                className="footer__social"
                src={twitterOrange}
                alt="social"
              />
            </Link>
            <Link to="instagram">
              <img
                className="footer__social"
                src={instagramOrange}
                alt="social"
              />
            </Link>
          </Row>
        </Row>
      </div>
      <Copyright />
    </>
  );
};

export default Footer;
