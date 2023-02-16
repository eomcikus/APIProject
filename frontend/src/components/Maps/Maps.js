import React from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, MarkerF } from '@react-google-maps/api';
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
    lat: Number(lat),
    lng: Number(lng)
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  const myMarker = {
    fillColor: "red",
    fillOpacity: 0.5,
    strokeWeight: 0,
    rotation: 1,
    scale: 1
  }

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        // marker={svgarker}
        >

        <MarkerF 
          position={center}
          icon={myMarker} />
          </GoogleMap>


      )}

    </>
  );
};

export default React.memo(Maps);