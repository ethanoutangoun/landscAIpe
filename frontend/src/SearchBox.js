import React from 'react';
import Geocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const SearchBox = ({ onResult, accessToken }) => {
  return (
    <Geocoder
      mapboxApiAccessToken={accessToken}
      onResult={onResult}
      placeholder="Search for a location"
    />
  );
};

export default SearchBox;
