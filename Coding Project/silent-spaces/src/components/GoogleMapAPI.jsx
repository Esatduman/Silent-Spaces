import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const center = {
  lat: 41.86867120799108, // default latitude
  lng: -87.64836798595782, // default longitude
};

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];



export default function GoogleMapAPI () {
  return (
        <APIProvider apiKey={'AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg'}>
        <Map defaultCenter={center} defaultZoom={10} style={{ width: '100%', height: '100%' }} 
        options={{styles: mapStyles}}>
        <Marker position={center} />
        </Map>
        </APIProvider>
  );
 

};

