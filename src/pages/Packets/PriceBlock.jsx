import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useMemoizedFn } from "ahooks";
import { isEmpty } from "lodash";
import i18n from "i18next";
import { Row } from "antd";
import { Button } from "common/components";
import { wallet, azn } from "assets/icons";
import { selectPackage } from "redux/categories";

const PriceBlock = ({ id, name, price, category_id, category_name, days }) => {
  const { t } = i18n;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickPacket = useMemoizedFn(() => {
    dispatch(
      selectPackage({
        categoryId: category_id,
        categoryName: category_name,
        packageId: id,
        packageName: name,
        price: price,
        days,
      })
    );

    if (isEmpty(localStorage.getItem("user"))) {
      history.push("/register");
      return;
    }
    history.push("/payment");
  });

  return (
    <div className="packets__prices-block">
      <div className="packets__prices-top">{name}</div>
      <Row justify="center" align="middle">
        <img className="me-2" src={wallet} alt="wallet" />
        <p className="packets__prices-price">
          {t("price")}: {price} <img src={azn} alt="azn" />
        </p>
      </Row>
      <Row justify="center">
        <Button onClick={handleClickPacket} type="secondary">
          {t("selectPacket")}
        </Button>
      </Row>
    </div>
  );
};

export default PriceBlock;
