import { getFirestore, addDoc, setDoc, doc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { Context } from "../../components/AuthContext";
import useGeoLocation from "../../components/useGeoLocation";

export function CreateASpace() {
    const db = getFirestore();
    const {user} = useContext(Context);
    const { getLocation, location, error } = useGeoLocation();

    async function createSpace(space) {
        // Revising.
        // const userDoc = doc(db, "users", user.uid);
        // const spacesColl = collection(userDoc, "spaces");
        // const spaceDoc = doc(spacesColl, "key");
        const spacesCollRef = collection(db, "spaces");
        await addDoc(spacesCollRef, {
            ...space
        }).then(() => {
            console.log("Success");
        }).catch((err) => {
            console.log(err);
        });
    }

    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [desc, setSpaceDesc] = useState("");

    const handleClick = () => {
        getLocation();
    };

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
            {location || <>No location <button onClick={handleClick}>Get Current Location</button></>}
        </section>
        <button onClick={(e) => {
            e.preventDefault();
            createSpace({
                name: spaceName,
                displayName: spaceDisplayName,
                desc: desc,
                owner: user.uid,
            });
            }}>Create Space</button>
    </form>
    </>);
}