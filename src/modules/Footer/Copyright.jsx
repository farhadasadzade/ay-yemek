import React from "react";
import i18n from "i18next";

const Copyright = () => {
  const { t } = i18n;

  return <div className="copyright">{t("copyright")}</div>;
};

export default Copyright;
