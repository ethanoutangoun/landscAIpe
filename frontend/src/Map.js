import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { SearchBox } from "@mapbox/search-js-react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EyeDropDown from "./EyeDropDown";
import html2canvas from "html2canvas";
import useFetch from "./useFetch";

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

  const handleOne = () => {
    map.current.setStyle("mapbox://styles/mapbox/streets-v12");
  };

  const handleTwo = () => {
    map.current.setStyle("mapbox://styles/mapbox/satellite-v9");
  };

  const [pictureMode, setPictureMode] = useState(false);

  const [imageData, setImageData] = useState(null);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleConfirm = () => {
    handleTwo();
    setPictureMode(!pictureMode);
    handleScreenshot();
  };

  async function handleScreenshot() {
    await sleep(1000);
    html2canvas(mapContainer.current)
      .then((canvas) => {
        const dataURL = canvas.toDataURL(); // Base64-encoded image data
        setImageData(dataURL);
      })
      .catch((error) => {
        console.error("Error taking screenshot:", error);
      });
  }

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
      preserveDrawingBuffer: true,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lng, lat, zoom]);

  const [isPending, setIsPending] = useState(false);

  const url = "http://localhost:8080/api/data";

  const handleRetrieve = () => {
    setIsPending(true);
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        console.log("Response Status:", res.status);

        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }

        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        console.log("Data:", data);
      })
      .catch((error) => {
        setIsPending(false);
        console.error("Error:", error.message);
      });
  };

  const handlePost = () => {
    console.log("Posting data...");

    if (!imageData) {
      console.error("No imageData available to post.");
      return;
    }

    const postData = {

      image: imageData,
    
    };

    console.log(postData);

    fetch("http://localhost:8080/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(postData),
    })
      .then((res) => {
        console.log("Response Status:", res.status);

        if (!res.ok) {
          throw Error("Could not post the data");
        }

        return res.json();
      })
      .then((data) => {
        const base64Image = data.image;
        setImageData(`data:image/jpeg;base64,${base64Image}`);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="map-container-main">
      <div className="control-area">
        <div className="control-box">
          <h3>Select Location</h3>

          {map.current && (
            <form>
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
            </form>
          )}

          <h4 className="confirm-btn" onClick={handleConfirm}>
            Confirm
            <ArrowForwardIcon />
          </h4>

          {imageData && (
            <h4 className="confirm-btn" onClick={handlePost}>
              Post Data
            </h4>
          )}

          {isPending && <div>Loading...</div>}
        </div>
      </div>

      <div className="map-container-wrapper">
        {!pictureMode && (
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        )}
        {!pictureMode && (
          <EyeDropDown
            className="eyedropdown"
            handleOne={handleOne}
            handleTwo={handleTwo}
          />
        )}
        {imageData && (
          <img className="map-container" src={imageData} alt="Captured" />
        )}
        {!imageData && <div ref={mapContainer} className="map-container" />}
      </div>
    </div>
  );
};

export default Map;
