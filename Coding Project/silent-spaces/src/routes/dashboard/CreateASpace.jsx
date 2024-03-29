import { getFirestore, addDoc, setDoc, doc, collection } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../components/AuthContext";
import useGeoLocation from "../../components/useGeoLocation";
import { geohashForLocation } from "geofire-common";

export function CreateASpace() {
    const db = getFirestore();
    const {user} = useContext(Context);
    const { getLocation, location, error } = useGeoLocation();

    async function createSpace(space, loc) {
        const spacesCollRef = collection(db, "spaces");
        const geohash = geohashForLocation([loc.latitude, loc.longitude]);
        await addDoc(spacesCollRef, {
            ...space,
            geohash,
            lat: loc.latitude,
            lng: loc.longitude,
        }).then(() => {
            console.log("Success");
        }).catch((err) => {
            console.log(err);
        });
    }

    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [desc, setSpaceDesc] = useState("");

    return (<>
    <h1>Create a Space!</h1>
    <form>
        <section>
            Space ID
            <input onChange={(e) => {setSpaceName(e.target.value)}} type="text" placeholder="A 'username' for your space."></input>
        </section>
        <section>
            Display Name
            <input onChange={(e) => {setSpaceDisplayName(e.target.value)}} type="text" placeholder="A longer form of name"></input>
        </section>
        <section>
            Description
            <textarea onChange={(e) => {setSpaceDesc(e.target.value)}} placeholder="A short description of your space."></textarea>
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
                desc: desc,
                owner: user.uid,
            }, location);
            }}>Create Space</button>
    </form>
    </>);
}