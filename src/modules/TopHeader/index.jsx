import React from "react";
import { Link } from "react-router-dom";
import i18n from 'i18next'
import { Typography } from "common/components";
import { facebook, instagram, mail, phone, whatsapp } from "assets/icons";
import "./style/index.scss";

const TopHeader = () => {

  const { t } = i18n

  return (
    <div className="top-header">
      <div className="top-header-block">
        <Typography className="top-header-text me-3">{t('forCall')}</Typography>
        <img className="me-3" src={phone} alt="phone" />
        <Typography className="top-header-text top-header-info me-3">
          +99412 409 40 94
        </Typography>
        <Typography className="top-header-text top-header-info me-4">
          +99412 409 40 94
        </Typography>
        <img className="me-2" src={mail} alt="mail" />
        <Typography className="top-header-text top-header-info">
          info@ay-yemek.az
        </Typography>
      </div>
      <div className="top-header-block">
        <Typography className="top-header-text me-2">{t('followUs')}</Typography>
        <Link to="facebook">
          <img className="mx-2 top-header-link" src={facebook} alt="mail" />
        </Link>
        <Link to="whatsapp">
          <img className="mx-2 top-header-link" src={whatsapp} alt="whatsapp" />
        </Link>
        <Link to="instagram">
          <img
            className="ms-2 top-header-link"
            src={instagram}
            alt="instagram"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;
