import React from "react";
import i18n from "i18next";
import {
  useMemoizedFn,
  useReactive,
  useMount,
  useUnmount,
  useUpdateEffect,
} from "ahooks";
import { map } from "lodash";
import { BlockContainer } from "components";
import { packet1 } from "assets/images";
import PacketBlock from "./PacketBlock";
import PriceBlock from "./PriceBlock";
import PricesMobile from "./PricesMobile";
import { filterTags, packets, prices } from "./data";
import "./style/index.scss";
import { Row } from "antd";
import { Button, RenderIf } from "common/components";

const Packets = () => {
  const { t } = i18n;

  const state = useReactive({
    activeFilter: "main",
    isPricesActive: false,
  });

  const [windowWidth, setWindowWidth] = React.useState(0);

  const handleSelectFilter = useMemoizedFn((type) => {
    state.activeFilter = type;
  });

  const handlePrices = useMemoizedFn(() => {
    state.isPricesActive = true;

    setTimeout(() => window.scrollTo(0, 0), 200);
  });

  const onClosePrices = useMemoizedFn(() => {
    state.isPricesActive = false;
  });

  useMount(() => {
    window.addEventListener("resize", (e) =>
      setWindowWidth(e.target.innerWidth)
    );

    setWindowWidth(window.innerWidth);
  });

  useUpdateEffect(() => {
    if (windowWidth > 700) {
      state.isPricesActive = false;
    }
  }, [windowWidth]);

  useUnmount(() => {
    window.removeEventListener("resize", () => {});
  });

  return (
    <div className="packet__page">
      <BlockContainer
        title="EKONOM"
        subtitle="Lorem ipsum dolor sit amet lorem ipsum dolor sit "
      >
        <div className="packets">
          <div className="packets__list">
            <div className="packets__filter">
              {map(filterTags, ({ title, type }) => (
                <div
                  key={type}
                  className={`packets__filter-tag ${
                    state.activeFilter === type
                      ? "packets__filter-tag-active"
                      : ""
                  }`}
                  onClick={() => handleSelectFilter(type)}
                >
                  {t(title)}
                </div>
              ))}
            </div>
            <div className="packets__foods">
              {map(packets, (packet) => (
                <PacketBlock {...packet} img={packet1} />
              ))}
            </div>
          </div>
          <div className="packets__prices">
            {map(prices, (price) => (
              <PriceBlock {...price} />
            ))}
          </div>
        </div>
        <RenderIf condition={windowWidth <= 700}>
          <Row className="my-3" justify="center">
            <Button onClick={handlePrices} type="primary">
              Paketlere Bax{" "}
              <svg
                style={{ rotate: "180deg" }}
                width="25"
                height="18"
                viewBox="0 0 25 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ms-2"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.63859 0.448937C8.17098 -0.142103 7.40593 -0.150659 6.92982 0.429826L0.778299 7.92983C0.546968 8.21187 0.416655 8.59749 0.416655 9C0.416655 9.40251 0.546968 9.78813 0.778299 10.0702L6.92982 17.5702C7.40593 18.1507 8.17098 18.1421 8.63859 17.5511C9.1062 16.96 9.09931 16.0103 8.6232 15.4298L4.57974 10.5L23.375 10.5C24.0423 10.5 24.5833 9.82843 24.5833 9C24.5833 8.17157 24.0423 7.5 23.375 7.5L4.57974 7.5L8.6232 2.57017C9.09931 1.98969 9.1062 1.03998 8.63859 0.448937Z"
                  fill="#ffffff"
                />
              </svg>
            </Button>
          </Row>
        </RenderIf>
      </BlockContainer>
      <RenderIf condition={state.isPricesActive}>
        <PricesMobile onClose={onClosePrices} />
      </RenderIf>
    </div>
  );
};

export default Packets;
