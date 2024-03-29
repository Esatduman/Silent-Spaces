import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function SpaceCard({space, isSelected}) {
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
    {/* {JSON.stringify(space)} */}
    <div className={isSelected ? "space-card selected" : "space-card"} >
        <span className="slug">@{username}:{space.name}</span>
        <br />
        {space.displayName}
        <br />
        <Link to={"/dashboard/spaceview/" + space.id}>go to</Link>
    </div>
    </>);
}