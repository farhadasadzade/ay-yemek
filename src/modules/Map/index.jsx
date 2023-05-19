import React from "react";
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import Cookies from "js-cookie";
import { useMemoizedFn, useMount, useToggle, useUpdateEffect } from "ahooks";
import i18n from "i18next";
import Swal from "sweetalert2";
import { map, lowerCase, some } from "lodash";
import { Row } from "antd";
import { apiMap } from "common/api/apiMap";
import { api } from "common/api/api";
import { RenderIf, Autocomplete, Button } from "common/components";
import { exit } from "assets/icons";
import pointInPolygon from "point-in-polygon";
import "leaflet/dist/leaflet.css";
import "./style/index.scss";

const Map = ({ getPosition, getIsAddressDenied, status }) => {
  const { t } = i18n;
  const refPoly = React.useRef(null);
  const userToken = Cookies.get("userToken");
  const language = lowerCase(localStorage.getItem("lang"));

  const [markerPosition, setMarkerPosition] = React.useState({
    lat: 40.3785,
    lng: 49.9451,
  });
  const [isMapVisible, { toggle: toggleMap }] = useToggle(false);
  const [addresses, setAddresses] = React.useState([]);
  const [isAddressDenied, setAddressDenied] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState();
  const [selectedAddress, setSelectedAddress] = React.useState(undefined);

  const [getAddresses, addressesState] = apiMap.useLazyGetAddressesQuery();
  const [getAddressByPosition, addressByPositionState] =
    apiMap.useLazyGetAddressByPositionQuery();
  const { data: serviceAreas } = api.useGetAreasQuery({
    userToken: `Bearer ${userToken}`,
    language,
  });
  const [getUserData, userDataState] = api.useLazyGetUserDataQuery();

  const handleClickOnMap = useMemoizedFn((e) => {
    setMarkerPosition({
      lng: e.latLng.lng(),
      lat: e.latLng.lat(),
    });
  });

  const handleDragMarker = useMemoizedFn((e) => {
    setMarkerPosition({
      lng: e.latLng.lng(),
      lat: e.latLng.lat(),
    });
  });

  const onAddressEnter = useMemoizedFn((value) => {
    getAddresses(value);
    setSelectedAddress(value);
  });

  const onAddressSelect = useMemoizedFn((coordinates) => {
    setMarkerPosition(JSON.parse(coordinates));
    setSelectedAddress(undefined);
    getAddressByPosition(JSON.parse(coordinates));
    getPosition(markerPosition, selectedAddress);
  });

  const handleSelectPosition = useMemoizedFn(() => {
    const isInsidePolygon = some(serviceAreas.data, (data) =>
      pointInPolygon(
        [markerPosition?.lng, markerPosition?.lat],
        data?.content?.map((pos) => [
          Number(pos?.split(",")[0]),
          Number(pos?.split(",")[1]),
        ])
      )
    );

    toggleMap();
    setSelectedPosition(markerPosition);
    getPosition(markerPosition, selectedAddress);
    setAddressDenied(isInsidePolygon);
    getIsAddressDenied(!isInsidePolygon);

    if (!isInsidePolygon) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("mapPolygonError"),
      });
      return;
    }

    getAddressByPosition(markerPosition);
  });

  useMount(() => {
    getUserData({ language, userToken: `Bearer ${userToken}` });
  });

  useUpdateEffect(() => {
    if (!userDataState.isFetching && userDataState.isSuccess) {
      setMarkerPosition({
        lng: Number(userDataState.data?.data?.longitude),
        lat: Number(userDataState.data?.data?.latitude),
      });
      setSelectedPosition({
        lng: Number(userDataState.data?.data?.longitude),
        lat: Number(userDataState.data?.data?.latitude),
      });
      setSelectedAddress(userDataState.data?.data?.address);
    }
  }, [userDataState.isFetching]);

  useUpdateEffect(() => {
    setMarkerPosition({
      lat: parseFloat(serviceAreas?.data?.[0]?.content?.[0]?.split(",")?.[1]),
      lng: parseFloat(serviceAreas?.data?.[0]?.content?.[0]?.split(",")?.[0]),
    });
  }, [serviceAreas?.data]);

  console.log();

  useUpdateEffect(() => {
    if (!addressesState.isFetching && addressesState.isSuccess) {
      setAddresses(
        map(addressesState.data?.features, (feat) => ({
          label: feat?.properties?.formatted,
          value: JSON.stringify({
            lat: feat?.properties?.lat,
            lng: feat?.properties?.lon,
          }),
        }))
      );
    }
  }, [addressesState.isFetching]);

  useUpdateEffect(() => {
    if (isMapVisible) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "scroll";
  }, [isMapVisible]);

  useUpdateEffect(() => {
    if (
      !addressByPositionState.isFetching &&
      addressByPositionState.isSuccess
    ) {
      setSelectedAddress(
        addressByPositionState.data?.features?.[0]?.properties?.formatted
      );
      getPosition(
        markerPosition,
        addressByPositionState.data?.features?.[0]?.properties?.formatted
      );
    }
  }, [addressByPositionState.isFetching]);

  return (
    <>
      <Row>
        <Autocomplete
          label={t("address")}
          isRequired
          onChange={onAddressEnter}
          dataSource={addresses}
          onSelect={onAddressSelect}
          placeholder={t("enterYourAddress")}
          value={selectedAddress}
          status={status ? "error" : ""}
        />
      </Row>
      <Row justify="end">
        <p
          style={{ cursor: "pointer" }}
          onClick={toggleMap}
          className="map__choose"
        >
          {t("chooseOnMap")}
        </p>
      </Row>
      <RenderIf condition={isMapVisible}>
        <div className="map">
          <div className="map__modal">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "87%",
              }}
              center={markerPosition}
              zoom={10}
              onClick={handleClickOnMap}
            >
              {serviceAreas?.data?.map((data) => (
                <Polygon
                  ref={refPoly}
                  options={{
                    fillColor: "lightblue",
                    fillOpacity: 0.3,
                    strokeColor: "red",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    geodesic: false,
                    zIndex: 1,
                  }}
                  paths={data?.content.map((a) => ({
                    lat: Number(a.split(",")?.[1]),
                    lng: Number(a.split(",")?.[0]),
                  }))}
                />
              ))}
              <Marker
                position={markerPosition}
                draggable
                onDragEnd={handleDragMarker}
              />
            </GoogleMap>
            <img
              onClick={() => {
                toggleMap();
                setMarkerPosition(selectedPosition);
              }}
              className="map__exit"
              src={exit}
              alt="exit"
            />
            <Row className="mt-2" justify="center">
              <Button onClick={handleSelectPosition} type="primary">
                {t("choose")}
              </Button>
            </Row>
          </div>
        </div>
      </RenderIf>
    </>
  );
};

export default Map;
