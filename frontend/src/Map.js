import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { SearchBox } from "@mapbox/search-js-react";

const Map = () => {
  const accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
  mapboxgl.accessToken = accessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [value, setValue] = React.useState("");

  //set initial map state
  const [lng, setLng] = useState(-120.6556);
  const [lat, setLat] = useState(35.2901);
  const [zoom, setZoom] = useState(12);

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (map.current) {
      setMapReady(true);

      return; // initialize map only once
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lng, lat, zoom]);

  return (
    <div className="map-container-main">
      <div className="control-area">
        <div className="control-box">
          <h3>Select Location</h3>
          <form>
            {mapReady && (
              <SearchBox
                accessToken={accessToken}
                map={map.current}
                value={value}
              >
                <input
                  placeholder="enter an address"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </SearchBox>
            )}
          </form>
        </div>
      </div>

      <div className="map-container-wrapper">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default Map;
