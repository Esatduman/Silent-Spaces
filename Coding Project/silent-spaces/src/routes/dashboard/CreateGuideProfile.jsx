import { getFirestore, doc, getDoc, writeBatch } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../components/AuthContext";

export function CreateGuideProfile() {
    const db = getFirestore();
    const {user} = useContext(Context);

    async function requestUsernameSet(uid, username) {
        const userDoc = doc(db, "users", uid);
        const usernameDoc = doc(db, "usernames", username);
        const batch = writeBatch(db);
        batch.set(userDoc, { username });
        batch.set(usernameDoc, { uid });
        await batch.commit();
    }

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        const getData = setTimeout(async() => {
            if (username.length >= 3 && username.length <= 15) {
                const ref = doc(db, "usernames", username);
                const docRef = await getDoc(ref);
                const usernameAvailable = !docRef.exists();
                if(usernameAvailable)
                    setError("Username is available.");
                else
                    setError("Username is not available.");
            } else {
                setError("Username must be atleast 3 characters and 15 characters maximum.");
            }
        }, 500)
    
        return () => clearTimeout(getData)
      }, [username]);

    return (<>
    <h1>Set Guide Username</h1>
    <form id="guide-username">
        {error && <p>Error: {error}</p>}
        <div>
            Username
            <input onChange={(e) => {setUsername(e.target.value);}} type="text" placeholder="A specific id for your guide profile."></input>
        </div>
        <button onClick={(e) => {
            e.preventDefault();
            requestUsernameSet(user.uid, username);
            }}>Sign Up</button>
    </form>
    </>);
}