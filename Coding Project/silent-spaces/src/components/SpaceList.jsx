import { useEffect, useState, useMemo } from "react";
import { SpaceCard } from "./SpaceCard";
import {APIProvider, Map, Marker, AdvancedMarker, InfoWindow, Pin} from '@vis.gl/react-google-maps';
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
            if (location)
              retrieveLocations([location.latitude, location.longitude]);
            else
                retrieveLocations([defaultLoc.lat, defaultLoc.lng]);
        }, 500)
        return () => clearTimeout(getData)
    }, [location]);

    const [spaces, setSpaces] = useState([]);

    // const createMarkerSets = (_spaces) => {
    //     const markers = _spaces.map((spaceData) => {
    //         const marker = <AdvancedMarker
    //             onClick={() => setLastClicked(spaceData.id)}
    //             position={{lat: spaceData.lat, lng: spaceData.lng}} 
    //             title={spaceData.displayName}>Test</AdvancedMarker>;
    //         const info = <InfoWindow
    //             anchor={marker}
    //             maxWidth={200}
    //             onCloseClick={() => setLastClicked("")}>
    //             Bruh
    //             This is an example for the{' '}
    //             <code style={{whiteSpace: 'nowrap'}}>&lt;AdvancedMarker /&gt;</code>{' '}
    //             combined with an Infowindow.
    //             </InfoWindow>;
    //         return {
    //             id: spaceData.id,
    //             marker: marker,
    //             info: info,
    //         }
    //     });
    //     return markers;
    // };
    // const spaceMarkerSets = useMemo(
    //     () => createMarkerSets(spaces),
    //     [spaces]
    // );

    const [showSpaceInfo, setShowSpaceInfo] = useState(true);

    const [lastClicked, setLastClicked] = useState("");

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
        <APIProvider 
        apiKey={'AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg'}
        mapId={'4a818d69b6705787'}
        >
            <Map
            defaultCenter={defaultLoc}
            defaultZoom={80}
            mapId={'4a818d69b6705787'}>
            {location && <AdvancedMarker
            position={{lat: location.latitude, lng: location.longitude}}
            ><Pin
            background={'#22ccff'}
            borderColor={'#1e89a1'}
            glyphColor={'#0f677a'}></Pin>
            </AdvancedMarker>}

            {spaces && spaces.map(spaceData => <><AdvancedMarker
                key={spaceData.id}
                onClick={() => setLastClicked(spaceData.id)}
                position={{lat: spaceData.lat, lng: spaceData.lng}} 
                title={spaceData.displayName}>
                </AdvancedMarker>
                {lastClicked == spaceData.id &&
                <InfoWindow 
                position={{lat: spaceData.lat, lng: spaceData.lng}}
                maxWidth={200}
                onCloseClick={(e) => setLastClicked("")}>
                {spaceData.displayName}
                <code style={{whiteSpace: 'nowrap'}}>&lt;{spaceData.name}&gt;</code>
                </InfoWindow>}
                </>
            )}
            {/* {spaceMarkerSets.map((markerSet) =>
            <>
            {markerSet.marker}
            {markerSet.info}
            </>
            )} */}
            
            </Map>
        </APIProvider>
        </div>
    </div>
    </>);
}