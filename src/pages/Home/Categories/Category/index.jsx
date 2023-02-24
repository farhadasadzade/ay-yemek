import React from "react";
import { useHistory } from "react-router";
import { useMemoizedFn } from "ahooks";
import { Row } from "antd";
import i18n from "i18next";
import { Typography, Button } from "common/components";
import { categoryShape } from "assets/images";
import { BASE_IMG_URL } from "shared/constants/url";

const Category = ({ title, titleColor, text, id, imageURL }) => {
  const { t } = i18n;
  const history = useHistory();

  const handleClickMore = useMemoizedFn(() => {
    history.push(`/home/category/${id}`);
  });

  return (
    <div className="home__category">
      <div className="home__category-img">
        <img src={`${BASE_IMG_URL}${imageURL}`} alt="category" />
        <img className="home__category-shape" src={categoryShape} alt="shape" />
      </div>
      <Row align="middle" style={{ flexDirection: "column" }}>
        <p style={{ color: titleColor }} className="home__category-title py-3">
          {title}
        </p>
        <Typography className="home__category-text px-3" size={17} weight={400}>
          {text}
        </Typography>
        <Button onClick={handleClickMore} className="my-4" type="secondary">
          {t("more")}
        </Button>
      </Row>
    </div>
  );
};

export default Category;
