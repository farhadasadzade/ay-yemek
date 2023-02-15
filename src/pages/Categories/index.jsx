import React from "react";
import i18n from "i18next";
import { useMemoizedFn, useMount, useReactive, useUpdateEffect } from "ahooks";
import { map, filter } from "lodash";
import { Pagination, Row } from "antd";
import { BlockContainer, CategoryLoader } from "components";
import { apiMeals } from "common/api/apiMeals";
import Category from "pages/Home/Categories/Category";
import { category } from "assets/images";
import "./style/index.scss";

const PaginationNextButton = () => (
  <div className="pagination__button">
    <svg
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.932724 8.34858C0.534178 7.96625 0.521035 7.33322 0.90337 6.93467L3.23925 4.49974L0.903369 2.06481C0.521035 1.66627 0.534178 1.03324 0.932724 0.650903C1.33127 0.268568 1.9643 0.281712 2.34663 0.680257L5.34663 3.80747C5.71779 4.19436 5.71779 4.80512 5.34663 5.19202L2.34663 8.31923C1.9643 8.71778 1.33127 8.73092 0.932724 8.34858Z"
      />
    </svg>
  </div>
);

const PaginationPrevButton = () => (
  <div className="pagination__button">
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.69228 0.651416C5.09082 1.03375 5.10396 1.66678 4.72163 2.06533L2.38575 4.50026L4.72163 6.93519C5.10396 7.33373 5.09082 7.96676 4.69228 8.3491C4.29373 8.73143 3.6607 8.71829 3.27837 8.31974L0.278367 5.19253C-0.0927908 4.80564 -0.0927908 4.19488 0.278367 3.80798L3.27837 0.680771C3.6607 0.282225 4.29373 0.269082 4.69228 0.651416Z"
      />
    </svg>
  </div>
);

const Categories = () => {
  const { t } = i18n;

  const state = useReactive({
    minIndex: 0,
    maxIndex: 6,
    currentPage: 1,
    categoriesData: [],
  });

  const [getCategories, categoriesState] = apiMeals.useLazyGetCategoryQuery();

  const handleChangePagination = useMemoizedFn((page) => {
    state.minIndex = (page - 1) * 6;
    state.maxIndex = page * 6;
    state.currentPage = page;

    setTimeout(() => window.scrollTo(0, 0), 200);
  });

  useMount(() => getCategories());

  useUpdateEffect(() => {
    if (!categoriesState.isFetching && categoriesState.isSuccess) {
      state.categoriesData = filter(
        categoriesState.data?.data,
        (category, index) => index >= state.minIndex && index < state.maxIndex
      );
    }
  }, [categoriesState.isFetching, state.currentPage]);

  return (
    <BlockContainer
      title={t("categories")}
      subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit interdum ullamcorper ."
    >
      <div className="categories">
        {categoriesState.isFetching
          ? map(Array(6).fill(0), () => <CategoryLoader />)
          : map(state.categoriesData, ({ id, name, description }) => (
              <Category
                key={id}
                id={id}
                image={category}
                title={name}
                titleColor={description}
                text={description}
              />
            ))}
      </div>
      <Row className="py-4" justify="center">
        <Pagination
          responsive
          total={state.categoriesData.length}
          pageSize={6}
          nextIcon={<PaginationNextButton />}
          prevIcon={<PaginationPrevButton />}
          hideOnSinglePage
          onChange={handleChangePagination}
        />
      </Row>
    </BlockContainer>
  );
};

export default Categories;
