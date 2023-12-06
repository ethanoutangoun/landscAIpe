import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { SearchBox } from "@mapbox/search-js-react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EyeDropDown from "./EyeDropDown";
import html2canvas from "html2canvas";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CustomAccordion from "./CustomAccordion";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import AlertTitle from "@mui/material/AlertTitle";

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
  const [satView, setSatView] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [zipcode, setZipcode] = useState(null);
  const [open, setOpen] = useState(true);
  const [plants, setPlants] = useState();

  // state to verify if data from the Mask RCNN API has been fetched
  const [isProcessed, setIsProcessed] = useState(false);

  const handleOne = () => {
    map.current.setStyle("mapbox://styles/mapbox/streets-v12");
    setSatView(false);
  };

  const handleTwo = () => {
    map.current.setStyle("mapbox://styles/mapbox/satellite-v9");
    setSatView(true);
  };

  const getZipcode = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        data.features.forEach((feature) => {
          if (feature.id.includes("postcode")) {
            setZipcode(feature.text);
          }
        }); // Close the forEach loop properly
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const [pictureMode, setPictureMode] = useState(false);

  const [imageData, setImageData] = useState(null);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleConfirm = () => {
    getZipcode();
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

    // const crosshair = document.createElement('div');
    // crosshair.className = 'crosshair';
    // mapContainer.current.appendChild(crosshair);
  }, [lng, lat, zoom, mapReady]);

  const [isPending, setIsPending] = useState(false);

  const url =
    "https://blooming-inlet-13535-f46fa0b9cfef.herokuapp.com/api/process";

  const localurl = "http://localhost:8000/api/detection";

  const handlePost = () => {
    console.log("Posting data...");
    setIsPending(true);
    handleNativePlants();
    if (!imageData) {
      console.error("No imageData available to post.");
      return;
    }

    const postData = {
      image: imageData,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(postData),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not post the data");
        }
        setIsPending(false);
        return res.json();
      })
      .then((data) => {
        const base64Image = data.image;
        setImageData(`data:image/jpeg;base64,${base64Image}`);
        setIsProcessed(true);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleNativePlants = () => {
    const plantUrl =
      "https://blooming-inlet-13535-f46fa0b9cfef.herokuapp.com/api/nativeplants/" +
      zipcode;

    fetch(plantUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json(); // Parse response body as JSON
      })
      .then((data) => {
        setPlants(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="map-container-main">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isProcessed && (
        <div className="control-area">
          <div className="control-box">
            <h3>Select Location</h3>

            {map.current && (
              <form className="search-box">
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

            {!satView && (
              <h4 className="confirm-btn" onClick={handleTwo}>
                Enter Picture Mode
                <PhotoCameraIcon />
              </h4>
            )}

            {satView && !imageData && (
              <h4 className="confirm-btn" onClick={handleConfirm}>
                Confirm
                <ArrowForwardIcon />
              </h4>
            )}

            {satView && !imageData && (
              <div className="tips">
                <Collapse className="tips-info" in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity="info"
                  >
                    For best results,{" "}
                    <strong>center map on target house</strong>
                  </Alert>
                </Collapse>
              </div>
            )}

            {imageData && (
              <h4 className="confirm-btn" onClick={handlePost}>
                Run Model
                <AutoAwesomeIcon />
              </h4>
            )}
          </div>
        </div>
      )}

      {isProcessed && plants && (
        <div className="control-area">
          <div className="results-title">
            <h3>Recommended Plants</h3>
          </div>

          <CustomAccordion plants={plants} className="accordion" />
        </div>
      )}

      {isProcessed && !plants && (
        <div className="control-area">
          <div className="results-title">
            <h3>Reccomended Plants</h3>
            <Alert severity="error">
              <AlertTitle>No Plant Data Available</AlertTitle>
              Sorry! LandScaipe only has plant data in <strong>California</strong>
            </Alert>
          </div>
        </div>
      )}

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
          <img className="image-result zoomed" src={imageData} alt="Captured" />
        )}
        {!imageData && <div ref={mapContainer} className="map-container"></div>}
      </div>
    </div>
  );
};

export default Map;
