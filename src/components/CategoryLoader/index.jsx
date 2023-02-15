import React from "react";
import ContentLoader from "react-content-loader";

const CategoryLoader = (props) => (
  <ContentLoader
    speed={1}
    width={321}
    height={542}
    viewBox="0 0 321 542"
    backgroundColor="#c7c7c7"
    foregroundColor="#bfbfbf"
    {...props}
  >
    <rect x="0" y="0" rx="11" ry="11" width="321" height="304" />
    <rect x="60" y="320" rx="10" ry="10" width="200" height="37" />
    <rect x="16" y="371" rx="6" ry="6" width="293" height="105" />
    <rect x="44" y="489" rx="20" ry="20" width="228" height="50" />
  </ContentLoader>
);

export default CategoryLoader;
