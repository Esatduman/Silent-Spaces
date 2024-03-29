import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';



const libraries = ['places'];
const mapContainerStyle = {
  width: 'Auto',
  height: '279.2px',
};
const center = {
  lat: 41.86867120799108, // default latitude
  lng: -87.64836798595782, // default longitude
};


export default function GoogleMapAPI () {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={80}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

