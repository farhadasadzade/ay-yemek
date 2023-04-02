import React from "react";
import { Link } from "react-router-dom";
import { useMount, useUnmount, useUpdateEffect } from "ahooks";
import i18n from "i18next";
import { Row } from "antd";
import { map } from "lodash";
import { useMemoizedFn } from "ahooks";
import { logo } from "assets/images";
import { facebookOrange, instagramOrange, twitterOrange } from "assets/icons";
import Copyright from "./Copyright";
import { footerLinks } from "./data";
import "./style/index.scss";
import { RenderIf } from "common/components";
import appStore from "assets/images/app-store.PNG";
import playStore from "assets/images/play-store.PNG";

const ScrollToTop = ({ fillCircle, fillPath }) => {
  return (
    <svg
      width="94"
      height="94"
      viewBox="0 0 94 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="47" cy="47" r="47" fill={fillCircle} />
      <path
        d="M45.2322 26.2322C46.2085 25.2559 47.7915 25.2559 48.7678 26.2322L64.6777 42.1421C65.654 43.1184 65.654 44.7014 64.6777 45.6777C63.7014 46.654 62.1184 46.654 61.1421 45.6777L47 31.5355L32.8579 45.6777C31.8816 46.654 30.2986 46.654 29.3223 45.6777C28.346 44.7014 28.346 43.1184 29.3223 42.1421L45.2322 26.2322ZM44.5 73V28H49.5V73H44.5Z"
        fill={fillPath}
      />
    </svg>
  );
};

const Footer = () => {
  const { t } = i18n;

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isTopVisible, setTopVisible] = React.useState(true);
  const [fillCircle, setFillCircle] = React.useState("white");
  const [fillPath, setFillPath] = React.useState("#F75C03");

  const onMouseOver = useMemoizedFn(() => {
    setFillCircle("#F75C03");
    setFillPath("white");
  });

  const onMouseLeave = useMemoizedFn(() => {
    setFillCircle("white");
    setFillPath("#F75C03");
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
    document.body.style.overflowY = "scroll";
  });

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  useUpdateEffect(() => {
    if (document.body.style.overflowY === "hidden") {
      setTopVisible(false);
      return;
    }
    setTopVisible(true);
  }, [windowWidth, document.body.style.overflowY]);

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
              <Link key={title} className="footer__link" to={link}>
                {t(`${title}`)}
              </Link>
            ))}
          </Row>
          <Row className="pb-5" justify="center" align="middle">
            <>
              <a href="#" style={{ margin: "0 20px" }}>
                <img style={{ width: "150px" }} src={appStore} alt="" />
              </a>
              <a href="#" style={{ margin: "0 20px" }}>
                <img style={{ width: "150px" }} src={playStore} alt="" />
              </a>
            </>
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
        <RenderIf condition={isTopVisible}>
          <button
            onClick={() => window.scroll(0, 0)}
            className="footer__scroll-top"
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
            <ScrollToTop fillCircle={fillCircle} fillPath={fillPath} />
          </button>
        </RenderIf>
      </div>
      <Copyright />
    </>
  );
};

export default Footer;
