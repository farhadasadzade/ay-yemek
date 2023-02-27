import React from "react";
import { useMemoizedFn, useToggle, useUpdateEffect } from "ahooks";
import i18n from "i18next";
import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";
import { RenderIf } from "common/components";
import { exit } from "assets/icons";
import { positions } from "./data";
import "leaflet/dist/leaflet.css";
import "./style/index.scss";

const Map = () => {
  const { t } = i18n;
  const refPoly = React.useRef(null);

  const [markerPosition, setMarkerPosition] = React.useState({
    lat: 40.3785,
    lng: 49.9451,
  });
  const [isMapVisible, { toggle: toggleMap }] = useToggle(false);

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

  useUpdateEffect(() => {}, [markerPosition?.lat, markerPosition?.lng]);

  return (
    <>
      <p
        style={{ cursor: "pointer" }}
        onClick={toggleMap}
        className="map__choose"
      >
        {t("chooseOnMap")}
      </p>
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
