import React from "react";
import ContentLoader from "react-content-loader";

const PriceBlockLoader = (props) => (
  <ContentLoader
    speed={1}
    width={360}
    height={221}
    viewBox="0 0 360 221"
    backgroundColor="#c7c7c7"
    foregroundColor="#bfbfbf"
    {...props}
    className='mb-4'
  >
    <rect x="0" y="0" rx="8" ry="8" width="360" height="221" />
  </ContentLoader>
);

export default PriceBlockLoader;
