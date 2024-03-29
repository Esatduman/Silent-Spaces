import { getFirestore, setDoc, doc, collection, writeBatch, arrayUnion, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Context } from "../../components/AuthContext";
import useGeoLocation from "../../components/useGeoLocation";
import { geohashForLocation } from "geofire-common";

export function CreateASpace() {
    const db = getFirestore();
    const { user } = useContext(Context);
    const { getLocation, location, error, setLocation } = useGeoLocation();
    const { spaceId } = useParams();

    const fetchData = async (spaceId) => {
        const docRef = doc(db, "spaces", spaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const foundData = docSnap.data();
            console.log("Document data:", foundData);
            setExistingSpaceData(foundData);
        } else {
            console.log("No doc found");
        }
    };

    async function createSpace(space, loc) {
        const geohash = geohashForLocation([loc.latitude, loc.longitude]);
        const newData = {
            ...space,
            geohash,
            lat: loc.latitude,
            lng: loc.longitude,
        };
        console.log(newData);
        if (spaceId) { // Editing
            const existingDocRef = doc(db, "spaces", spaceId);
            await setDoc(existingDocRef, newData).then(() => {
                console.log("Success");
            }).catch((err) => {
                console.log(err);
            });
        } else {
            const userDoc = doc(db, "users", user.uid);
            const spaceDoc = doc(collection(db, 'spaces'));
            const batch = writeBatch(db);
            batch.set(spaceDoc, newData);
            batch.update(userDoc, {spaces: arrayUnion(spaceDoc)});
            await batch.commit().then(() => {
                console.log("Success");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const [existingSpaceData, setExistingSpaceData] = useState({});
    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [spaceDesc, setSpaceDesc] = useState("");

    if (spaceId) {
        useEffect(() => {
            fetchData(spaceId);
        }, []);
    }

    useEffect(() => {
        if(existingSpaceData.name)
            setSpaceName(existingSpaceData.name);
        if(existingSpaceData.displayName)
            setSpaceDisplayName(existingSpaceData.displayName);
        if(existingSpaceData.desc)
            setSpaceDesc(existingSpaceData.desc);
        if(existingSpaceData.lat && existingSpaceData.lat)
            setLocation({latitude: existingSpaceData.lat, longitude: existingSpaceData.lng});
    }, [existingSpaceData]);

    return (<>
    {spaceId ? (<h1>Editing a Space</h1>)
    : (<h1>Creating a Space</h1>)}
    <form>
        <section>
            Space ID
            <input value={spaceName} onChange={(e) => {setSpaceName(e.target.value)}} type="text" placeholder="A 'username' for your space."></input>
        </section>
        <section>
            Display Name
            <input value={spaceDisplayName} onChange={(e) => {setSpaceDisplayName(e.target.value)}} type="text" placeholder="A longer form of name"></input>
        </section>
        <section>
            Description
            <textarea value={spaceDesc} onChange={(e) => {setSpaceDesc(e.target.value)}} placeholder="A short description of your space."></textarea>
        </section>
        <section>
            Location
            {location ? (
                <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
            ) : (
                <>No location <button onClick={(e) => {getLocation(); e.preventDefault()}}>Get Current Location</button></>
            )}
        </section>
        <button onClick={(e) => {
            e.preventDefault();
            createSpace({
                name: spaceName,
                displayName: spaceDisplayName,
                desc: spaceDesc,
                owner: user.uid,
            }, location);
            }}>
            {spaceId ? <>Edit Space</> : <>Create Space</>}
        </button>
    </form>
    </>);
}