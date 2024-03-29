import { useEffect, useState } from "react";
import { SpaceCard } from "./SpaceCard";
import {APIProvider, Map, Marker, AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import useGeoLocation from "./useGeoLocation";
import { collection, query, orderBy, startAt, endAt, getDocs, getFirestore } from 'firebase/firestore';
import { geohashQueryBounds, distanceBetween } from "geofire-common";

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
    const db = getFirestore();
    const { getLocation, location, error } = useGeoLocation();
    const viewData = dummySpaceViewData;
    
    const retrieveLocations = async (center) => {
        const radiusInM = 50 * 1000;
        const bounds = geohashQueryBounds(center, radiusInM);
        const promises = [];
        for (const b of bounds) {
            const q = query(
                collection(db, 'spaces'), 
                orderBy('geohash'), 
                startAt(b[0]), 
                endAt(b[1]));
            promises.push(getDocs(q));
        }
        const snapshots = await Promise.all(promises);
        const matchingDocs = [];
        for (const snap of snapshots) {
            for (const doc of snap.docs) {
                const lat = doc.get('lat');
                const lng = doc.get('lng');
                const distanceInKm = distanceBetween([lat, lng], center);
                const distanceInM = distanceInKm * 1000;
                if (distanceInM <= radiusInM) {
                matchingDocs.push(doc);
                }
            }
        }
        const allSpaceDatas = [];
        for(const doc of matchingDocs) {
            allSpaceDatas.push({...doc.data(), id: doc.id});
        }
        setSpaces(allSpaceDatas);
        return matchingDocs;
    }
    
    useEffect(() => {
        getLocation();
    }, []);
    useEffect(() => {
        const getData = setTimeout(async() => {
            retrieveLocations([location.latitude, location.longitude]);
        }, 500)
        return () => clearTimeout(getData)
    }, [location]);

    const [spaces, setSpaces] = useState([]);
    const [showSpaceInfo, setShowSpaceInfo] = useState(true);

    const [lastClicked, setLastClicked] = useState("");
    const [markerRef, marker] = useAdvancedMarkerRef();
    
    useEffect(() => {console.log(lastClicked)}, [lastClicked]);

    return (<>
    <div className="space-list">
        <div className="space-list-left">
        <ul>
        {spaces.map((space) => 
            <li key={space.name}>
                <SpaceCard space={space} isSelected={lastClicked == space.id}></SpaceCard>
            </li>
        )}
        </ul>
        </div>
        <div className="space-list-right">
        <APIProvider apiKey={'AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg'}>
            <Map defaultCenter={defaultLoc} defaultZoom={80}>
            <Marker position={defaultLoc} />

            {spaces.map((space) =>
            <>
            <Marker position={{lat: space.lat, lng: space.lng}} onClick={(e) => {setLastClicked(space.id)}} />
            {/* <AdvancedMarker
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
            )} */}
            </>
            )}
            
            </Map>
        </APIProvider>
        </div>
    </div>
    </>);
}