import React from "react";
import { useHistory } from "react-router";
import i18n from "i18next";
import { categoryShape } from "assets/images";
import { Row } from "antd";
import { Typography, Button } from "common/components";
import { useMemoizedFn } from "ahooks";

const Category = ({ image, title, titleColor, text }) => {
  const { t } = i18n;
  const history = useHistory()

  const handleClickMore = useMemoizedFn(() => {
    history.push('/home/packets')
  })

  return (
    <div className="home__category">
      <div className="home__category-img">
        <img src={image} alt="category" />
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
