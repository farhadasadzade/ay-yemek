import React from "react";
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useMemoizedFn, useToggle, useUpdateEffect } from "ahooks";
import i18n from "i18next";
import Swal from "sweetalert2";
import { map } from "lodash";
import { Row } from "antd";
import { apiMap } from "common/api/apiMap";
import { RenderIf, Autocomplete, Button } from "common/components";
import { exit } from "assets/icons";
import { positions } from "./data";
import "leaflet/dist/leaflet.css";
import "./style/index.scss";
import pointInPolygon from "point-in-polygon";

const Map = ({ getPosition, getIsAddressDenied, status }) => {
  const { t } = i18n;
  const refPoly = React.useRef(null);

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
    getPosition(markerPosition);
  });

  const handleSelectPosition = useMemoizedFn(() => {
    const isInsidePolygon = pointInPolygon(
      [markerPosition?.lng, markerPosition?.lat],
      positions.map((pos) => [Number(pos[0]), Number(pos[1])])
    );

    toggleMap();
    setSelectedPosition(markerPosition);
    getPosition(markerPosition);
    setAddressDenied(isInsidePolygon);
    getIsAddressDenied(!isInsidePolygon);

    if (!isInsidePolygon) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return;
    }

    getAddressByPosition(markerPosition);
  });

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
    if (
      !addressByPositionState.isFetching &&
      addressByPositionState.isSuccess
    ) {
      setSelectedAddress(
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
              center={{
                lat: 40.3785,
                lng: 49.9451,
              }}
              zoom={12}
              onClick={handleClickOnMap}
            >
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
                paths={positions.map((a) => ({
                  lat: Number(a[1]),
                  lng: Number(a[0]),
                }))}
              />
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
