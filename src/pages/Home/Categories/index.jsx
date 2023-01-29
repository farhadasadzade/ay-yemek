import React from "react";
import i18n from "i18next";
import { HomeTitle } from "components";
import { category } from "assets/images";
import Category from "./Category";
import "./style/index.scss";

const Categories = () => {
  const { t } = i18n;

  return (
    <div className="home__categories">
      <HomeTitle
        title={t("category")}
        subtitle="Lorem Ipsum is simply dummy text of the printing "
      />
      <Category image={category} />
    </div>
  );
};

export default Categories;
