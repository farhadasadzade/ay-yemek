import React from "react";
import i18n from "i18next";
import { isEmpty, map, lowerCase } from "lodash";
import { useMount, useReactive, useUpdateEffect } from "ahooks";
import { Row } from "antd";
import { api } from "common/api/api";
import { trashBin } from "assets/icons";
import { Button, RenderIf, Toast } from "common/components";

const ChoosenMeals = ({ selectedMeals, handleDeleteMeal, isTitleHidden }) => {
  const { t } = i18n;

  const language = lowerCase(localStorage.getItem("lang"));

  const state = useReactive({
    choosenMeals: [],
  });

  const [getMealTypes, mealTypesState] = api.useLazyGetMealTypesQuery();

  useMount(() => {
    getMealTypes(language);
  });

  useUpdateEffect(() => {
    if (!mealTypesState.isFetching && mealTypesState.isSuccess) {
      state.choosenMeals = map(mealTypesState.data?.data, (mealType) => ({
        mealTypeId: mealType?.id,
        mealTypeName: mealType?.name,
      }));
    }
  }, [mealTypesState.isFetching]);

  return (
    <div className="choosen">
      <RenderIf condition={!isTitleHidden}>
        <h2 className="choosen__title">{t("choosenMeals")}</h2>
      </RenderIf>
      {map(state.choosenMeals, (meal) => (
        <div className="choosen__meal">
          <h3 className="choosen__meal-title">{meal?.mealTypeName}</h3>
          <Row className="mb-3" align="middle" justify="space-between">
            <p className="choosen__meal-name">
              {isEmpty(selectedMeals[meal?.mealTypeId]?.name)
                ? t("choose")
                : selectedMeals[meal?.mealTypeId]?.name}
            </p>
            <img
              onMouseOver={(e) => (e.target.style.scale = "1.1")}
              onMouseLeave={(e) => (e.target.style.scale = "1")}
              style={{ cursor: "pointer" }}
              src={trashBin}
              alt="delete"
              onClick={() => handleDeleteMeal(meal?.mealTypeId)}
            />
          </Row>
        </div>
      ))}
      <Button
        onClick={() =>
          Toast.fire({
            icon: "success",
            title: t("foodChoosingSuccess"),
          })
        }
        type="primary"
        style={{ width: "100%" }}
      >
        {t("submitMenu")}
      </Button>
    </div>
  );
};

export default ChoosenMeals;
