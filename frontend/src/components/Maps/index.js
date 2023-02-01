import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { getKey } from '../../store/maps';
import Maps from './Maps';

const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

const MapContainer = () => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
  const ref = useRef(null);
const [map, setMap] = useState();

// useEffect(() => {
//   if (ref.current && !map) {
//     setMap(new window.google.maps.Map(ref.current, {}));
//   }
// }, [ref, map]);
  const render = (status=Status) => {
    return <h1>{status}</h1>;
  };
  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);
  const { lat } = useSelector(state=>state.spots.singleSpot)
  const { lng } = useSelector(state=>state.spots.singleSpot)
  const center = {
    lat: lat,
    lng: lng,
  };
  if (!key) {
    return null;
  }

  return (
    <Wrapper apiKey={key} render={render}>
    <Maps apiKey={key} />
    <Marker position={center} />
    </Wrapper>
  );
};

export default MapContainer;