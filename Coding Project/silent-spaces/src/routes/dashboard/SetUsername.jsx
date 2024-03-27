import { getFirestore, addDoc, setDoc, doc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { Context } from "../../components/AuthContext";

export function SetUsername() {
    const db = getFirestore();
    const {user} = useContext(Context);

    async function setUsername(space) {
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

    return (<>
    <h1>Set Guide Username</h1>
    <form>
        <div>
            Username
            <input onChange={(e) => {setSpaceName(e.target.value)}} type="text" placeholder="A 'username' for your space."></input>
        </div>
        <button onClick={(e) => {
            e.preventDefault();
            setUsername({
                name: spaceName,
                displayName: spaceDisplayName,
                desc: desc,
                owner: user.uid,
            });
            }}>Sign Up</button>
    </form>
    </>);
}