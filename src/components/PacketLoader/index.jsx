import React from "react";
import ContentLoader from "react-content-loader";

const PacketLoader = (props) => (
  <ContentLoader
    speed={1}
    width={1323}
    height={208}
    viewBox="0 0 1323 208"
    backgroundColor="#c7c7c7"
    foregroundColor="#bfbfbf"
    {...props}
    className='mb-3'
  >
    <rect x="0" y="0" rx="15" ry="15" width="1323" height="208" />
  </ContentLoader>
);

export default PacketLoader;
