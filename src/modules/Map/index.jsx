import React from "react";
import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";
import { useMemoizedFn, useToggle, useUpdateEffect } from "ahooks";
import i18n from "i18next";
import { map } from "lodash";
import { Row } from "antd";
import { apiMap } from "common/api/apiMap";
import { RenderIf, Autocomplete } from "common/components";
import { exit } from "assets/icons";
import { positions } from "./data";
import "leaflet/dist/leaflet.css";
import "./style/index.scss";

const Map = ({ methods, handleChangeInput }) => {
  const { t } = i18n;
  const refPoly = React.useRef(null);

  const [markerPosition, setMarkerPosition] = React.useState({
    lat: 40.3785,
    lng: 49.9451,
  });
  const [isMapVisible, { toggle: toggleMap }] = useToggle(false);
  const [addresses, setAddresses] = React.useState([]);

  const [getAddresses, addressesState] = apiMap.useLazyRegisterQuery();

  const handleClickOnMap = useMemoizedFn((e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  });

  const handleDragMarker = useMemoizedFn((e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  });

  const onAddressEnter = useMemoizedFn((value) => {
    getAddresses(value);
  });

  useUpdateEffect(() => {}, [markerPosition?.lat, markerPosition?.lng]);

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

  return (
    <>
      <Row>
        <Autocomplete
          label={t("address")}
          isRequired
          onChange={onAddressEnter}
          dataSource={addresses}
          onSelect={(a) => console.log(a)}
          placeholder={t("enterYourAddress")}
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
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "530px",
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
            </LoadScript>
            <img
              onClick={toggleMap}
              className="map__exit"
              src={exit}
              alt="exit"
            />
          </div>
        </div>
      </RenderIf>
    </>
  );
};

export default Map;
