import React from "react";
import i18n from "i18next";
import { map } from "lodash";
import { BlockContainer } from "components";
import Category from "pages/Home/Categories/Category";
import { category } from "assets/images";
import { categories } from "./data";
import "./style/index.scss";

const Categories = () => {
  const { t } = i18n;

  return (
    <BlockContainer
      title={t("categories")}
      subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit interdum ullamcorper ."
    >
      <div className="categories">
        {map(categories, ({ title, titleColor }) => (
          <Category
            key={title}
            image={category}
            title={t(`${title}`)}
            titleColor={titleColor}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem "
          />
        ))}
      </div>
    </BlockContainer>
  );
};

export default Categories;
