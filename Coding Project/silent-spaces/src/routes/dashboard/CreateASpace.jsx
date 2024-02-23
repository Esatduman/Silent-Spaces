import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { Context } from "../../components/AuthContext";

export function CreateASpace() {
    const db = getFirestore();
    const {user} = useContext(Context);

    async function createSpace(key, space) {
        const userDoc = doc(db, "users", user.uid);
        const spacesColl = collection(userDoc, "spaces");
        const spaceDoc = doc(spacesColl, "key");
        await setDoc(spaceDoc, space)
        .then(() => {
            console.log("space created");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const [spaceName, setSpaceName] = useState("");
    const [spaceDisplayName, setSpaceDisplayName] = useState("");
    const [desc, setSpaceDesc] = useState("");

    return (<>
    <h1>Create a Space!</h1>
    <form>
        <div>
            Space ID
            <input onChange={(e) => {setSpaceName(e.target.value)}} type="text" placeholder="A 'username' for your space."></input>
        </div>
        <div>
            Display Name
            <input onChange={(e) => {setSpaceDisplayName(e.target.value)}} type="text" placeholder="A longer form of name"></input>
        </div>
        <div>
            Description
            <textarea onChange={(e) => {setSpaceDesc(e.target.value)}} placeholder="A short description of your space."></textarea>
        </div>
        <button onClick={(e) => {
            e.preventDefault();
            createSpace(spaceName, {
                displayName: spaceDisplayName,
                desc: desc,
            });
            }}>Sign Up</button>
    </form>
    </>);
}