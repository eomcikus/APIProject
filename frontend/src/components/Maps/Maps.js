import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
const containerStyle = {
  width: '600px',
  height: '400px',
};

const Maps = ({ apiKey }) => {
  const { lat } = useSelector(state=>state.spots.singleSpot)
  const { lng } = useSelector(state=>state.spots.singleSpot)
  const center = {
    lat: lat,
    lng: lng,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  // const marker = new GoogleMap.Marker({
  //   position: center,
  //   map: Maps,
  // });
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          // marker={marker}
        />
      )}
    </>
  );
};

export default React.memo(Maps);