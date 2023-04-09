import React from "react";
import { lowerCase } from "lodash";
import { useTranslation } from "react-i18next";
import { Typography } from "common/components";
import { api } from "common/api/api";
import { facebook, instagram, mail, phone, whatsapp } from "assets/icons";
import { useMemoizedFn } from "ahooks";
import "./style/index.scss";

const TopHeader = () => {
  const { t } = useTranslation();

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = localStorage.getItem("userToken");

  const { data: settings } = api.useGetSettingsQuery({
    language,
    userToken,
  });

  const getSettingsByKey = useMemoizedFn((key) => {
    return settings?.data
      ?.filter((setting) => setting?.key === key)
      ?.map((filteredSetting) => filteredSetting?.value);
  });

  return (
    <div className="top-header">
      <div className="top-header-block">
        <Typography className="top-header-text me-3">{t("forCall")}</Typography>
        <img className="me-3" src={phone} alt="phone" />
        {getSettingsByKey("phone")?.map((value) => (
          <Typography className="top-header-text top-header-info me-3">
            {value}
          </Typography>
        ))}
        <img className="me-2" src={mail} alt="mail" />
        {getSettingsByKey("email")?.map((value) => (
          <Typography className="top-header-text top-header-info">
            {value}
          </Typography>
        ))}
      </div>
      <div className="top-header-block">
        <Typography className="top-header-text me-2">
          {t("followUs")}
        </Typography>
        <a href={getSettingsByKey("facebook")?.[0]}>
          <img className="mx-2 top-header-link" src={facebook} alt="mail" />
        </a>
        <a href={getSettingsByKey("twitter")?.[0]}>
          <img className="mx-2 top-header-link" src={whatsapp} alt="whatsapp" />
        </a>
        <a href={getSettingsByKey("instagram")?.[0]}>
          <img
            className="ms-2 top-header-link"
            src={instagram}
            alt="instagram"
          />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;
