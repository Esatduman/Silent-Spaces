import { useEffect, useState, useCallback } from "react";
import { SpaceCard } from "./SpaceCard";
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import useGeoLocation from "./useGeoLocation";
import { collection, query, orderBy, startAt, endAt, getDocs, getFirestore } from 'firebase/firestore';
import { geohashQueryBounds, distanceBetween } from "geofire-common";
import './SpaceList.scss';

const dummySpaceViewData = {
    spaces: [
        { owner: 'john-bell', name: 'lcc3', displayName: 'Classroom', rating: 4 },
        { owner: 'uic', name: 'sce-inner-circle', displayName: 'Student Center East - Inner Circle', rating: 3 },
        { owner: 'uic', name: 'sele-computer-lab', displayName: 'SELE - Computer Lab', rating: 2 }
    ]
};

const defaultLoc = { lat: 41.86867120799108, lng: -87.64836798595782 };

export function SpaceList({ spaceViewData }) {
    const db = getFirestore();
    const { getLocation, location } = useGeoLocation();
    const [spaces, setSpaces] = useState([]);
    const [lastClicked, setLastClicked] = useState("");

    const retrieveLocations = useCallback(async (center) => {
        const radiusInM = 50 * 1000;
        const bounds = geohashQueryBounds(center, radiusInM);
        const promises = bounds.map(b => {
            const q = query(
                collection(db, 'spaces'), 
                orderBy('geohash'), 
                startAt(b[0]), 
                endAt(b[1])
            );
            return getDocs(q);
        });
        
        const snapshots = await Promise.all(promises);
        const allSpaceDatas = snapshots.flatMap(snap => 
            snap.docs
                .map(doc => {
                    const lat = doc.get('lat');
                    const lng = doc.get('lng');
                    const distanceInKm = distanceBetween([lat, lng], center);
                    const distanceInM = distanceInKm * 1000;
                    const distanceInMiles = 0.62137 * distanceInKm;
                    return distanceInM <= radiusInM ? { ...doc.data(), id: doc.id, dist: distanceInMiles } : null;
                })
                .filter(Boolean)
        );

        setSpaces(allSpaceDatas);
    }, [db]);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    useEffect(() => {
        const fetchData = setTimeout(() => {
            retrieveLocations(location ? [location.latitude, location.longitude] : [defaultLoc.lat, defaultLoc.lng]);
        }, 500);

        return () => clearTimeout(fetchData);
    }, [location, retrieveLocations]);

    const handleMarkerClick = useCallback((id) => {
        setLastClicked(id);
    }, []);

    return (
        <div className="space-list">
            <div className="space-list-left">
                <ul>
                    {spaces.map(space => (
                        <li key={space.id}>
                            <SpaceCard 
                                space={space} 
                                isSelected={lastClicked === space.id} 
                                distanceObj={{ dist: space.dist }} 
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-list-right">
                <APIProvider 
                    apiKey='AIzaSyC26_AOm2ZW6U8CbYkjtwwk2WEN09FAAUg' 
                    mapId='4a818d69b6705787'
                >
                    <Map
                        defaultCenter={defaultLoc}
                        defaultZoom={14}
                        mapId='4a818d69b6705787'
                    >
                        {location && (
                            <AdvancedMarker
                                position={{ lat: location.latitude, lng: location.longitude }}
                            >
                                <Pin
                                    background='#22ccff'
                                    borderColor='#1e89a1'
                                    glyphColor='#0f677a'
                                />
                            </AdvancedMarker>
                        )}

                        {spaces.map(spaceData => (
                            <div key={spaceData.id}>
                                <AdvancedMarker
                                    onClick={() => handleMarkerClick(spaceData.id)}
                                    position={{ lat: spaceData.lat, lng: spaceData.lng }}
                                    title={spaceData.displayName}
                                />
                                {lastClicked === spaceData.id && (
                                    <InfoWindow 
                                        position={{ lat: spaceData.lat, lng: spaceData.lng }}
                                        maxWidth={200}
                                        onCloseClick={() => setLastClicked("")}
                                    >
                                        {spaceData.displayName}
                                        <code style={{ whiteSpace: 'nowrap' }}>&lt;{spaceData.name}&gt;</code>
                                    </InfoWindow>
                                )}
                            </div>
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
}
