import React from "react";
import i18n from "i18next";
import { isEmpty, map } from "lodash";
import { useMount, useReactive, useUpdateEffect } from "ahooks";
import { Row } from "antd";
import { apiMeals } from "common/api/apiMeals";
import { trashBin } from "assets/icons";
import { Button, Toast } from "common/components";

const ChoosenMeals = ({ selectedMeals, handleDeleteMeal }) => {
  const { t } = i18n;

  const state = useReactive({
    choosenMeals: [],
  });

  const [getMealTypes, mealTypesState] = apiMeals.useLazyGetMealTypesQuery();

  useMount(() => {
    getMealTypes();
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
      <h2 className="choosen__title">{t("choosenMeals")}</h2>
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
