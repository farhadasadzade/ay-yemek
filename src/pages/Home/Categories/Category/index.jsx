import React from "react";
import { useHistory } from "react-router";
import { useMemoizedFn } from "ahooks";
import { Row } from "antd";
import i18n from "i18next";
import { Typography, Button } from "common/components";
import { categoryShape } from "assets/images";

const Category = ({ title, text, id, imageURL, color, onClick, key }) => {
  const { t } = i18n;
  const history = useHistory();

  const handleClickMore = useMemoizedFn((event) => {
    console.log(event);
    event.stopImmidiatePropagation();
    event.cancelBubble = true
    history.push(`/home/category/${id}`);
  });

  return (
    <div className="home__category" key={key} onClick={onClick}>
      <div className="home__category-img">
        <img src={imageURL} alt="category" />
        <img className="home__category-shape" src={categoryShape} alt="shape" />
      </div>
      <Row align="middle" style={{ flexDirection: "column" }}>
        <p style={{ color: color }} className="home__category-title py-3">
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
