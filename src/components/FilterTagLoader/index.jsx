import React from "react";
import ContentLoader from "react-content-loader";

const FilterTagLoader = (props) => (
  <ContentLoader
    speed={1}
    width={117}
    height={32}
    viewBox="0 0 117 32"
    backgroundColor="#c7c7c7"
    foregroundColor="#bfbfbf"
    {...props}
    className="me-3"
  >
    <rect x="0" y="0" rx="14" ry="14" width="117" height="32" />
  </ContentLoader>
);

export default FilterTagLoader;
