import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const center = {
  lat: 41.86867120799108, // default latitude
  lng: -87.64836798595782, // default longitude
};


export default function GoogleMapAPI () {
  return (
        <APIProvider apiKey={'AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg'}>
        <Map defaultCenter={center} defaultZoom={16} style={{ width: '100%', height: '100%' }} >
        <Marker position={center} />
        </Map>
        </APIProvider>
  );

};

