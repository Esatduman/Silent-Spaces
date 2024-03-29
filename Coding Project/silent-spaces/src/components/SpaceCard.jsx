import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function SpaceCard({space}) {
    const db = getFirestore();
    const [username, setUsername] = useState("");

    const retrieveUsername = async() => {
        const usernameRef = doc(db, "users", space.owner);
        const usernameSnap = await getDoc(usernameRef);
        setUsername(usernameSnap.data().username);
    }

    useEffect(() => {
        retrieveUsername();
    }, []);
    return (<>
    {JSON.stringify(space)}
    <div className="space-card">
        @{username}:{space.name}
        <br />
        {space.displayName}
    </div>
    </>);
}