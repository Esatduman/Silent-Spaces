import { useState } from "react";
import { SpaceCard } from "./SpaceCard";
import {APIProvider, Map, Marker, AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import useGeoLocation from "./useGeoLocation";

const dummySpaceViewData = {
    spaces: [
        {
            owner: 'john-bell',
            name: 'lcc3',
            displayName: 'Classroom',
            rating: 4,
        },
        {
            owner: 'uic',
            name: 'sce-inner-circle',
            displayName: 'Student Center East - Inner Circle',
            rating: 3,
        },
        {
            owner: 'uic',
            name: 'sele-computer-lab',
            displayName: 'SELE - Computer Lab',
            rating: 2,
        }
    ]
}

const defaultLoc = { lat: 41.86867120799108, lng: -87.64836798595782 };

export function SpaceList({spaceViewData}) {
    const { getLocation, location, error } = useGeoLocation();
    const viewData = dummySpaceViewData;

    const [showSpaceInfo, setShowSpaceInfo] = useState(true);
    const [markerRef, marker] = useAdvancedMarkerRef();
    
    return (<>
    <div className="space-list">
        <div className="space-list-left">
            
        <ul>
        {viewData.spaces.map((space) => <li key={space.name}><SpaceCard space={space}></SpaceCard></li>)}
        </ul>
        </div>
        <div className="space-list-right">
        <APIProvider apiKey={'AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg'}>
            <Map defaultCenter={defaultLoc} defaultZoom={80}>
            <Marker position={defaultLoc} />

            {viewData.spaces.map((space) =>
            <>
            
            <AdvancedMarker
            ref={markerRef}
            onClick={() => setShowSpaceInfo(true)}
            position={{lat: 28, lng: -82}}
            title={'AdvancedMarker that opens an Infowindow when clicked.'} />
            {showSpaceInfo && (
            <InfoWindow
            anchor={marker}
            maxWidth={200}
            onCloseClick={() => setShowSpaceInfo(false)}>
            This is an example for the{' '}
            <code style={{whiteSpace: 'nowrap'}}>&lt;AdvancedMarker /&gt;</code>{' '}
            combined with an Infowindow.
            </InfoWindow>
            )}
            </>
            )}
            
            </Map>
        </APIProvider>
        </div>
    </div>
    </>);
}